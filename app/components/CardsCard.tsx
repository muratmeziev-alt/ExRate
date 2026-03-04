import Card from "./Card";
import CardHeader from "./CardHeader";
import LinkButton from "./LinkButton";
import { IconCards, IconChevronRight, IconChevronUp, IconChevronDown } from "./icons";
import { formatAmount } from "../utils/format";

interface CardData {
  cardNumber: string;
  bank: string;
  expiry: string;
  balance: number;
  currency: string;
  isLowBalance: boolean;
}

interface CardsCardProps {
  cards: CardData[];
  totalCount: number;
  lowBalanceCount: number;
}

export default function CardsCard({
  cards,
  totalCount,
  lowBalanceCount,
}: CardsCardProps) {
  return (
    <Card fullHeight>
      <CardHeader
        icon={<IconCards />}
        title="Карты"
        badge={
          lowBalanceCount > 0 ? (
            <span className="text-sm text-red-1 opacity-50">
              {lowBalanceCount} низкий баланс
            </span>
          ) : undefined
        }
        headerActions={
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-gray-200 bg-[#F5F7F9]">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                <IconChevronUp />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                <IconChevronDown />
              </button>
            </div>
            <LinkButton>Все ({totalCount})</LinkButton>
          </div>
        }
        className="mb-[40px]"
      />

      <div className="divide-y divide-gray-100">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[1.4fr_0.8fr_1fr_24px] items-center gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <div className="text-sm text-black-1">
                <span>{card.cardNumber.slice(0, -4)}</span>
                <span className="font-semibold">{card.cardNumber.slice(-4)}</span>
              </div>
              <div className="text-sm text-gray-400 truncate">{card.bank}</div>
            </div>

            <div>
              <div className="text-sm text-gray-400">До</div>
              <div className="text-sm text-black-1">{card.expiry}</div>
            </div>

            <div className="text-left">
              <div className="text-sm text-gray-400">Баланс</div>
              <div
                className={`text-sm font-medium truncate ${
                  card.isLowBalance ? "text-red-1" : "text-black-1"
                }`}
              >
                {formatAmount(card.balance)} {card.currency}
              </div>
            </div>

            <button className="p-1 text-gray-300 hover:text-gray-500 transition-colors justify-self-end">
              <IconChevronRight />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
