---
lang: en
title: Documentation — TP/SL Strategies
description: Parameters for constructing take-profits and stop-losses
order: 5
navTitle: ' TP/SL strategies'
draft: false
publishedAt: 2025-09-04T21:00:00.000Z
---

# TP/SL Strategies

Pumpushka Bot supports several strategies for managing take-profits (TP) and stop-losses (SL).\
Each strategy has its own parameters, but there are also common rules.

## Shared Parameters

* **rr \[tp1, tp2, tp3]** — target Risk/Reward ratios for each TP.
* **slAtrK** — ATR multiplier for stop-loss (higher value → wider stop).
* **slPctK** — stop buffer in % of price, used if ATR is unavailable.
* **limitMinDistPct / limitMaxDistPct** — min/max distance from current price for limit entry.
* **minDistPct** — minimum distance between Entry and TP/SL (to avoid unrealistically close levels).
* **maxDistPct** — maximum allowed distance for TP1 (keeps setups realistic).
* **tpMinGapR / tpMinGapPct** — minimum gap between TP2 and TP3.
* **alloc** — position allocation across TP1–TP3.

***

## Normal

* **rr = \[1.0, 1.8, 3.0] \***
* **slAtrK = 1.2**
* **limitSnap ≈ ±0.4%**
* **alloc = 40/35/25**

👉 Balanced setup between risk control and potential for larger moves.

***

## Aggressive

* **rr = \[0.8, 1.5, 2.5] \***
* **slAtrK = 1.0**
* **limitSnap up to ±0.6%**
* **alloc = 30/30/40**

👉 More frequent trades, tighter stops, main profit expected at the last TP.

***

## Conservative

* **rr = \[1.2, 2.0, 3.5] \***
* **slAtrK = 1.5**
* **limitSnap 0.3–0.5%**
* **alloc = 50/30/20**

👉 Safer approach: fewer but higher-quality trades, with most of the position closed at TP1.

***

## Safe

* **rr = \[1.0, 1.5, 2.0] \***
* **slAtrK = 1.8**
* **limitSnap ≤0.3%**
* **alloc = 60/30/10**

👉 Ultra-conservative mode: quick profit-taking and maximum capital protection.

***

## Strategy Comparison

* **Aggressive** → more trades, closer TPs, higher risk.
* **Normal** → universal balance.
* **Conservative** → wider stops, further TPs, fewer but stronger trades.
* **Safe** → defensive mode, quick exit on small moves.

\*The **rr** of each strategy takes into account the minimum *RRR* from the general bot settings `/settings`.
