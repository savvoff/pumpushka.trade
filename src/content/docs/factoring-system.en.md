---
lang: en
title: Documentation — Factoring system
description: 'Полный список факторов, которые являются медицинскими Pumpushka Bot'
order: 6
navTitle: Factoring system
draft: false
publishedAt: 2025-09-04T21:00:00.000Z
---

# Analysis Factors

Pumpushka Bot evaluates trades using dozens of factors grouped by category.\
All factors contribute to the **Rationale Score** and influence the signal direction.

***

## ✅ Implemented Factors

### Technical

| Key                          | Description              | Source                         | LONG / SHORT Conditions                                         |
| ---------------------------- | ------------------------ | ------------------------------ | --------------------------------------------------------------- |
| `tech.trend.adx_di`          | Trend strength (+DI/−DI) | `adx`, `plusDI`, `minusDI`     | **LONG:** ADX > 25 & +DI > −DI; **SHORT:** ADX > 25 & −DI > +DI |
| `tech.trend.ema_slope`       | EMA slope                | `ema[]`                        | **LONG:** `ema[-1] > ema[0]`; **SHORT:** opposite               |
| `tech.trend.psar`            | PSAR trend               | `psar.trends[-1]`              | **LONG:** rising; **SHORT:** falling                            |
| `tech.trend.aroon`           | Recency of high/low      | `aroon.up`, `aroon.down`       | **LONG:** up > down + 20; **SHORT:** down > up + 20             |
| `tech.momentum.macd`         | MACD momentum            | `macdLine`, `signalLine`       | **LONG:** histogram > 0; **SHORT:** \< 0                        |
| `tech.momentum.rsi.zone`     | RSI zone                 | `rsi`                          | **LONG:** 50–70 rising; **SHORT:** \< 45 falling                |
| `tech.momentum.stoch.cross`  | Stochastic cross         | `stochastic.k`, `stochastic.d` | **LONG:** k > d & k \< 60; **SHORT:** k \< d & k > 40           |
| `tech.volatility.atr_pct`    | ATR%                     | `atr`, `price`                 | Trend amplifier (contextual, no fixed direction)                |
| `tech.volatility.bb_break`   | Bollinger Bands breakout | `bb.upper/lower`, `price`      | **LONG:** close > upper; **SHORT:** close \< lower              |
| `tech.volatility.bb_squeeze` | BB squeeze               | `bbWidthPercent`               | Setup / context (directionless)                                 |
| `tech.volume.obv_slope`      | OBV direction            | `obvSlope`                     | **LONG:** slope > 0; **SHORT:** slope \< 0                      |
| `tech.volume.cmf`            | Money flow (CMF)         | `cmf`                          | **LONG:** > 0.05; **SHORT:** \< −0.05                           |

### Derivatives

| Key                         | Description         | Source                         | LONG / SHORT                                                        |
| --------------------------- | ------------------- | ------------------------------ | ------------------------------------------------------------------- |
| `deriv.oi.delta_24h`        | 24h OI change       | `openInterest[]`               | **LONG:** price ↑ & OI ↑; **SHORT:** price ↓ & OI ↑                 |
| `deriv.funding.avg24h`      | Average funding 24h | `fundingRate[]`                | **LONG:** ≤ 0 with rising price; **SHORT:** ≫ 0 with long dominance |
| `deriv.funding.last`        | Last funding        | `lastFundingRate`              | Same logic as avg24h                                                |
| `deriv.ls_ratio.topTraders` | L/S of top traders  | `longShortRatioTopTraders`     | **LONG:** \< 1 with price ↑; **SHORT:** > 1.5 with flat/↓           |
| `deriv.short_squeeze_setup` | Short-squeeze setup | `price↑`, `OI↑`, `funding ≤ 0` | **LONG**                                                            |
| `deriv.long_squeeze_setup`  | Long-squeeze setup  | `price↓`, `OI↑`, `funding > 0` | **SHORT**                                                           |

### Order Book

