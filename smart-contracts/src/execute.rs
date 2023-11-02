use cosmwasm_std::{
    to_json_binary, Addr, CosmosMsg, DepsMut, Env, MessageInfo, Response, Uint128, WasmMsg,
};

use crate::error::ContractError;
use crate::msg::FurnaceExecuteMsg;
use crate::state::{CANVAS, CONFIG, LEADERBOARD};
use crate::types::{CanvasField, Color, Config, LeaderboardEntry, Size};

pub fn update_config(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    owner: Option<Addr>,
    furnace: Option<Addr>,
) -> Result<Response, ContractError> {
    let mut config: Config = CONFIG.load(deps.storage)?;

    if deps.api.addr_validate(info.sender.as_str())? != config.owner {
        return Err(ContractError::Unauthorized {});
    }

    if let Some(new_owner) = owner {
        config.owner = deps.api.addr_validate(new_owner.as_str())?;
    }

    if let Some(new_furnace) = furnace {
        config.furnace = deps.api.addr_validate(new_furnace.as_str())?;
    }

    // Save the updated config
    CONFIG.save(deps.storage, &config)?;

    Ok(Response::new().add_attribute("action", "update_config"))
}

pub fn paint(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    x: Size,
    y: Size,
    color: Color,
) -> Result<Response, ContractError> {
    // Check color
    if !color.starts_with('#') || !color.chars().skip(1).all(|c| c.is_digit(16)) {
        return Err(ContractError::InvalidColorFormat {});
    }
    // Check exsistence of the funds
    if info.funds.is_empty() {
        return Err(ContractError::NoFunds {});
    }
    // Load config
    let config = CONFIG.load(deps.storage)?;
    // Check denom of the funds
    if info.funds[0].denom != config.canvas_coin.denom {
        return Err(ContractError::InvalidFundsDenom {});
    }
    // Load barrier
    let barrier = match CANVAS.load(deps.storage, (x, y)) {
        Ok(field) => field.amount,
        Err(_) => config.canvas_coin.amount,
    };
    // Check amount of the funds
    if info.funds[0].amount.lt(&barrier) {
        return Err(ContractError::InvalidFundsAmount {});
    }
    // Store Field
    CANVAS.save(
        deps.storage,
        (x, y),
        &CanvasField {
            amount: info.funds[0].amount,
            color,
        },
    )?;
    // Load and update Leaderboard Entry
    let entry = match LEADERBOARD.load(deps.storage, deps.api.addr_validate(info.sender.as_str())?)
    {
        Ok(entry) => LeaderboardEntry {
            account: entry.account,
            pixels: entry.pixels.checked_add(Uint128::new(1))?,
            amount: entry.amount.checked_add(info.funds[0].amount)?,
        },
        Err(_) => LeaderboardEntry {
            account: deps.api.addr_validate(info.sender.as_str())?,
            pixels: Uint128::new(1),
            amount: info.funds[0].amount,
        },
    };
    // Store Leaderboard Entry
    LEADERBOARD.save(
        deps.storage,
        deps.api.addr_validate(info.sender.as_str())?,
        &entry,
    )?;
    // Burn
    let message = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: config.furnace.to_string(),
        msg: to_json_binary(&FurnaceExecuteMsg::Burn {})?,
        funds: vec![info.funds[0].clone()],
    });
    // Return
    Ok(Response::new().add_message(message))
}
