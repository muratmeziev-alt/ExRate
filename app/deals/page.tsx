import AppLayout from "../components/AppLayout";
import RecentDealsCard from "../components/RecentDealsCard";
import AnalyticsStatCard from "../components/AnalyticsStatCard";
import FilterSelect from "../components/FilterSelect";
import type { DealRowData } from "../components/DealRow";

const mockDealsData: DealRowData[] = [
  {
    id: 1243,
    received: 1,
    receivedCurrency: "BTC",
    sent: 183153.7312132,
    sentCurrency: "USDT (TRC20)",
    profit: 1000000,
    profitCurrency: "USDT (TRC20)",
    status: "pending",
    date: "28.10.2023 16:14:00",
    client: "Клиент",
    clientDetail: "TG: Jimmy_Suit",
    rateLabel: "Курс 1 BTC",
    rateValue: "91576.870177 USDT (TRC20)",
    direction: "BTC – USDT (TRC20)",
  },
  {
    id: 1244,
    received: 0.5,
    receivedCurrency: "BTC",
    sent: 45788.43,
    sentCurrency: "USDT (TRC20)",
    profit: 500000,
    profitCurrency: "USDT (TRC20)",
    status: "pending",
    date: "28.10.2023 15:30:00",
    client: "Клиент",
    clientDetail: "TG: crypto_user",
    rateLabel: "Курс 1 BTC",
    rateValue: "91576.87 USDT (TRC20)",
    direction: "BTC – USDT (TRC20)",
  },
  {
    id: 1245,
    received: 1,
    receivedCurrency: "BTC",
    sent: 183153.7312132,
    sentCurrency: "USDT (TRC20)",
    profit: 1000000,
    profitCurrency: "USDT (TRC20)",
    status: "completed",
    completedDate: "25.10 14:02",
    client: "Клиент",
    clientDetail: "TG: Jimmy_Suit",
    rateLabel: "Курс 1 BTC",
    rateValue: "91576.870177 USDT (TRC20)",
    direction: "BTC – USDT (TRC20)",
  },
  {
    id: 1246,
    received: 2,
    receivedCurrency: "ETH",
    sent: 6123.45,
    sentCurrency: "USDT (TRC20)",
    profit: 85000,
    profitCurrency: "USDT (TRC20)",
    status: "completed",
    completedDate: "04.03 09:42",
    client: "Клиент",
    clientDetail: "TG: eth_trader",
    rateLabel: "Курс 1 ETH",
    rateValue: "3061.73 USDT (TRC20)",
    direction: "ETH – USDT (TRC20)",
  },
  {
    id: 1248,
    received: 0.25,
    receivedCurrency: "BTC",
    sent: 22894.22,
    sentCurrency: "USDT (TRC20)",
    profit: 0,
    profitCurrency: "USDT (TRC20)",
    status: "cancelled",
    date: "03.03.2024 12:00:00",
    client: "Клиент",
    clientDetail: "TG: cancelled_user",
    rateLabel: "Курс 1 BTC",
    rateValue: "91576.87 USDT (TRC20)",
    direction: "BTC – USDT (TRC20)",
  },
  {
    id: 1247,
    received: 1,
    receivedCurrency: "BTC",
    sent: 183153.73,
    sentCurrency: "USDT (TRC20)",
    profit: 1000000,
    profitCurrency: "USDT (TRC20)",
    status: "completed",
    completedDate: "04.03 10:15",
    client: "Клиент",
    clientDetail: "TG: Jimmy_Suit",
    rateLabel: "Курс 1 BTC",
    rateValue: "91576.87 USDT (TRC20)",
    direction: "BTC – USDT (TRC20)",
  },
];

export default function DealsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-[70px]">
        <RecentDealsCard deals={mockDealsData} />

        <div className="flex flex-col gap-6">
          <h2 className="text-[25px] font-medium text-black-1">Аналитика</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-8 flex items-center">
              <FilterSelect label="По дате" value="Сегодня" />
            </div>
            <div className="flex gap-4">
              <AnalyticsStatCard
                title="Сделки"
                label="Количество (за период)"
                value={48}
              />
              <AnalyticsStatCard
                title="Успешные"
                label="Количество (за период)"
                value={12}
              />
              <AnalyticsStatCard
                title="Отмененные"
                label="Количество (за период)"
                value={12}
              />
              <AnalyticsStatCard
                title="В процессе"
                label="Количество (за период)"
                value={12}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
