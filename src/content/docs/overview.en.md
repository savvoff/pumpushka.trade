---
lang: en
title: Documentation — Overview
description: >-
  What is Pumpushka Bot, what is it made of and what data blocks/functions does
  it consume
order: 1
navTitle: Bot overview
draft: false
publishedAt: 2025-09-04T21:00:00.000Z
---

# Pumpushka Bot — Overview

Pumpushka Bot is an analytical assistant on Telegram designed to help traders make decisions.\
It combines classic technical analysis with derivatives data, sentiment, order book signals, on-chain activity, and news - using a weighted factor system.

## Architecture

1. **Data Sources**
   * Exchange APIs (Klines, BookTicker, Order Book, Trades, etc.)
   * Derivatives (Open Interest, Funding, Volume, Symbol Stats, etc.)
   * On-chain transactions and whale activity (Whale Alert, Etherscan, etc.)
   * Macroeconomic events and news (mql5)
2. **Factor Processing**
   * Normalization to a unified scale \[-1…1]
   * Time-decay (fresh signals carry more weight)
   * Clustering of correlated factors
   * Weight profiles for different timeframes and market regimes
3. **Analysis Module**
   * Calculation of the **Rationale Score** (the number and quality of factors supporting the entry)
   * Scenario generation (long / short / none)
   * TP/SL calculation with Risk/Reward in mind
   * Trade success probability
4. **Output**
   * A concise Telegram message with the conclusion
   * Clear levels: Entry, TP1–TP3, SL
   * Explanation: which factors influenced the decision

## Core Features

* 📊 **Market Scan** — quick analysis of the crypto market state (`/market`)
* ⭐️ **Favorite Coins** — your curated list of coins (`/favorites`)
* 👀 **Coin Tracking** — monitor the status of a signal for a trading pair (`/track`)
* 🎯 **TP/SL Strategies** — 4 ready-made profiles: Normal, Aggressive, Conservative, Safe
* 🐋 **On-chain Alerts** — whale transactions and large token movements during coin analysis
* 🌍 **Macro & News** — incorporate global events into signals
* 🔔 **Notifications (in development)** — alerts about important events and trending coins
