import AppLayout from "./components/AppLayout";
import CashCard from "./components/CashCard";
import CardsCard from "./components/CardsCard";
import DealsCard from "./components/DealsCard";

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
  { id: 1243, received: 1, receivedCurrency: "BTC", sent: 183153.7312132, sentCurrency: "USDT (TRC20)", profit: 1000000, profitCurrency: "USDT (TRC20)", status: "pending" as const },
  { id: 1243, received: 1, receivedCurrency: "BTC", sent: 183153.7312132, sentCurrency: "USDT (TRC20)", profit: 1000000, profitCurrency: "USDT (TRC20)", status: "pending" as const },
  { id: 1243, received: 1, receivedCurrency: "BTC", sent: 183153.7312132, sentCurrency: "USDT (TRC20)", profit: 1000000, profitCurrency: "USDT (TRC20)", status: "completed" as const, completedDate: "25.10 14:02" },
];

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <CashCard
            primaryCurrencies={primaryCurrencies}
            secondaryCurrencies={secondaryCurrencies}
            freeRub="13 927 056 RUB"
            profitToday="600 778 RUB"
          />
          <CardsCard
            cards={mockCardsData}
            totalCount={28}
            lowBalanceCount={1}
          />
        </div>

        <DealsCard deals={mockDealsData} />
      </div>
    </AppLayout>
  );
}
