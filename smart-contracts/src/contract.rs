use cosmwasm_schema::cw_serde;
use cosmwasm_std::{
    entry_point, to_json_binary, Addr, BalanceResponse, BankMsg, BankQuery, Binary, Coin, Deps,
    DepsMut, Env, MessageInfo, Reply, Response, StdError, StdResult, Uint128,
};
use cw_storage_plus::Item;

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
pub fn reply(deps: DepsMut, env: Env, msg: Reply) -> Result<Response, ContractError> {
    match msg.id {
        BURN_REPLY_ID => reply::handle_burn_reply(deps, env, msg),
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
    // define old config struct and load it from storage
    #[cw_serde]
    pub struct ConfigV111 {
        pub size: Uint128,
        pub color: String,
        pub coin: Coin,
        pub furnace: Addr,
    }
    const CONFIG_V111: Item<ConfigV111> = Item::new("config");
    let config_v111 = CONFIG_V111.load(deps.storage)?;

    // add new burn tokens recipient address to config and save it
    let config = Config {
        size: config_v111.size,
        color: config_v111.color,
        coin: config_v111.coin,
        furnace: config_v111.furnace,
        burn_tokens_recipient: deps.api.addr_validate(&msg.burn_tokens_recipient)?,
    };
    CONFIG.save(deps.storage, &config)?;

    // Get contract ASH balance and send to burn tokens recipient
    let balance: BalanceResponse = deps.querier.query(
        &BankQuery::Balance {
            address: env.contract.address.to_string(),
            denom: msg.ash_denom.clone(),
        }
        .into(),
    )?;
    let bank_msg = BankMsg::Send {
        to_address: msg.burn_tokens_recipient.to_string(),
        amount: vec![balance.amount],
    };

    Ok(Response::new()
        .add_message(bank_msg)
        .add_attribute("action", "migrate".to_string())
        .add_attribute("ash_denom", msg.ash_denom)
        .add_attribute("burn_tokens_address", msg.burn_tokens_recipient))
}
