use cosmwasm_std::{
    entry_point, to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError,
    StdResult,
};

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};
use crate::state::CONFIG;
use crate::types::Config;
use crate::{execute, query};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    CONFIG.save(
        deps.storage,
        &Config {
            owner: deps.api.addr_validate(msg.owner.as_str())?,
            furnace: deps.api.addr_validate(msg.furnace.as_str())?,
            canvas_coin: msg.canvas_coin,
            canvas_color: msg.canvas_color,
            canvas_size: msg.canvas_size,
        },
    )?;

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
        ExecuteMsg::Paint { x, y, color } => execute::paint(deps, env, info, x, y, color),
        ExecuteMsg::UpdateConfig { owner, furnace } => execute::update_config(deps, env, info, owner, furnace),
    }
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Canvas { start_row, end_row } => {
            to_json_binary(&query::query_canvas(deps, start_row, end_row)?)
        }

        QueryMsg::Leaderboard { start_after, limit } => {
            to_json_binary(&query::query_leaderboard(deps, start_after, limit)?)
        }
        QueryMsg::Config {} => to_json_binary(&query::query_config(deps)?),
    }
}

#[entry_point]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> Result<Response, StdError> {
    Ok(Response::default())
}
