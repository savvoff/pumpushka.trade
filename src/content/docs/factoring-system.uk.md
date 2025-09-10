---
lang: uk
title: Документація — Система факторів
description: A complete list of factors that Pumpushka Bot takes into account
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

| Ключ                         | Опис                  | LONG / SHORT умови                                              |
| ---------------------------- | --------------------- | --------------------------------------------------------------- |
| `tech.trend.adx_di`          | Сила тренду (+DI/−DI) | **LONG:** ADX > 25 & +DI > −DI; **SHORT:** ADX > 25 & −DI > +DI |
| `tech.trend.ema_slope`       | Нахил EMA             | **LONG:** `ema[-1] > ema[0]`; **SHORT:** навпаки                |
| `tech.trend.psar`            | Тренд PSAR            | **LONG:** rising; **SHORT:** falling                            |
| `tech.trend.aroon`           | Свіжість high/low     | **LONG:** up > down + 20; **SHORT:** down > up + 20             |
| `tech.momentum.macd`         | MACD імпульс          | **LONG:** гістограма > 0; **SHORT:** \< 0                       |
| `tech.momentum.rsi.zone`     | RSI зона              | **LONG:** 50–70↑; **SHORT:** \< 45↓                             |
| `tech.momentum.stoch.cross`  | Стохастик крос        | **LONG:** k > d & k \< 60; **SHORT:** k \< d & k > 40           |
| `tech.volatility.atr_pct`    | ATR%                  | Підсилювач тренду (контекстно, без напрямку)                    |
| `tech.volatility.bb_break`   | Пробій BB             | **LONG:** close > upper; **SHORT:** close \< lower              |
| `tech.volatility.bb_squeeze` | Стиснення BB          | Підготовка/контекст (без напрямку)                              |
| `tech.volume.obv_slope`      | Напрям OBV            | **LONG:** slope > 0; **SHORT:** slope \< 0                      |
| `tech.volume.cmf`            | Потік грошей          | **LONG:** > 0.05; **SHORT:** \< −0.05                           |

### Derivatives

| Ключ                        | Опис                | LONG / SHORT                                                    |
| --------------------------- | ------------------- | --------------------------------------------------------------- |
| `deriv.oi.delta_24h`        | Зміна OI 24h        | **LONG:** ціна ↑ & OI ↑; **SHORT:** ціна ↓ & OI ↑               |
| `deriv.funding.avg24h`      | Середній funding    | **LONG:** ≤ 0 при ціні ↑; **SHORT:** ≫ 0 при домінуванні лонгів |
| `deriv.funding.last`        | Останній funding    | Аналогічно до avg24h                                            |
| `deriv.ls_ratio.topTraders` | L/S топ-трейдерів   | **LONG:** \< 1 + ціна ↑; **SHORT:** > 1.5 + стагнація/↓         |
| `deriv.short_squeeze_setup` | Сетап на шорт-сквіз | **LONG**: `price↑`, `OI↑`, `funding ≤ 0`                        |
| `deriv.long_squeeze_setup`  | Сетап на лонг-сквіз | **SHORT**: `price↓`, `OI↑`, `funding > 0`                       |

### Order Book

| Ключ                     | Опис               | LONG / SHORT                              |
| ------------------------ | ------------------ | ----------------------------------------- |
| `ob.imbalance.bids_asks` | Дисбаланс bid/ask  | **LONG:** bid > ask; **SHORT:** ask > bid |
| `ob.whales.bid_walls`    | Bid-стіни          | **LONG:** наявність/сила bid-стін         |
| `ob.whales.ask_walls`    | Ask-стіни          | **SHORT:** наявність/сила ask-стін        |
| `ob.whales.count_ratio`  | К-ть whale-ордерів | **LONG:** bidCount > askCount             |

### On-chain

| Ключ                                 | Опис              | LONG / SHORT                                             |
| ------------------------------------ | ----------------- | -------------------------------------------------------- |
| `onchain.exchange_outflow_vs_inflow` | Outflow > Inflow  | **LONG** при стійкому перевищенні                        |
| `onchain.whales.accumulation`        | Акумуляція китами | **LONG**: transactions + alerts algorithm                |
| `onchain.whales.distribution`        | Роздача           | **SHORT** transactions + alerts algorithm                |
| `onchain.tx.activity_rate`           | Активність tx     | **LONG:** активність ↑; **SHORT:** сплеск перед падінням |
| `onchain.big_txs.count`              | Великі tx         | Контекстно                                               |

### News / Macro

| Ключ                         | Опис             | LONG / SHORT                           |
| ---------------------------- | ---------------- | -------------------------------------- |
| `news.relevance.positive`    | Позитивні новини | **LONG**: news sentiment algorithm     |
| `news.relevance.negative`    | Негативні новини | **SHORT** news sentiment algorithm     |
| `macro.upcoming.high_impact` | Близькі події    | Нейтральний буфер                      |
| `macro.risk_on_off`          | Risk regime      | **LONG:** risk-on; **SHORT:** risk-off |

### Regime / Sentiment

| Ключ                            | Опис                   | Джерело                       | LONG / SHORT                                      |
| ------------------------------- | ---------------------- | ----------------------------- | ------------------------------------------------- |
| `regime.btc_trend_alignment`    | Узгодження з BTC       | `btcCorrelation`, `dominance` | **LONG:** BTC ↑; **SHORT:** BTC ↓                 |
| `regime.altseason.proxy`        | Altseason Index        | `altcoinSeasonIndex`          | **LONG** при рості альтів                         |
| `regime.fear_greed_swing`       | Fear/Greed зміна       | `index`                       | **LONG:** зі страху; **SHORT:** екстр. жадібність |
| `sentiment.lr_topTraders_shift` | Зсув L/S топ-трейдерів | `ratio`                       | Контр-натовп                                      |
| `sentiment.fear_greed_level`    | Рівень F/G             | `index`                       | **LONG:** зі страху; **SHORT:** з жадібності      |

### Momentum Factors

| Ключ                          | Опис                  | LONG / SHORT                                      |
| ----------------------------- | --------------------- | ------------------------------------------------- |
| `impulse.price.move`          | Різкий ціновий рух    | **LONG:** імпульс вгору; **SHORT:** вниз          |
| `impulse.volume.flow.confirm` | Підтвердження обсягом | **LONG** якщо обсяг підтверджує рух               |
| `impulse.oi.confirm`          | Підтвердження OI      | **LONG:** ціна ↑ + OI ↑; **SHORT:** ціна ↓ + OI ↑ |

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
