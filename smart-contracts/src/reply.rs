use cosmwasm_std::{AllBalanceResponse, BankMsg, BankQuery, DepsMut, Env, Reply, Response};

use crate::{error::ContractError, state::CONFIG};

/// After WHALE tokens are burned, sends the received ASH tokens (plus all contract balances)
/// to the burn tokens recipient address (ASH DAO)
pub fn handle_burn_reply(deps: DepsMut, env: Env, _msg: Reply) -> Result<Response, ContractError> {
    // Load config
    let config = CONFIG.load(deps.storage)?;

    // Get all contract balances
    let balances: AllBalanceResponse = deps.querier.query(
        &BankQuery::AllBalances {
            address: env.contract.address.to_string(),
        }
        .into(),
    )?;

    // Iterate over balances, filter out config.coin.denom (exclude WHALE), and
    // transfer the rest of coins to burn tokens recipient address
    let bank_msgs: Vec<BankMsg> = balances
        .amount
        .iter()
        .filter(|coin| coin.denom != config.coin.denom)
        // create bank messages to burn tokens address for each coin
        .map(|coin| BankMsg::Send {
            to_address: config.burn_tokens_recipient.to_string(),
            amount: vec![coin.clone()],
        })
        .collect();

    // Return
    Ok(Response::default()
        .add_messages(bank_msgs)
        .add_attribute("action", "reply_burn")
        .add_attribute("to", config.burn_tokens_recipient.to_string()))
}
