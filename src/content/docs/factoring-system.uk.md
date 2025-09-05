---
lang: uk
title: Документація — Фактори аналізу
description: 'Повний список факторів, які враховує Pumpushka Bot'
order: 6
navTitle: Фактори аналізу
draft: false
publishedAt: 2025-09-04T21:00:00.000Z
---

# Фактори аналізу

Pumpushka Bot оцінює угоди на основі десятків факторів, які групуються за категоріями.\
Усі фактори формують **Rationale Score** та впливають на напрямок сигналу.

***

## ✅ Реалізовані фактори

### Technical

| Ключ                        | Опис                  | Джерело               | LONG / SHORT умови                              | Нормалізація       |       |      |
| --------------------------- | --------------------- | --------------------- | ----------------------------------------------- | ------------------ | ----- | ---- |
| tech.trend.adx\_di          | Сила тренду (+DI/−DI) | adx, plusDI, minusDI  | LONG: ADX>25 & +DI>−DI; SHORT: ADX>25 & −DI>+DI | min(1,(ADX-20)/30) |       |      |
| tech.trend.ema\_slope       | Нахил EMA             | ema\[]                | LONG: ema\[-1]>ema\[0]; SHORT: навпаки          | лінійна по куту    |       |      |
| tech.trend.psar             | Тренд PSAR            | psar.trends\[-1]      | LONG: rising; SHORT: falling                    | бінарний/0.7       |       |      |
| tech.trend.aroon            | Свіжість high/low     | aroon.up, aroon.down  | LONG: up>down+20; SHORT: down>up+20             | (up-down)/100      |       |      |
| tech.momentum.macd          | MACD імпульс          | macdLine, signalLine  | LONG: гістограма>0; SHORT: \<0                  | tanh(              | hist  | )    |
| tech.momentum.rsi.zone      | RSI зона              | rsi                   | LONG: 50–70↑; SHORT: \<45↓                      | відстань до 50     |       |      |
| tech.momentum.stoch.cross   | Стохастик крос        | stochastic.k,d        | LONG: k>d \<60; SHORT: k<d >40                  |                    | k−d   | /100 |
| tech.volatility.atr\_pct    | ATR%                  | atr, price            | Підсилювач тренду                               | коефіцієнт         |       |      |
| tech.volatility.bb\_break   | Пробій BB             | bb.upper/lower, price | LONG: close>upper; SHORT: close\<lower          | dist/BBwidth       |       |      |
| tech.volatility.bb\_squeeze | Стиснення BB          | bbWidthPercent        | Підготовка                                      | нейтр.             |       |      |
| tech.volume.obv\_slope      | Напрям OBV            | obvSlope              | LONG: slope>0; SHORT: slope\<0                  | tanh(              | slope | )    |
| tech.volume.cmf             | Потік грошей          | cmf                   | LONG: >0.05; SHORT: \<−0.05                     | −1..1              |       |      |

### Derivatives

| Ключ                        | Опис                | Джерело                  | LONG / SHORT                                 | Норм.   |
| --------------------------- | ------------------- | ------------------------ | -------------------------------------------- | ------- |
| deriv.oi.delta\_24h         | Зміна OI 24h        | openInterest\[]          | LONG: ціна↑ OI↑; SHORT: ціна↓ OI↑            | %       |
| deriv.funding.avg24h        | Середній funding    | fundingRate\[]           | LONG: ≤0 при ціні↑; SHORT: ≫0 при лонгах     | z-score |
| deriv.funding.last          | Останній funding    | lastFundingRate          | аналогічно                                   | z-score |
| deriv.ls\_ratio.topTraders  | L/S топ-трейдерів   | longShortRatioTopTraders | LONG: \<1 + ціна↑; SHORT: >1.5 + стагнація/↓ | —       |
| deriv.short\_squeeze\_setup | Сетап на шорт-сквіз | price↑, OI↑, funding≤0   | LONG                                         | —       |
| deriv.long\_squeeze\_setup  | Сетап на лонг-сквіз | price↓, OI↑, funding>0   | SHORT                                        | —       |

### Order Book

