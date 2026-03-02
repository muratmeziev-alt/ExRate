import AppLayout from "./components/AppLayout";
import CurrencyChip from "./components/CurrencyChip";

const primaryCurrencies = [
  { currency: "RUB", amount: 13232023 },
  { currency: "USD", amount: 12239 },
  { currency: "EUR", amount: 113539 },
];

const secondaryCurrencies = [
  { currency: "USDT", amount: 23023 },
  { currency: "BTC", amount: 0.00473453, decimals: 8 },
  { currency: "GBP", amount: 13034 },
];

const mockCardsData = [
  { cardNumber: "2008 1234 1234 0123", bank: "Тинькофф", expiry: "25.10.2025", balance: 4000, currency: "RUB", isLowBalance: true },
  { cardNumber: "2008 1234 1234 0124", bank: "Сбербанк", expiry: "25.10.2025", balance: 1902038, currency: "RUB", isLowBalance: false },
  { cardNumber: "2008 1234 1234 0125", bank: "Альфа Банк", expiry: "25.10.2025", balance: 8232, currency: "RUB", isLowBalance: false },
  { cardNumber: "2008 1234 1234 0126", bank: "Тинькофф", expiry: "25.10.2025", balance: 8000, currency: "RUB", isLowBalance: false },
];

const mockDealsData = [
  { id: 1243, received: 1, receivedCurrency: "BTC", sent: 183153.7312132, sentCurrency: "USDT (TRC20)", profit: 1000000, profitCurrency: "USDT (TRC20)", status: "pending" },
  { id: 1243, received: 1, receivedCurrency: "BTC", sent: 183153.7312132, sentCurrency: "USDT (TRC20)", profit: 1000000, profitCurrency: "USDT (TRC20)", status: "pending" },
  { id: 1243, received: 1, receivedCurrency: "BTC", sent: 183153.7312132, sentCurrency: "USDT (TRC20)", profit: 1000000, profitCurrency: "USDT (TRC20)", status: "completed", completedDate: "25.10 14:02" },
];