| Key                      | Description        | Source             | LONG / SHORT                              |
| ------------------------ | ------------------ | ------------------ | ----------------------------------------- |
| `ob.imbalance.bids_asks` | Bid/ask imbalance  | `whaleVolume`      | **LONG:** bid > ask; **SHORT:** ask > bid |
| `ob.whales.bid_walls`    | Bid walls          | `bidWhaleOrders[]` | **LONG:** presence/strength of bid walls  |
| `ob.whales.ask_walls`    | Ask walls          | `askWhaleOrders[]` | **SHORT:** presence/strength of ask walls |
| `ob.whales.count_ratio`  | Whale orders count | `bid/ask count`    | **LONG:** bidCount > askCount             |

### On-chain

| Key                                  | Description        | Source              | LONG / SHORT                                       |
| ------------------------------------ | ------------------ | ------------------- | -------------------------------------------------- |
| `onchain.exchange_outflow_vs_inflow` | Outflow > Inflow   | `whaleAlerts`       | **LONG** when outflow consistently dominates       |
| `onchain.whales.accumulation`        | Whale accumulation | `tx+alerts`         | **LONG**                                           |
| `onchain.whales.distribution`        | Distribution       | `tx+alerts`         | **SHORT**                                          |
| `onchain.tx.activity_rate`           | Tx activity rate   | `txCount`, `volume` | **LONG:** activity ↑; **SHORT:** spike before drop |
| `onchain.big_txs.count`              | Large tx count     | `bigTxCount`        | Contextual                                         |

### News / Macro

| Key                          | Description     | Source                     | LONG / SHORT                           |
| ---------------------------- | --------------- | -------------------------- | -------------------------------------- |
| `news.relevance.positive`    | Positive news   | `importantNews`            | **LONG**                               |
| `news.relevance.negative`    | Negative news   | `importantNews`            | **SHORT**                              |
| `macro.upcoming.high_impact` | Upcoming events | `futureEvents`             | Neutral buffer                         |
| `macro.risk_on_off`          | Risk regime     | `dominance`, `stablecoins` | **LONG:** risk-on; **SHORT:** risk-off |

### Regime / Sentiment

| Key                             | Description           | Source                        | LONG / SHORT                                  |
| ------------------------------- | --------------------- | ----------------------------- | --------------------------------------------- |
| `regime.btc_trend_alignment`    | Alignment with BTC    | `btcCorrelation`, `dominance` | **LONG:** BTC ↑; **SHORT:** BTC ↓             |
| `regime.altseason.proxy`        | Altseason Index       | `altcoinSeasonIndex`          | **LONG** when alts are gaining                |
| `regime.fear_greed_swing`       | Fear/Greed swing      | `index`                       | **LONG:** from fear; **SHORT:** extreme greed |
| `sentiment.lr_topTraders_shift` | Top traders L/S shift | `ratio`                       | Contrarian to the crowd                       |
| `sentiment.fear_greed_level`    | Fear/Greed level      | `index`                       | **LONG:** from fear; **SHORT:** from greed    |

### Momentum Factors

| Key                           | Description         | Source                  | LONG / SHORT                                        |
| ----------------------------- | ------------------- | ----------------------- | --------------------------------------------------- |
| `impulse.price.move`          | Sharp price move    | `klines`, `trades`      | **LONG:** upward impulse; **SHORT:** downward       |
| `impulse.volume.flow.confirm` | Volume confirmation | `trades`, `volumeDelta` | **LONG** if volume confirms the move                |
| `impulse.oi.confirm`          | OI confirmation     | `OI`, `funding`         | **LONG:** price ↑ + OI ↑; **SHORT:** price ↓ + OI ↑ |

***

## 🔄 In Development

### Technical

* `tech.momentum.rsi.div` — RSI divergences (requires price swing points).
* `tech.pattern.sr_breakout` — S/R breakout (partly covered by levels).
* `tech.pattern.squeeze_break_dir` — Squeeze breakout direction (combo).

### Derivatives

* `deriv.contango_regime` — Contango/backwardation regime.

### Order Book

* `ob.spread.sensitivity` — Needs historical spread changes.
* `ob.spoofing.risk` — Requires L2 stream (wall instability).

### On-chain

* `onchain.staking_proxy` — Outflow to staking.
* `onchain.unlocks_risk` — Large unlocks.

### Macro / News

* `macro.btc_policy_shock` — ETF/regulatory events via keywords.

### Meta

* `meta.time_of_day_effect` — Session effects (Asia/EU/US).
* `meta.event_proximity_weight` — Proximity to event.
