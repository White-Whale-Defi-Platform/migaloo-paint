use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Addr, Coin, Uint128};

use crate::types::{CanvasField, Color, Config, LeaderboardEntry, Size};

#[cw_serde]
pub struct InstantiateMsg {
    pub owner: Addr,
    pub furnace: Addr,
    pub canvas_size: Size,
    pub canvas_color: Color,
    pub canvas_coin: Coin,
}

#[cw_serde]
pub enum ExecuteMsg {
    UpdateConfig {
        owner: Option<Addr>,
        furnace: Option<Addr>,
    },
    Paint {
        x: Size,
        y: Size,
        color: Color,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ConfigResponse)]
    Config {},
    #[returns(CanvasResponse)]
    Canvas { start_row: Size, end_row: Size },
    #[returns(LeaderboardResponse)]
    Leaderboard {
        start_after: Option<Addr>,
        limit: Uint128,
    },
}

#[cw_serde]
pub struct MigrateMsg {}

#[cw_serde]
pub struct CanvasResponse {
    pub canvas: Vec<Vec<CanvasField>>,
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
