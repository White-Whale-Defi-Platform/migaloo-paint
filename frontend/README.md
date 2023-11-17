# Frontend

The Migaloo Paint frontend features _next.js_ and _react.js_ and leverages _recoil.js_ for state management. All code is written in _typescript_ and UI components utilize _tailwindcss_. It further exposes multiple api-endpoints.

## Setup

Before proceeding, ensure you have the latest version of _npm_ installed.

Installs all packages.

```
npm install
```

Serves the website in a local environment.

```
npm run dev
```

Executes static code checks and enforces style guidelines.

```
npm run lint
```

Checks for dead code.

```
npm run unimported
```

## API

Returns the canvas.

```
/api/canvas
```

Returns the leaderboard.

```
/api/leaderboard
```

Returns the statistics.

```
/api/statistics
```

Returns the configuration.

```
/api/config
```
