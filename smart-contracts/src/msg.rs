use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Addr, Coin, Uint128};

use crate::types::{CanvasField, Config, LeaderboardEntry, Stats};

#[cw_serde]
pub struct InstantiateMsg {
    pub furnace: String,
    pub size: Uint128,
    pub color: String,
    pub coin: Coin,
    pub burn_tokens_recipient: Option<String>,
}

#[cw_serde]
pub enum ExecuteMsg {
    Paint { position: Uint128, color: String },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ConfigResponse)]
    Config {},
    #[returns(StatsResponse)]
    Stats {},
    #[returns(CanvasResponse)]
    Canvas {
        start_after: Option<Uint128>,
        limit: Option<Uint128>,
    },
    #[returns(LeaderboardResponse)]
    Leaderboard {
        start_after: Option<Addr>,
        limit: Option<Uint128>,
    },
}

#[cw_serde]
pub struct MigrateMsg {
    pub denom: String,
}

#[cw_serde]
pub struct CanvasResponse {
    pub canvas: Vec<CanvasField>,
}

#[cw_serde]
pub struct StatsResponse {
    pub stats: Stats,
}

#[cw_serde]
pub struct LeaderboardResponse {
    pub leaderboard: Vec<LeaderboardEntry>,
}

#[cw_serde]
pub struct ConfigResponse {
    pub config: Config,
}

#[cw_serde]
pub enum FurnaceExecuteMsg {
    Burn {},
}