const formatAmount = (amount: number) => amount.toLocaleString("ru-RU");

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-5">
        {/* Top row: 2 cards */}
        <div className="grid grid-cols-2 gap-5">
          {/* Касса Card */}
          <div className="h-full flex flex-col rounded-xl border border-gray-200 bg-white p-5">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F2F7]">
                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <span className="text-base font-medium text-black-1">Касса</span>
              </div>
              <button className="text-sm text-blue-2 hover:text-[#1735A2] transition-colors">
                Перейти
              </button>
            </div>

            {/* Body wrapper - pushed to bottom */}
            <div className="mt-auto">
              {/* Subtitle */}
              <div className="mb-3 text-sm text-gray-400">Остаток валют</div>

              {/* Currency chips - Primary row */}
              <div className="mb-2 flex flex-wrap gap-2">
                {primaryCurrencies.map((item) => (
                  <CurrencyChip
                    key={item.currency}
                    value={formatAmount(item.amount)}
                    code={item.currency}
                    variant="primary"
                  />
                ))}
              </div>

              {/* Currency chips - Secondary row */}
              <div className="mb-3 flex flex-wrap gap-2">
                {secondaryCurrencies.map((item) => (
                  <CurrencyChip
                    key={item.currency}
                    value={item.currency === "BTC" ? item.amount.toFixed(8) : formatAmount(item.amount)}
                    code={item.currency}
                    variant="secondary"
                  />
                ))}
              </div>

              {/* Settings link */}
              <button className="flex items-center gap-1.5 text-sm text-blue-2 hover:text-[#1735A2] transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Настроить
              </button>

              {/* Bottom stats */}
              <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
                <div>
                  <div className="mb-2 text-sm text-gray-400">Свободно RUB</div>
                  <div className="text-[20px] font-medium text-black-1">13 927 056 RUB</div>
                </div>
                <div className="text-left">
                  <div className="mb-2 text-sm text-gray-400">Прибыль (сегодня)</div>
                  <div className="text-xl font-medium text-green-1">600 778 RUB</div>
                </div>
              </div>
            </div>
          </div>

          {/* Карты Card */}
          <div className="h-full rounded-xl border border-gray-200 bg-white p-5">
            {/* Header */}
            <div className="mb-[40px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F2F7]">
                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <span className="text-base font-medium text-black-1">Карты</span>
                <span className="text-sm text-red-1 opacity-50">1 низкий баланс</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-gray-200 bg-[#F5F7F9]">
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
                <button className="text-sm text-blue-2 hover:text-[#1735A2] transition-colors">
                  Все (28)
                </button>
              </div>
            </div>

            {/* Card rows */}
            <div className="divide-y divide-gray-100">
              {mockCardsData.map((card, idx) => (
                <div key={idx} className="grid grid-cols-[1.4fr_0.8fr_1fr_24px] items-center gap-4 py-3 first:pt-0 last:pb-0">
                  {/* Column 1: Card number + bank */}
                  <div className="min-w-0">
                    <div className="text-sm text-black-1">
                      <span>{card.cardNumber.slice(0, -4)}</span>
                      <span className="font-semibold">{card.cardNumber.slice(-4)}</span>
                    </div>
                    <div className="text-sm text-gray-400 truncate">{card.bank}</div>
                  </div>

                  {/* Column 2: Expiry */}
                  <div>
                    <div className="text-sm text-gray-400">До</div>
                    <div className="text-sm text-black-1">{card.expiry}</div>
                  </div>

                  {/* Column 3: Balance */}
                  <div className="text-left">
                    <div className="text-sm text-gray-400">Баланс</div>
                    <div className={`text-sm font-medium truncate ${card.isLowBalance ? "text-red-1" : "text-black-1"}`}>
                      {formatAmount(card.balance)} {card.currency}
                    </div>
                  </div>

                  {/* Column 4: Chevron */}
                  <button className="p-1 text-gray-300 hover:text-gray-500 transition-colors justify-self-end">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Сделки card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F2F7]">
                <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <span className="text-base font-medium text-black-1">Сделки</span>
            </div>
            <button className="text-sm text-blue-2 hover:text-[#1735A2] transition-colors">
              Показать все
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-[20px] flex gap-6">
            <button className="relative pb-[5px] text-sm font-medium text-blue-2">
              Последние
              <span className="absolute bottom-0 left-0 right-0 h-px bg-blue-2 rounded-full" />
            </button>
            <button className="pb-[5px] text-sm text-left text-gray-400 hover:text-gray-600 transition-colors">
              В процессе
            </button>
          </div>

          {/* Table header */}
          <div className="mt-[40px] grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-4 text-sm text-gray-400">
            <span>Сделка</span>
            <span>Получили</span>
            <span>Отдали</span>
            <span>Прибыль</span>
            <span className="w-6"></span>
          </div>

          {/* Deal rows */}
          <div className="mt-3 space-y-3">
            {mockDealsData.map((deal, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-4 rounded-xl border border-[#E9EDF9] bg-white p-4"
              >
                {/* Deal column */}
                <div>
                  <div className="text-sm font-semibold text-black-1">#{deal.id}</div>
                  {deal.status === "pending" ? (
                    <div className="mt-1 flex gap-2 text-sm">
                      <button className="text-blue-2 hover:text-[#1735A2] transition-colors">Подтвердить</button>
                      <button className="text-blue-2/60 hover:text-blue-2 transition-colors">Отменить</button>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
                      <span className="h-2 w-2 rounded-full bg-green-1" />
                      <span>Выполнено</span>
                      <span>{deal.completedDate}</span>
                    </div>
                  )}
                </div>

                {/* Получили column */}
                <div>
                  <div className="text-sm text-black-1">{deal.received}</div>
                  <div className="text-sm text-gray-400">{deal.receivedCurrency}</div>
                </div>

                {/* Отдали column */}
                <div>
                  <div className="text-sm text-black-1">{deal.sent}</div>
                  <div className="text-sm text-gray-400">{deal.sentCurrency}</div>
                </div>

                {/* Прибыль column */}
                <div>
                  <div className="text-sm font-semibold text-black-1">+{formatAmount(deal.profit)}</div>
                  <div className="text-sm text-gray-400">{deal.profitCurrency}</div>
                </div>

                {/* Chevron */}
                <button className="p-1 text-gray-300 hover:text-gray-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Show more link */}
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-2 hover:text-[#1735A2] transition-colors">
              Показать еще
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
