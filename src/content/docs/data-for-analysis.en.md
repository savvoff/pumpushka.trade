---
lang: en
title: Documentation — Data for analysis
description: All sources and factors used by Pumpushka Bot
order: 3
navTitle: Data for analysis
draft: false
publishedAt: 2025-09-04T21:00:00.000Z
---

# Data for Analysis

Pumpushka Bot combines market, derivatives, on-chain, and news data.\
This allows signals to be generated based on dozens of factors at once.

## 1. Candlestick Data (Klines)

* Historical OHLCV for trend analysis.
* Support and resistance detection.
* Analysis of abnormal candles, gaps, imbalance zones.

## 2. BookTicker Data

* Current bid/ask quotes.
* Imbalance between buyers and sellers.
* Short-term market pressure estimation.

## 3. Trade Tape (Trades)

* Aggressor buys/sells (delta).
* Volume spikes, tick speed.
* Initiative trades and clusters (*in development*).

## 4. Order Book Depth

* Liquidity distribution across levels.
* Bid/ask imbalance at different depths.
* Spoofing and iceberg order detection.

## 5. Derivatives

* Open Interest (OI) and OI changes.
* Funding rate and countdown.
* Basis (spot vs futures spread) (*in development*).
* Liquidations and liquidation clusters (*in development*).

## 6. Volatility & Market Regime

* ATR (Average True Range).
* Realized and implied volatility.
* Market regimes: trend / range / high volatility.

## 7. Correlations & Dominance

* Correlation with BTC and ETH (ETH *in development*).
* BTC Dominance — Bitcoin’s share of the crypto market.
* Sector-based correlations (DeFi, L2, meme tokens) (*in development*).
* Cross-market links (DXY, Gold, S\&P500) (*in development*).

## 8. Market Structure & Levels

* Swing highs/lows (HH/HL/LH/LL).
* Equal highs/lows (EQH/EQL).
* Fair Value Gaps (FVG).
* Liquidity pools and invalidation zones (*in development*).

## 9. Higher Timeframes

* Previous day/week/month (High/Low).
* VWAP and Anchored VWAP.
* Pivot levels, Fibonacci (*in development*).
* Volume Profile (POC, VAH, VAL) (*in development*).

## 10. Exchange Flows

* Asset inflows/outflows on CEX.
* Net flows.
* Large player behavior.

## 11. On-Chain Signals

* Whale transactions.
* Exchange and fund address labels.
* Mints and burns.
* Smart address activity (*in development*).
* Holder concentration (*in development*).

## 12. News & Sentiment

* Global macro events.
* Crypto-related news and social mentions.
* Fear & Greed Index.
* Altcoin Season Index.
* High-impact events (ETF, SEC, forks).

## 13. Liquidity & Execution Quality

* Bid/ask spread.
* Slippage simulation at different sizes.
* Depth of available liquidity.
* Execution latency.

## 14. Risk Flags

* Abnormal candles or volumes.
* Post-news “dust moves”.
* Conflicting indicators.
* High-impact warnings.

## 15. Update Frequency

* Refresh intervals (klines, order book, funding, news).
* Spike filtering and timezone normalization (*in development*).

## 16. Output Metrics

* Signal direction (long / short / none).
* Factor evaluation (**Rationale Score**).
* Trade success probability.
* Recommended TP/SL with RRR.
* Scenarios (base / bull / bear).
* Invalidation zones.

***

# Additional: How a Signal Is Formed

### Entry Modes

* **Market Execution** — instant entry at market price (fast but with spread/noise risk).
* **Limit Entry** — waits for a better price (better RR but may miss the trade).
* **Auto Mode** — hybrid, chooses between market and limit dynamically.

### Risk/Reward

* Each trade is evaluated by the risk-to-reward ratio (**RRR**, e.g. 1:2).
* Minimum distance to TP/SL is enforced to avoid unrealistically close levels.

### Rationale Score

* Metric showing how many factors confirm the entry.
* Over 50 factors are evaluated in total.
* N in Rationale Score = number of currently active factors.

### Signal Legend

* **LONG** — buy signal (price expected to rise).
* **SHORT** — sell signal (price expected to fall).
* **NONE** — no valid signal (conditions not confirmed).
* **Potential result** — simulated PnL at a given leverage.
