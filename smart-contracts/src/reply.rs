use cosmwasm_std::{BankMsg, DepsMut, Env, MessageInfo, Reply, Response};

use crate::{error::ContractError, state::CONFIG};

pub fn handle_reply_burn(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: Reply,
) -> Result<Response, ContractError> {
    // Load config
    let config = CONFIG.load(deps.storage)?;

    // send bank message to burn tokens address
    let msg = BankMsg::Send {
        to_address: config.burn_tokens_recipient.to_string(),
        amount: info.funds.clone(),
    };

    // Return
    Ok(Response::default()
        .add_message(msg)
        .add_attribute("action", "reply_burn")
        .add_attribute("to", config.burn_tokens_recipient.to_string())
        .add_attribute("denom", &info.funds[0].denom)
        .add_attribute("amount", info.funds[0].amount))
}
