---
lang: uk
title: Документація — Система факторів
description: 'Повний список факторів, які враховує Pumpushka Bot'
order: 6
navTitle: Система факторів
draft: false
publishedAt: 2025-09-04T21:00:00.000Z
---

# Фактори аналізу

Pumpushka Bot оцінює угоди на основі десятків факторів, які групуються за категоріями.\
Усі фактори формують **Rationale Score** та впливають на напрямок сигналу.

***

## ✅ Реалізовані фактори

### Technical

| Ключ                         | Опис                  | Джерело                        | LONG / SHORT умови                                              |
| ---------------------------- | --------------------- | ------------------------------ | --------------------------------------------------------------- |
| `tech.trend.adx_di`          | Сила тренду (+DI/−DI) | `adx`, `plusDI`, `minusDI`     | **LONG:** ADX > 25 & +DI > −DI; **SHORT:** ADX > 25 & −DI > +DI |
| `tech.trend.ema_slope`       | Нахил EMA             | `ema[]`                        | **LONG:** `ema[-1] > ema[0]`; **SHORT:** навпаки                |
| `tech.trend.psar`            | Тренд PSAR            | `psar.trends[-1]`              | **LONG:** rising; **SHORT:** falling                            |
| `tech.trend.aroon`           | Свіжість high/low     | `aroon.up`, `aroon.down`       | **LONG:** up > down + 20; **SHORT:** down > up + 20             |
| `tech.momentum.macd`         | MACD імпульс          | `macdLine`, `signalLine`       | **LONG:** гістограма > 0; **SHORT:** \< 0                       |
| `tech.momentum.rsi.zone`     | RSI зона              | `rsi`                          | **LONG:** 50–70↑; **SHORT:** \< 45↓                             |
| `tech.momentum.stoch.cross`  | Стохастик крос        | `stochastic.k`, `stochastic.d` | **LONG:** k > d & k \< 60; **SHORT:** k \< d & k > 40           |
| `tech.volatility.atr_pct`    | ATR%                  | `atr`, `price`                 | Підсилювач тренду (контекстно, без напрямку)                    |
| `tech.volatility.bb_break`   | Пробій BB             | `bb.upper/lower`, `price`      | **LONG:** close > upper; **SHORT:** close \< lower              |
| `tech.volatility.bb_squeeze` | Стиснення BB          | `bbWidthPercent`               | Підготовка/контекст (без напрямку)                              |
| `tech.volume.obv_slope`      | Напрям OBV            | `obvSlope`                     | **LONG:** slope > 0; **SHORT:** slope \< 0                      |
| `tech.volume.cmf`            | Потік грошей          | `cmf`                          | **LONG:** > 0.05; **SHORT:** \< −0.05                           |

### Derivatives

| Ключ                        | Опис                | Джерело                        | LONG / SHORT                                                    |
| --------------------------- | ------------------- | ------------------------------ | --------------------------------------------------------------- |
| `deriv.oi.delta_24h`        | Зміна OI 24h        | `openInterest[]`               | **LONG:** ціна ↑ & OI ↑; **SHORT:** ціна ↓ & OI ↑               |
| `deriv.funding.avg24h`      | Середній funding    | `fundingRate[]`                | **LONG:** ≤ 0 при ціні ↑; **SHORT:** ≫ 0 при домінуванні лонгів |
| `deriv.funding.last`        | Останній funding    | `lastFundingRate`              | Аналогічно до avg24h                                            |
| `deriv.ls_ratio.topTraders` | L/S топ-трейдерів   | `longShortRatioTopTraders`     | **LONG:** \< 1 + ціна ↑; **SHORT:** > 1.5 + стагнація/↓         |
| `deriv.short_squeeze_setup` | Сетап на шорт-сквіз | `price↑`, `OI↑`, `funding ≤ 0` | **LONG**                                                        |
| `deriv.long_squeeze_setup`  | Сетап на лонг-сквіз | `price↓`, `OI↑`, `funding > 0` | **SHORT**                                                       |

### Order Book

| Ключ                     | Опис               | Джерело            | LONG / SHORT                              |
| ------------------------ | ------------------ | ------------------ | ----------------------------------------- |
| `ob.imbalance.bids_asks` | Дисбаланс bid/ask  | `whaleVolume`      | **LONG:** bid > ask; **SHORT:** ask > bid |
| `ob.whales.bid_walls`    | Bid-стіни          | `bidWhaleOrders[]` | **LONG:** наявність/сила bid-стін         |
| `ob.whales.ask_walls`    | Ask-стіни          | `askWhaleOrders[]` | **SHORT:** наявність/сила ask-стін        |
| `ob.whales.count_ratio`  | К-ть whale-ордерів | `bid/ask count`    | **LONG:** bidCount > askCount             |

