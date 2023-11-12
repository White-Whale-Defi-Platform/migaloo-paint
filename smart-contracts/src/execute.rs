use cosmwasm_std::{
    to_json_binary, CosmosMsg, DepsMut, Env, MessageInfo, Response, Uint128, WasmMsg,
};

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
    // Validate color
    color = validate_color(&color)?;
    // Check exsistence of the funds
    if info.funds.is_empty() {
        return Err(ContractError::NoFunds {});
    }
    // Load config
    let config = CONFIG.load(deps.storage)?;
    // Check position
    if position.gt(&config.size) {
        return Err(ContractError::InvalidPosition {});
    }
    // Check denom of the funds
    if info.funds[0].denom != config.coin.denom {
        return Err(ContractError::InvalidFundsDenom {});
    }
    // Load deposit
    let deposit = match CANVAS.load(deps.storage, position.u128()) {
        Ok(field) => field.deposit,
        Err(_) => config.coin.amount,
    };
    // Check amount of the funds
    if info.funds[0].amount.lt(&deposit) {
        return Err(ContractError::InvalidFundsAmount {});
    }
    // Store Field
    CANVAS.save(
        deps.storage,
        position.u128(),
        &CanvasField {
            painter: deps.api.addr_validate(info.sender.as_str())?,
            color,
            deposit: info.funds[0].amount,
        },
    )?;

    // Update Stats
    let stats = STATS.load(deps.storage)?;
    STATS.save(
        deps.storage,
        &Stats {
            strokes: stats.strokes.checked_add(Uint128::new(1))?,
            deposits: stats.deposits.checked_add(info.funds[0].amount)?,
        },
    )?;

    // Update Leaderboard Entry
    let entry = match LEADERBOARD.load(deps.storage, deps.api.addr_validate(info.sender.as_str())?)
    {
        Ok(entry) => LeaderboardEntry {
            painter: entry.painter,
            strokes: entry.strokes.checked_add(Uint128::new(1))?,
            deposits: entry.deposits.checked_add(info.funds[0].amount)?,
        },
        Err(_) => LeaderboardEntry {
            painter: deps.api.addr_validate(info.sender.as_str())?,
            strokes: Uint128::new(1),
            deposits: info.funds[0].amount,
        },
    };
    LEADERBOARD.save(
        deps.storage,
        deps.api.addr_validate(info.sender.as_str())?,
        &entry,
    )?;
    // Execute Burn
    let message = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: config.furnace.to_string(),
        msg: to_json_binary(&FurnaceExecuteMsg::Burn {})?,
        funds: vec![info.funds[0].clone()],
    });

    Ok(Response::new().add_message(message))
}
