use cosmwasm_std::{OverflowError, StdError};
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    Ovf(#[from] OverflowError),

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
}
