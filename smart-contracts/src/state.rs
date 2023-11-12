use cw_storage_plus::{Item, Map};

use crate::types::{Canvas, Config, Leaderboard, Stats};

pub const NAME: &str = env!("CARGO_PKG_NAME");
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

pub const CONFIG: Item<Config> = Item::new("config");
pub const STATS: Item<Stats> = Item::new("stats");
pub const CANVAS: Canvas = Map::new("canvas");
pub const LEADERBOARD: Leaderboard = Map::new("leaderboard");