### On-chain

| Ключ                                 | Опис              | Джерело             | LONG / SHORT                                             |
| ------------------------------------ | ----------------- | ------------------- | -------------------------------------------------------- |
| `onchain.exchange_outflow_vs_inflow` | Outflow > Inflow  | `whaleAlerts`       | **LONG** при стійкому перевищенні                        |
| `onchain.whales.accumulation`        | Акумуляція китами | `tx+alerts`         | **LONG**                                                 |
| `onchain.whales.distribution`        | Роздача           | `tx+alerts`         | **SHORT**                                                |
| `onchain.tx.activity_rate`           | Активність tx     | `txCount`, `volume` | **LONG:** активність ↑; **SHORT:** сплеск перед падінням |
| `onchain.big_txs.count`              | Великі tx         | `bigTxCount`        | Контекстно                                               |

### News / Macro

| Ключ                         | Опис             | Джерело                    | LONG / SHORT                           |
| ---------------------------- | ---------------- | -------------------------- | -------------------------------------- |
| `news.relevance.positive`    | Позитивні новини | `importantNews`            | **LONG**                               |
| `news.relevance.negative`    | Негативні новини | `importantNews`            | **SHORT**                              |
| `macro.upcoming.high_impact` | Близькі події    | `futureEvents`             | Нейтральний буфер                      |
| `macro.risk_on_off`          | Risk regime      | `dominance`, `stablecoins` | **LONG:** risk-on; **SHORT:** risk-off |

### Regime / Sentiment

| Ключ                            | Опис                   | Джерело                       | LONG / SHORT                                      |
| ------------------------------- | ---------------------- | ----------------------------- | ------------------------------------------------- |
| `regime.btc_trend_alignment`    | Узгодження з BTC       | `btcCorrelation`, `dominance` | **LONG:** BTC ↑; **SHORT:** BTC ↓                 |
| `regime.altseason.proxy`        | Altseason Index        | `altcoinSeasonIndex`          | **LONG** при рості альтів                         |
| `regime.fear_greed_swing`       | Fear/Greed зміна       | `index`                       | **LONG:** зі страху; **SHORT:** екстр. жадібність |
| `sentiment.lr_topTraders_shift` | Зсув L/S топ-трейдерів | `ratio`                       | Контр-натовп                                      |
| `sentiment.fear_greed_level`    | Рівень F/G             | `index`                       | **LONG:** зі страху; **SHORT:** з жадібності      |

### Імпульсні фактори

| Ключ                          | Опис                  | Джерело                 | LONG / SHORT                                      |
| ----------------------------- | --------------------- | ----------------------- | ------------------------------------------------- |
| `impulse.price.move`          | Різкий ціновий рух    | `klines`, `trades`      | **LONG:** імпульс вгору; **SHORT:** вниз          |
| `impulse.volume.flow.confirm` | Підтвердження обсягом | `trades`, `volumeDelta` | **LONG** якщо обсяг підтверджує рух               |
| `impulse.oi.confirm`          | Підтвердження OI      | `OI`, `funding`         | **LONG:** ціна ↑ + OI ↑; **SHORT:** ціна ↓ + OI ↑ |

***

## 🔄 У розробці

### Technical

* `tech.momentum.rsi.div` — дивергенції RSI (потрібні свінги ціни).
* `tech.pattern.sr_breakout` — breakout S/R (частково покривається levels).
* `tech.pattern.squeeze_break_dir` — вихід зі стиску (комбінація).

### Derivatives

* `deriv.contango_regime` — режим контанго/беквордації.

### Order Book

* `ob.spread.sensitivity` — потрібна історія зміни спреду.
* `ob.spoofing.risk` — потрібен L2-стрім (нестабільність стін).

### On-chain

* `onchain.staking_proxy` — відтік у стейкінг.
* `onchain.unlocks_risk` — великі unlock-и.

### Macro / News

* `macro.btc_policy_shock` — ETF/регуляторні події через ключові слова.

### Meta

* `meta.time_of_day_effect` — ефекти сесій (Asia/EU/US).
* `meta.event_proximity_weight` — близькість до події.
