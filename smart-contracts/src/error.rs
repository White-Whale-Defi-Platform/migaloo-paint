use cosmwasm_std::{OverflowError, StdError};
use cw_utils::PaymentError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    Ovf(#[from] OverflowError),

    #[error("{0}")]
    Pe(#[from] PaymentError),

    #[error("Not Found")]
    NotFound {},

    #[error("No Funds")]
    NoFunds {},

    #[error("Invalid Funds Denom")]
    InvalidFundsDenom {},

    #[error("Invalid Funds Amount")]
    InvalidFundsAmount {},

    #[error("Invalid Color Format")]
    InvalidColorFormat {},

    #[error("Invalid Position")]
    InvalidPosition {},

    #[error("Invalid Color")]
    InvalidColor {},

    #[error("Invalid Reply ID")]
    InvalidReplyId {},
}
