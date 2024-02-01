use cosmwasm_std::{
    to_json_binary, CosmosMsg, DepsMut, Env, MessageInfo, Response, SubMsg, Uint128, WasmMsg,
};
use cw_utils::must_pay;

use crate::error::ContractError;
use crate::msg::FurnaceExecuteMsg;
use crate::state::{CANVAS, CONFIG, LEADERBOARD, STATS};
use crate::types::{CanvasField, LeaderboardEntry, Stats};
use crate::util::validate_color;

const BURN_REPLY_ID: u64 = 1;

pub fn paint(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    position: Uint128,
    mut color: String,
) -> Result<Response, ContractError> {
    // Validate color
    color = validate_color(&color)?;

    // Load config
    let config = CONFIG.load(deps.storage)?;

    // Validate position
    if position.ge(&config.size) {
        return Err(ContractError::InvalidPosition {});
    }

    // Validate deposit
    let deposit = must_pay(&info, &config.coin.denom)?;

    // load canvas
    let canvas = CANVAS.load(deps.storage, position.u128());

    // Load old deposit
    let old_deposit = match &canvas {
        Ok(field) => field.deposit,
        // If the canvas position hasn't been colored yet, set `old_deposit` to `config.coin.amount` - 1
        // so new painter will pay at least the value set on instantiattion
        Err(_) => config.coin.amount.checked_sub(Uint128::one())?,
    };

    // Validate that new color is different from old color
    if canvas.is_ok() && canvas.unwrap().color == color {
        return Err(ContractError::InvalidColor {});
    }

    // Validate deposit amount
    if deposit.le(&old_deposit) {
        return Err(ContractError::InvalidFundsAmount {});
    }

    // Store Field
    CANVAS.save(
        deps.storage,
        position.u128(),
        &CanvasField {
            painter: info.sender.clone(),
            color,
            deposit,
        },
    )?;

    // Update Stats
    let stats = STATS.load(deps.storage)?;
    STATS.save(
        deps.storage,
        &Stats {
            strokes: stats.strokes.checked_add(Uint128::new(1))?,
            deposits: stats.deposits.checked_add(deposit)?,
        },
    )?;

    // Update Leaderboard Entry
    let entry = match LEADERBOARD.load(deps.storage, deps.api.addr_validate(info.sender.as_str())?)
    {
        Ok(entry) => LeaderboardEntry {
            painter: entry.painter,
            strokes: entry.strokes.checked_add(Uint128::new(1))?,
            deposits: entry.deposits.checked_add(deposit)?,
        },
        Err(_) => LeaderboardEntry {
            painter: info.sender.clone(),
            strokes: Uint128::new(1),
            deposits: deposit,
        },
    };
    LEADERBOARD.save(deps.storage, info.sender, &entry)?;

    // Execute Burn
    let message = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: config.furnace.to_string(),
        msg: to_json_binary(&FurnaceExecuteMsg::Burn {})?,
        funds: info.funds,
    });

    // Return response with reply on success submessage to be handled by reply entry point later
    Ok(Response::new()
        .add_submessage(SubMsg::reply_on_success(message, BURN_REPLY_ID))
        .add_attribute("action", "paint"))
}
