use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Coin, Uint128};
use cw_storage_plus::Map;

pub type Size = u8;
pub type Denom = String;
pub type Color = String;
pub type Amount = Uint128;
pub type Point = (Size, Size);
pub type Canvas<'a> = Map<'a, Point, CanvasField>;
pub type Leaderboard<'a> = Map<'a, Addr, LeaderboardEntry>;

#[cw_serde]
pub struct CanvasField {
    pub amount: Amount,
    pub color: Color,
}

#[cw_serde]
pub struct LeaderboardEntry {
    pub account: Addr,
    pub pixels: Amount,
    pub amount: Amount,
}

#[cw_serde]
pub struct Config {
    pub owner: Addr,
    pub furnace: Addr,
    pub canvas_color: Color,
    pub canvas_size: Size,
    pub canvas_coin: Coin,
}
