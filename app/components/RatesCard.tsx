"use client";

import { useState } from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import LinkButton from "./LinkButton";
import { IconChevronDown, IconSwap } from "./icons";
import { formatAmount } from "../utils/format";

const mockRates = [
  { pair: "USD / RUB", buy: 92.3, sell: 93.2 },
  { pair: "EUR / RUB", buy: 107.5, sell: 108.12 },
  { pair: "USDT / RUB", buy: 98.8, sell: 99.38 },
  { pair: "BTC / USDT", buy: 98200, sell: 98342 },
  { pair: "GBP / RUB", buy: 125.4, sell: 126.8 },
  { pair: "CNY / RUB", buy: 12.9, sell: 13.1 },
  { pair: "ETH / USDT", buy: 3450, sell: 3480 },
];

const currencies = ["RUB", "USD", "EUR", "USDT", "BTC"];

const currencySymbols: Record<string, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
  USDT: "₮",
  BTC: "₿",
};

const mockBalances: Record<string, number> = {
  RUB: 210029,
  USD: 201023,
  EUR: 180450,
  USDT: 195000,
  BTC: 0.05,
};

const rateMap: Record<string, Record<string, number>> = {
  RUB: { RUB: 1, USD: 0.01, EUR: 0.0092, USDT: 0.0101, BTC: 0.0000001 },
  USD: { RUB: 99.45, EUR: 1.09, USDT: 1, BTC: 0.0000102 },
  EUR: { RUB: 108.12, USD: 0.92, USDT: 0.92, BTC: 0.0000093 },
  USDT: { RUB: 99.38, USD: 1, EUR: 1.09, BTC: 0.0000102 },
  BTC: { RUB: 9834200, USD: 98342, EUR: 107245, USDT: 98342 },
};

export default function RatesCard() {
  const [activeTab, setActiveTab] = useState<"rates" | "converter">("rates");
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RUB");

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const parsedAmount = parseFloat(amount.replace(/\s/g, "").replace(",", "."));
  const result =
    amount && !isNaN(parsedAmount)
      ? (parsedAmount * (rateMap[fromCurrency]?.[toCurrency] ?? 0)).toLocaleString("ru-RU", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })
      : "—";

  return (
    <Card fullHeight>
      <CardHeader
        icon={<span className="text-lg font-medium text-gray-600">↔</span>}
        title="Курсы"
        headerActions={<LinkButton>Изменить курс</LinkButton>}
      />

      <div className="mb-[40px] flex gap-6">
        <button
          type="button"
          onClick={() => setActiveTab("rates")}
          className={`relative pb-[5px] text-sm font-medium transition-colors ${
            activeTab === "rates" ? "text-blue-2" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Курсы
          {activeTab === "rates" && (
            <span className="absolute bottom-0 left-0 right-0 h-px bg-blue-2 rounded-full" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("converter")}
          className={`relative pb-[5px] text-sm font-medium transition-colors ${
            activeTab === "converter" ? "text-blue-2" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Конвертер
          {activeTab === "converter" && (
            <span className="absolute bottom-0 left-0 right-0 h-px bg-blue-2 rounded-full" />
          )}
        </button>
      </div>

      <div className="flex min-h-[240px] flex-1 flex-col overflow-hidden">
      {activeTab === "rates" && (
        <div className="relative flex flex-1 flex-col">
          <div className="rates-table-scroll h-[250px] max-h-[250px] overflow-y-auto pr-5">
            <div className="divide-y divide-gray-100">
              {mockRates.map((item) => (
                <div
                  key={item.pair}
                  className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="text-[14px] font-semibold text-black-1">{item.pair}</span>
                    <div className="flex items-center gap-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] text-gray-500">Покупка</span>
                        <span className="text-[14px] font-medium text-green-1/70">
                          {item.buy >= 1000 ? formatAmount(item.buy) : item.buy.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] text-gray-500">Продажа</span>
                        <span className="text-[14px] font-medium text-red-1/70">
                          {item.sell >= 1000 ? formatAmount(item.sell) : item.sell.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <LinkButton className="shrink-0">Изменить</LinkButton>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom fade overlay — under the table */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-6 bg-gradient-to-t from-white to-transparent"
            aria-hidden
          />
        </div>
      )}

      {activeTab === "converter" && (
        <div className="relative flex flex-1 flex-col">
          {/* Top card: From currency — 20px padding, compact */}
          <div className="flex shrink-0 flex-col gap-2 overflow-hidden rounded-xl border border-gray-200 bg-[#F5F7F9] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E0E3EB] text-sm font-medium text-black-1">
                    {currencySymbols[fromCurrency] ?? fromCurrency}
                  </div>
                  <div className="relative flex items-center">
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="appearance-none border-0 bg-transparent text-lg font-medium text-black-1 focus:ring-0"
                      style={{ paddingLeft: 20, paddingRight: 20 }}
                    >
                      {currencies.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <IconChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <p className="text-sm font-medium text-black-1/50">
                  Доступно: {formatAmount(mockBalances[fromCurrency] ?? 0)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 text-right">
                <p className="text-sm font-medium text-black-1/50">Сумма</p>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full min-w-[120px] border-0 bg-transparent py-0 text-right text-[25px] font-medium text-black-1 placeholder:text-black-1/40 focus:ring-0"
                  style={{ paddingLeft: 20, paddingRight: 20 }}
                />
              </div>
            </div>
          </div>

          {/* 15px gap with swap button overlapping */}
          <div className="relative z-10 flex h-[15px] shrink-0 items-center justify-center">
            <button
              type="button"
              onClick={handleSwapCurrencies}
              className="absolute flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm text-blue-2 hover:bg-[#F5F7F9] transition-colors"
              title="Поменять местами"
            >
              <IconSwap className="h-[14px] w-[14px] rotate-90" />
            </button>
          </div>

          {/* Bottom card: To currency — 20px padding, compact */}
          <div className="flex shrink-0 flex-col gap-2 overflow-hidden rounded-xl border border-gray-200 bg-[#F5F7F9] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E0E3EB] text-sm font-medium text-black-1">
                    {currencySymbols[toCurrency] ?? toCurrency}
                  </div>
                  <div className="relative flex items-center">
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="appearance-none border-0 bg-transparent text-lg font-medium text-black-1 focus:ring-0"
                      style={{ paddingLeft: 20, paddingRight: 20 }}
                    >
                      {currencies.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <IconChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <p className="text-sm font-medium text-black-1/50">
                  Курс {(rateMap[fromCurrency]?.[toCurrency] ?? 0).toFixed(2)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 text-right">
                <p className="text-sm font-medium text-black-1/50">Сумма</p>
                <p className="text-[25px] font-medium text-black-1">
                  {amount && !isNaN(parsedAmount) ? `${result} ${toCurrency}` : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </Card>
  );
}
