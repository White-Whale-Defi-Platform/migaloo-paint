# Smart Contracts

The Migaloo Paint smart-contract features a straightforward mono-contract design, enabling users to create art on a digital canvas. The smart-contract stores this canvas as a one-dimensional array of **size** elements in [0, size). Users have the freedom to paint on any tile within the range of [0, size) using any valid hexadecimal color code. To modify the color of a specific tile, a user must submit a payment that exceeds the current monetary value assigned to secure that tile.

## Instantiate

Instantiates the smart contract.

| Key                     | Type                    | Description                                                                |
| ----------------------- | ----------------------- | -------------------------------------------------------------------------- |
| `furnace`               | `cosmwasm_std::Addr`    | Address of the Furnace contract.                                           |
| `size`                  | `cosmwasm_std::Uint128` | Canvas Size. Consider using a perfect square.                              |
| `color`                 | `String`                | Default color. Hexadecimal color code with a leading **#** and six digits. |
| `coin`                  | `cosmwasm_std::Coin`    | Default deposit coin. Note the Furnace needs to support the denom.         |
| `burn_tokens_recipient` | `Option<String>`        | Address that will receive ASH tokens after burning WHALE                   |

```json
{
  "furnace": "migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup",
  "size": 16384,
  "color": "#E5E5E5",
  "coin": {
    "denom": "uwhale",
    "amount": "10000000"
  },
  "burn_tokens_recipient": "migaloo1e0kvgag8rzgj3tpz8tn9new83zv8fyv9yc2jxtnmv02hc3pn6jjswn3sc4"
}
```

### Execute

#### Paint

Paint changes the color of a single tile on the canvas. Requires the user to send more funds previously deposited into the tile. The contract will burn all deposits at the Furnace.

| Key        | Type                    | Description                                                                 |
| ---------- | ----------------------- | --------------------------------------------------------------------------- |
| `position` | `cosmwasm_std::Uint128` | Tile position. Must be element of [0, config.size).                         |
| `color`    | `String`                | New tile color. Hexadecimal color code with a leading **#** and six digits. |

```json
{
  "paint": {
    "position": "128",
    "color": "#E5E5E5"
  }
}
```

## Query

### Config

Queries the configuration.

```json
{
  "config": {}
}
```

### Stats

Queries the statistics.

```json
{
  "stats": {}
}
```

### Canvas

Queries the canvas.

| Key           | Type              | Description                                                           |
| ------------- | ----------------- | --------------------------------------------------------------------- |
| `start_after` | `Option<Uint128>` | Defines the start point in the canvas. Must be element of the canvas. |
| `limit`       | `Option<Uint128>` | Defines the maximum number of tiles the query will return             |

```json
{
  "canvas": {
    "start_after": "128",
    "limit": "100"
  }
}
```

### Leaderboard

Queries the leaderboard.

| Key           | Type              | Description                                                                     |
| ------------- | ----------------- | ------------------------------------------------------------------------------- |
| `start_after` | `Option<Addr>`    | Defines the start point in the leaderboard. Must be element of the leaderboard. |
| `limit`       | `Option<Uint128>` | Defines the maximum number of leaderboard entries the query will return         |

```json
{
  "leaderboard": {
    "start_after": "migaloo1...",
    "limit": "100"
  }
}
```
