"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import LinkButton from "./LinkButton";
import { IconChevronDown, IconSwap } from "./icons";
import { formatAmount } from "../utils/format";

interface Rate {
  pair: string;
  buy: number;
  sell: number;
}

const initialRates: Rate[] = [
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

function CurrencySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none border-0 bg-transparent pr-5 text-lg font-medium text-black-1 transition-colors hover:text-blue-2 focus:ring-0"
      >
        {currencies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-gray-500" />
    </div>
  );
}

export default function RatesCard() {
  const [activeTab, setActiveTab] = useState<"rates" | "converter">("rates");
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [rates, setRates] = useState<Rate[]>(initialRates);
  const [editingPair, setEditingPair] = useState<string | null>(null);
  const [editBuy, setEditBuy] = useState("");
  const [editSell, setEditSell] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollTop, clientHeight, scrollHeight } = el;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
  }, []);

  useEffect(() => {
    if (activeTab !== "rates") return;
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [activeTab, checkScroll, rates]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleStartEdit = (rate: Rate) => {
    setEditingPair(rate.pair);
    setEditBuy(String(rate.buy));
    setEditSell(String(rate.sell));
  };

  const handleCancelEdit = () => {
    setEditingPair(null);
  };

  const handleSaveEdit = () => {
    if (!editingPair) return;
    const buy = parseFloat(editBuy);
    const sell = parseFloat(editSell);
    if (isNaN(buy) || isNaN(sell)) return;
    setRates((prev) =>
      prev.map((r) => (r.pair === editingPair ? { ...r, buy, sell } : r))
    );
    setEditingPair(null);
  };

  useEffect(() => {
    if (!editingPair) return;
    const onDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setEditingPair(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [editingPair]);

  const parsedAmount = parseFloat(amount.replace(/\s/g, "").replace(",", "."));
  const result =
    amount && !isNaN(parsedAmount)
      ? (parsedAmount * (rateMap[fromCurrency]?.[toCurrency] ?? 0)).toLocaleString("ru-RU", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })
      : "—";

  const editingRate = editingPair ? rates.find((r) => r.pair === editingPair) : null;

  return (
    <Card>
      <CardHeader
        icon={<span className="text-lg font-medium text-gray-600">↔</span>}
        title="Курсы"
        headerActions={<LinkButton>Изменить курс</LinkButton>}
      />

      <div className="mb-10 flex gap-6">
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

      {/* Converter is always in DOM flow so it sets the card height.
          Rates overlays it absolutely when active. */}
      <div className="relative">
        <div
          className={activeTab !== "converter" ? "invisible pointer-events-none" : ""}
          aria-hidden={activeTab !== "converter"}
        >
          <div className="flex shrink-0 flex-col gap-2 overflow-hidden rounded-xl border border-gray-200 bg-[#F5F7F9] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E0E3EB] text-sm font-medium text-black-1">
                    {currencySymbols[fromCurrency] ?? fromCurrency}
                  </div>
                  <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
                </div>
                <p className="whitespace-nowrap text-sm font-medium text-black-1/50">
                  Доступно: {formatAmount(mockBalances[fromCurrency] ?? 0)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 overflow-visible">
                <p className="text-sm font-medium text-black-1/50">Сумма</p>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full min-w-[120px] border-0 border-transparent bg-transparent py-1 text-right text-[25px] font-medium leading-[1.2] text-black-1 outline-none placeholder:text-black-1/40 focus:border-0 focus:ring-0 focus:outline-none box-content"
                />
              </div>
            </div>
          </div>

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

          <div className="flex shrink-0 flex-col gap-2 overflow-hidden rounded-xl border border-gray-200 bg-[#F5F7F9] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E0E3EB] text-sm font-medium text-black-1">
                    {currencySymbols[toCurrency] ?? toCurrency}
                  </div>
                  <CurrencySelect value={toCurrency} onChange={setToCurrency} />
                </div>
                <p className="whitespace-nowrap text-sm font-medium text-black-1/50">
                  Курс {(rateMap[fromCurrency]?.[toCurrency] ?? 0).toFixed(2)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 overflow-visible">
                <p className="text-sm font-medium text-black-1/50">Сумма</p>
                <p className="py-1 text-right text-[25px] font-medium leading-[1.2] text-black-1">
                  {amount && !isNaN(parsedAmount) ? `${result} ${toCurrency}` : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {activeTab === "rates" && (
          <div className="absolute inset-0 flex flex-col">
            <div className="relative flex flex-1 min-h-0 flex-col">
              <div
                ref={scrollContainerRef}
                className="rates-table-scroll min-h-0 flex-1 overflow-y-auto pr-5"
              >
                <div className="divide-y divide-gray-100">
                  {rates.map((item) => (
                    <div
                      key={item.pair}
                      className="group flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
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
                      <LinkButton
                        className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => handleStartEdit(item)}
                      >
                        Изменить
                      </LinkButton>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-6 bg-gradient-to-t from-white to-transparent transition-opacity ${isAtBottom ? "opacity-0" : ""}`}
                aria-hidden
              />

              {editingRate && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-[2px]">
                  <div
                    ref={popoverRef}
                    className="w-[280px] rounded-xl border border-gray-200 bg-white p-5 shadow-lg"
                  >
                    <p className="mb-4 text-sm font-semibold text-black-1">
                      {editingRate.pair}
                    </p>
                    <div className="flex flex-col gap-3">
                      <label className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-gray-500">Покупка</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editBuy}
                          onChange={(e) => setEditBuy(e.target.value)}
                          className="rounded-lg border border-gray-200 bg-[#F5F7F9] px-3 py-2 text-sm text-black-1 outline-none focus:border-blue-2 focus:ring-1 focus:ring-blue-2"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-gray-500">Продажа</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editSell}
                          onChange={(e) => setEditSell(e.target.value)}
                          className="rounded-lg border border-gray-200 bg-[#F5F7F9] px-3 py-2 text-sm text-black-1 outline-none focus:border-blue-2 focus:ring-1 focus:ring-blue-2"
                        />
                      </label>
                      <div className="mt-1 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100"
                        >
                          Отмена
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveEdit}
                          className="rounded-lg bg-blue-2 px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                        >
                          Сохранить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
