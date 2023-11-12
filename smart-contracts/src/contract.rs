use cosmwasm_std::{
    entry_point, to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError,
    StdResult, Uint128,
};

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};
use crate::state::{CONFIG, STATS};
use crate::types::{Config, Stats};
use crate::util::validate_color;
use crate::{execute, query};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    // Initialize CONFIG
    CONFIG.save(
        deps.storage,
        &Config {
            size: msg.size,
            color: validate_color(&msg.color)?,
            coin: msg.coin,
            furnace: deps.api.addr_validate(msg.furnace.as_str())?,
        },
    )?;
    // Initialize STATS
    STATS.save(
        deps.storage,
        &Stats {
            strokes: Uint128::new(0),
            deposits: Uint128::new(0),
        },
    )?;
    // Return
    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Paint { position, color } => execute::paint(deps, env, info, position, color),
    }
}

#[entry_point]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Canvas { start_after, limit } => {
            to_json_binary(&query::query_canvas(deps, env, start_after, limit)?)
        }

        QueryMsg::Leaderboard { start_after, limit } => {
            to_json_binary(&query::query_leaderboard(deps, start_after, limit)?)
        }
        QueryMsg::Stats {} => to_json_binary(&query::query_stats(deps)?),
        QueryMsg::Config {} => to_json_binary(&query::query_config(deps)?),
    }
}

#[entry_point]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> Result<Response, StdError> {
    Ok(Response::default())
}
