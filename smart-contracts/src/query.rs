use cosmwasm_std::{Addr, Deps, Env, Order, StdError, StdResult, Uint128};
use cw_storage_plus::Bound;

use crate::msg::{CanvasResponse, ConfigResponse, LeaderboardResponse, StatsResponse};
use crate::state::{CANVAS, CONFIG, LEADERBOARD, STATS};
use crate::types::{CanvasField, LeaderboardEntry};

pub fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    Ok(ConfigResponse {
        config: CONFIG.load(deps.storage)?,
    })
}

pub fn query_stats(deps: Deps) -> StdResult<StatsResponse> {
    Ok(StatsResponse {
        stats: STATS.load(deps.storage)?,
    })
}

pub fn query_canvas(
    deps: Deps,
    env: Env,
    start_after: Option<Uint128>,
    limit: Option<Uint128>,
) -> StdResult<CanvasResponse> {
    let config = CONFIG.load(deps.storage)?;
    let start_index = start_after.unwrap_or(Uint128::new(0));
    if start_index.gt(&config.size) {
        return Err(StdError::generic_err("Invalid Position"));
    }
    let limit_index = limit.unwrap_or(Uint128::new(128));
    let end_index = std::cmp::min(start_index.u128() + limit_index.u128(), config.size.u128());
    let mut canvas = Vec::new();
    for index in (start_index.u128() as usize)..(end_index as usize) {
        let field = match CANVAS.load(deps.storage, index as u128) {
            Ok(field) => field,
            Err(_) => CanvasField {
                painter: env.contract.address.clone(),
                color: config.color.clone(),
                deposit: config.coin.amount,
            },
        };
        canvas.push(field);
    }

    Ok(CanvasResponse { canvas })
}

pub fn query_leaderboard(
    deps: Deps,
    start_after: Option<Addr>,
    limit: Option<Uint128>,
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
        .take(limit.unwrap_or(Uint128::new(100)).u128() as usize)
        .collect::<StdResult<Vec<(Addr, LeaderboardEntry)>>>()
        .map(|items| LeaderboardResponse {
            leaderboard: items
                .into_iter()
                .map(|(addr, entry)| LeaderboardEntry {
                    painter: addr,
                    strokes: entry.strokes,
                    deposits: entry.deposits,
                })
                .collect(),
        })
}
