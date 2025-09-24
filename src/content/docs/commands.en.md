---
lang: en
title: Documentation — Commands
description: ' All available Pumpushka Bot commands'
order: 8
navTitle: Commands
draft: false
publishedAt: 2025-09-23T21:00:00.000Z
---

# Commands

Pumpushka Bot works via simple Telegram commands.\
Below is the list of all available commands.

***

## Basics

| Command       | Description                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **/start**    | Launch the bot and create an account. If an account already exists, it will show a list of the top 30 coins for long/short trading. |
| **/help**     | A short guide to all commands.                                                                                                      |
| **/settings** | Settings (language, strategy, notifications, risk/reward, execution mode, interval, number of coins — base position size).          |

***

## Market Analysis

| Command        | Description                                                                                                                                                                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **/analyze**   | Analyze a trading pair. If you enter the command without a pair, it will show the top 30 coins for long/short trading. Alternatively, type **/market BTCUSDT** and the system will analyze the specified pair using RR/volume/leverage/strategy from your settings (by default → 1:1.2/1000/1/auto respectively). |
| **/market**    | Quick analysis of the current crypto market.                                                                                                                                                                                                                                                                      |
| **/track**     | List of tracked signal trades. You can track up to 10 per account.                                                                                                                                                                                                                                                |
| **/favorites** | List of favorite coins. You can add up to 12 per account.                                                                                                                                                                                                                                                         |

***

## Other

| Command     | Description                                                                                                                                                                                                                                                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **/pay**    | Pay for a subscription via NowPayments and check your current account status.                                                                                                                                                                                                                                                                      |
| **/about**  | Bot version and a link to the documentation.                                                                                                                                                                                                                                                                                                       |
| **/detail** | Extended info about Coin. Sort of info: Identity, Timeline, Engagement, URLs, Prices & Changes, Market Cap & Ranks, Volumes, Price Ranges, All-Time Extremes, Yesterday Snapshot, Supply (Snapshot), Supply Details, Platforms/Contracts, Relations, Token Unlocks, Earn Programs, Supported Wallets, Flags, Profile Completion Score, Misc/Other  |

***

> ℹ️ You can call any command at any time.
