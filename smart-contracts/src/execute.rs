use cosmwasm_std::{
    to_json_binary, CosmosMsg, DepsMut, Env, MessageInfo, Response, Uint128, WasmMsg,
};
use cw_utils::must_pay;

use crate::error::ContractError;
use crate::msg::FurnaceExecuteMsg;
use crate::state::{CANVAS, CONFIG, LEADERBOARD, STATS};
use crate::types::{CanvasField, LeaderboardEntry, Stats};
use crate::util::validate_color;

pub fn paint(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    position: Uint128,
    mut color: String,
) -> Result<Response, ContractError> {

    // Validate painter
    let painter = &deps.api.addr_validate(info.sender.as_str())?;

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

    // Load old deposit
    let old_deposit = match CANVAS.load(deps.storage, position.u128()) {
        Ok(field) => field.deposit,
        Err(_) => config.coin.amount,
    };

    // Validate deposit amount
    if deposit.lt(&old_deposit) {
        return Err(ContractError::InvalidFundsAmount {});
    }

    // Store Field
    CANVAS.save(
        deps.storage,
        position.u128(),
        &CanvasField {
            painter: painter.clone(),
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
            painter: painter.clone(),
            strokes: Uint128::new(1),
            deposits: deposit,
        },
    };
    LEADERBOARD.save(deps.storage, painter.clone(), &entry)?;
    
    // Execute Burn
    let message = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: config.furnace.to_string(),
        msg: to_json_binary(&FurnaceExecuteMsg::Burn {})?,
        funds: vec![info.funds[0].clone()],
    });

    Ok(Response::new().add_message(message))
}
