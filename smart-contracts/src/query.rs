use cosmwasm_std::{Addr, Deps, Order, StdResult, Uint128};
use cw_storage_plus::Bound;

use crate::msg::{CanvasResponse, ConfigResponse, LeaderboardResponse};
use crate::state::{CANVAS, CONFIG, LEADERBOARD};
use crate::types::{CanvasField, LeaderboardEntry, Size};

pub fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    Ok(ConfigResponse {
        config: CONFIG.load(deps.storage)?,
    })
}

pub fn query_canvas(deps: Deps, start_row: Size, end_row: Size) -> StdResult<CanvasResponse> {
    let config = CONFIG.load(deps.storage)?;

    let mut canvas = Vec::with_capacity((end_row - start_row) as usize);
    for x in start_row..end_row {
        let mut row = Vec::with_capacity(config.canvas_size as usize);
        for y in 0..config.canvas_size {
            let field = match CANVAS.load(deps.storage, (x, y)) {
                Ok(field) => field,
                Err(_) => CanvasField {
                    amount: config.canvas_coin.amount,
                    color: config.canvas_color.clone(),
                },
            };
            row.push(field);
        }
        canvas.push(row);
    }

    Ok(CanvasResponse { canvas })
}

pub fn query_leaderboard(
    deps: Deps,
    start_after: Option<Addr>,
    limit: Uint128,
) -> StdResult<LeaderboardResponse> {
    let start = start_after
        .map(|addr| {
            let mut v = addr.as_bytes().to_vec();
            v.push(1);
            v
        })
        .map(Bound::ExclusiveRaw);

    LEADERBOARD
        .range(deps.storage, start, None, Order::Ascending)
        .take(limit.u128() as usize)
        .collect::<StdResult<Vec<(Addr, LeaderboardEntry)>>>()
        .map(|items| LeaderboardResponse {
            leaderboard: items
                .into_iter()
                .map(|(addr, entry)| LeaderboardEntry {
                    account: addr,
                    pixels: entry.pixels,
                    amount: entry.amount,
                })
                .collect(),
        })
}
