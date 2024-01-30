use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Coin, Uint128};
use cw_storage_plus::Map;

pub type Canvas<'a> = Map<'a, u128, CanvasField>;
pub type Leaderboard<'a> = Map<'a, Addr, LeaderboardEntry>;

#[cw_serde]
pub struct Stats {
    pub strokes: Uint128,
    pub deposits: Uint128,
}

#[cw_serde]
pub struct CanvasField {
    pub painter: Addr,
    pub color: String,
    pub deposit: Uint128,
}

#[cw_serde]
pub struct LeaderboardEntry {
    pub painter: Addr,
    pub strokes: Uint128,
    pub deposits: Uint128,
}

#[cw_serde]
pub struct Config {
    pub size: Uint128,
    pub color: String,
    pub coin: Coin,
    pub furnace: Addr,
    pub burn_tokens_recipient: Addr,
}
