#[cfg(test)]
mod tests {
    use crate::contract::{execute, instantiate};
    use crate::error::ContractError;
    use crate::msg::{ExecuteMsg, FurnaceExecuteMsg, InstantiateMsg};
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coin, coins, to_json_binary, SubMsg, Uint128, WasmMsg};

    #[test]
    fn test_paint() {
        // Set colors to be used
        const COLOR1: &str = "#9cd26d";
        const COLOR2: &str = "#9cd26e";
        const BURN_REPLY_ID: u64 = 1;
        const PAINTER2: &str = "painter2";

        // Instantiate the contract. Set size to 10 and coin amount to 100 uwhale
        let mut deps = mock_dependencies();
        let env = mock_env();
        let info = mock_info("painter1", &coins(2, "uwhale"));
        let msg = InstantiateMsg {
            size: Uint128::new(10),
            color: COLOR1.to_string(),
            coin: coin(100, "uwhale"),
            furnace: "furnace".to_string(),
            burn_tokens_recipient: None,
        };
        let res = instantiate(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();
        assert_eq!(0, res.messages.len());

        // Paint on position 5 with 50 uwhale (should be at least 100) and same color. Should error
        let msg = ExecuteMsg::Paint {
            position: Uint128::new(5),
            color: COLOR1.to_string(),
        };
        let info = mock_info("creator", &coins(50, "uwhale"));
        let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap_err();
        assert_eq!(res, ContractError::InvalidFundsAmount {});

        // Paint on position 5 with 100 uwhale (bare minimum) and same color. Should burn 100 uwhale
        let msg = ExecuteMsg::Paint {
            position: Uint128::new(5),
            color: COLOR1.to_string(),
        };
        let info = mock_info("painter", &coins(100, "uwhale"));
        let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();
        assert_eq!(
            res.messages[0],
            SubMsg::reply_on_success(
                WasmMsg::Execute {
                    contract_addr: "furnace".to_string(),
                    msg: to_json_binary(&FurnaceExecuteMsg::Burn {}).unwrap(),
                    funds: vec![coin(100, "uwhale")],
                },
                BURN_REPLY_ID
            )
        );

        // Paint on position 5 (again) with 101 uwhale (should be at least 101) and same color should error due to color
        let msg = ExecuteMsg::Paint {
            position: Uint128::new(5),
            color: COLOR1.to_string(),
        };
        let info = mock_info("creator", &coins(101, "uwhale"));
        let env = mock_env();
        let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap_err();
        assert_eq!(res, ContractError::InvalidColor {});

        // Paint on position 5 (again) with 100 uwhale (should be at least 101) and different color should error due to amount
        let msg = ExecuteMsg::Paint {
            position: Uint128::new(5),
            color: COLOR2.to_string(),
        };
        let info = mock_info("creator", &coins(100, "uwhale"));
        let env = mock_env();
        let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap_err();
        assert_eq!(res, ContractError::InvalidFundsAmount {});

        // Paint on position 10 (out of bounds) with 101 uwhale and different color should error due to position
        let msg = ExecuteMsg::Paint {
            position: Uint128::new(10),
            color: COLOR2.to_string(),
        };
        let info = mock_info("creator", &coins(101, "uwhale"));
        let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap_err();
        assert_eq!(res, ContractError::InvalidPosition {});

        // Paint on position 5 with 101 uwhale (bare minimum), same color, but different painter. Should burn 101 uwhale
        let msg = ExecuteMsg::Paint {
            position: Uint128::new(5),
            color: COLOR2.to_string(),
        };
        let info = mock_info(PAINTER2, &coins(101, "uwhale"));
        let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();
        assert_eq!(
            res.messages[0],
            SubMsg::reply_on_success(
                WasmMsg::Execute {
                    contract_addr: "furnace".to_string(),
                    msg: to_json_binary(&FurnaceExecuteMsg::Burn {}).unwrap(),
                    funds: vec![coin(101, "uwhale")],
                },
                BURN_REPLY_ID
            )
        );
    }
}