| Ключ                    | Опис               | Джерело           | LONG / SHORT                  | Норм.                |
| ----------------------- | ------------------ | ----------------- | ----------------------------- | -------------------- |
| ob.imbalance.bids\_asks | Дисбаланс bid/ask  | whaleVolume       | LONG: bid>ask; SHORT: ask>bid | (bid-ask)/(bid+ask)  |
| ob.whales.bid\_walls    | Bid-стіни          | bidWhaleOrders\[] | LONG: наявність               | сила=обсяг/дистанція |
| ob.whales.ask\_walls    | Ask-стіни          | askWhaleOrders\[] | SHORT                         | аналогічно           |
| ob.whales.count\_ratio  | К-ть whale-ордерів | bid/ask count     | LONG: bidCount>askCount       | —                    |

### On-chain

| Ключ                                  | Опис              | Джерело         | LONG / SHORT                                    |
| ------------------------------------- | ----------------- | --------------- | ----------------------------------------------- |
| onchain.exchange\_outflow\_vs\_inflow | Outflow>Inflow    | whaleAlerts     | LONG при перевищенні                            |
| onchain.whales.accumulation           | Акумуляція китами | tx+alerts       | LONG                                            |
| onchain.whales.distribution           | Роздача           | tx+alerts       | SHORT                                           |
| onchain.tx.activity\_rate             | Активність tx     | txCount, volume | LONG: активність↑; SHORT: сплеск перед падінням |
| onchain.big\_txs.count                | Великі tx         | bigTxCount      | контекстно                                      |

### News / Macro

| Ключ                        | Опис             | Джерело                | LONG / SHORT                   |
| --------------------------- | ---------------- | ---------------------- | ------------------------------ |
| news.relevance.positive     | Позитивні новини | importantNews          | LONG                           |
| news.relevance.negative     | Негативні новини | importantNews          | SHORT                          |
| macro.upcoming.high\_impact | Близькі події    | futureEvents           | нейтральний буфер              |
| macro.risk\_on\_off         | Risk regime      | dominance, stablecoins | LONG: risk-on; SHORT: risk-off |

### Regime / Sentiment

| Ключ                            | Опис                   | Джерело                   | LONG / SHORT                              |
| ------------------------------- | ---------------------- | ------------------------- | ----------------------------------------- |
| regime.btc\_trend\_alignment    | Узгодження з BTC       | btcCorrelation, dominance | LONG: BTC↑; SHORT: BTC↓                   |
| regime.altseason.proxy          | Altseason Index        | altcoinSeasonIndex        | LONG при рості альтів                     |
| regime.fear\_greed\_swing       | Fear/Greed зміна       | index                     | LONG: зі страху; SHORT: екстр. жадібність |
| sentiment.lr\_topTraders\_shift | Зсув L/S топ-трейдерів | ratio                     | контр-натовп                              |
| sentiment.fear\_greed\_level    | Рівень F/G             | index                     | LONG зі страху; SHORT з жадібності        |

### Імпульсні фактори

| Ключ                         | Опис                  | Джерело             | LONG / SHORT                        |
| ---------------------------- | --------------------- | ------------------- | ----------------------------------- |
| impulse.price.move           | Різкий ціновий рух    | klines, trades      | LONG при імпульсі вгору; SHORT вниз |
| impulse.volume.flow\.confirm | Підтвердження обсягом | trades, volumeDelta | LONG якщо обсяг підтверджує рух     |
| impulse.oi.confirm           | Підтвердження OI      | OI, funding         | LONG: ціна↑+OI↑; SHORT: ціна↓+OI↑   |

***

## 🔄 У розробці

### Technical

* tech.momentum.rsi.div — дивергенції RSI (потрібні свінги ціни).
* tech.pattern.sr\_breakout — breakout S/R (частково покривається levels).
* tech.pattern.squeeze\_break\_dir — вихід зі стиску (комбінація).

### Derivatives

* deriv.contango\_regime — режим контанго/беквордації.

### Order Book

* ob.spread.sensitivity — потрібна історія зміни спреду.
* ob.spoofing.risk — потрібен L2-стрім (нестабільність стін).

### On-chain

* onchain.staking\_proxy — відтік у стейкінг.
* onchain.unlocks\_risk — великі unlock-и.

### Macro / News

* macro.btc\_policy\_shock — ETF/регуляторні події через ключові слова.

### Meta

* meta.time\_of\_day\_effect — ефекти сесій (Asia/EU/US).
* meta.event\_proximity\_weight — близькість до події.
