use cosmwasm_std::{
    entry_point, to_json_binary, BalanceResponse, BankMsg, BankQuery, Binary, Deps, DepsMut, Env,
    MessageInfo, Reply, Response, StdError, StdResult, Uint128,
};

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};
use crate::state::{CONFIG, STATS};
use crate::types::{Config, Stats};
use crate::util::validate_color;
use crate::{execute, query, reply};

const BURN_REPLY_ID: u64 = 1;

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    // Validate recipient address or set to sender
    let burn_tokens_recipient = match msg.burn_tokens_recipient {
        Some(burn_tokens_recipient) => deps.api.addr_validate(&burn_tokens_recipient)?,
        None => info.sender,
    };

    // Initialize CONFIG
    CONFIG.save(
        deps.storage,
        &Config {
            size: msg.size,
            color: validate_color(&msg.color)?,
            coin: msg.coin,
            furnace: deps.api.addr_validate(&msg.furnace)?,
            burn_tokens_recipient,
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
pub fn reply(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: Reply,
) -> Result<Response, ContractError> {
    match msg.id {
        BURN_REPLY_ID => reply::handle_reply_burn(deps, env, info, msg),
        _ => Err(ContractError::InvalidReplyId {}),
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
pub fn migrate(deps: DepsMut, env: Env, msg: MigrateMsg) -> Result<Response, StdError> {
    // Get contract balance and send to recipient if not zero
    let balance: BalanceResponse = deps.querier.query(
        &BankQuery::Balance {
            address: env.contract.address.to_string(),
            denom: msg.denom,
        }
        .into(),
    )?;
    if balance.amount.amount.is_zero() {
        return Err(StdError::generic_err("Contract balance is zero"));
    }
    let bank_msg = BankMsg::Send {
        to_address: CONFIG.load(deps.storage)?.burn_tokens_recipient.to_string(),
        amount: vec![balance.amount],
    };
    // TODO: add attributes to response
    Ok(Response::new().add_message(bank_msg))
}
