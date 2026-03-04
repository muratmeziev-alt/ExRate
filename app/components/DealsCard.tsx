import Card from "./Card";
import CardHeader from "./CardHeader";
import LinkButton from "./LinkButton";
import { IconDeals, IconChevronRight } from "./icons";
import { formatAmount } from "../utils/format";

interface DealData {
  id: number;
  received: number;
  receivedCurrency: string;
  sent: number;
  sentCurrency: string;
  profit: number;
  profitCurrency: string;
  status: "pending" | "completed";
  completedDate?: string;
}

interface DealsCardProps {
  deals: DealData[];
}

export default function DealsCard({ deals }: DealsCardProps) {
  return (
    <Card>
      <CardHeader
        icon={<IconDeals />}
        title="Сделки"
        action={<LinkButton>Показать все</LinkButton>}
      />

      <div className="mt-[20px] flex gap-6">
        <button className="relative pb-[5px] text-sm font-medium text-blue-2">
          Последние
          <span className="absolute bottom-0 left-0 right-0 h-px bg-blue-2 rounded-full" />
        </button>
        <button className="pb-[5px] text-sm text-left text-gray-400 hover:text-gray-600 transition-colors">
          В процессе
        </button>
      </div>

      <div className="mt-[40px] grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-4 text-sm text-gray-400">
        <span>Сделка</span>
        <span>Получили</span>
        <span>Отдали</span>
        <span>Прибыль</span>
        <span className="w-6"></span>
      </div>

      <div className="mt-3 space-y-3">
        {deals.map((deal, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-4 rounded-xl border border-[#E9EDF9] bg-white p-4"
          >
            <div>
              <div className="text-sm font-semibold text-black-1">#{deal.id}</div>
              {deal.status === "pending" ? (
                <div className="mt-1 flex gap-2 text-sm">
                  <LinkButton>Подтвердить</LinkButton>
                  <button className="text-sm text-blue-2/60 hover:text-blue-2 transition-colors">
                    Отменить
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
                  <span className="h-2 w-2 rounded-full bg-green-1" />
                  <span>Выполнено</span>
                  <span>{deal.completedDate}</span>
                </div>
              )}
            </div>

            <div>
              <div className="text-sm text-black-1">{deal.received}</div>
              <div className="text-sm text-gray-400">{deal.receivedCurrency}</div>
            </div>

            <div>
              <div className="text-sm text-black-1">{deal.sent}</div>
              <div className="text-sm text-gray-400">{deal.sentCurrency}</div>
            </div>

            <div>
              <div className="text-sm font-semibold text-black-1">
                +{formatAmount(deal.profit)}
              </div>
              <div className="text-sm text-gray-400">{deal.profitCurrency}</div>
            </div>

            <button className="p-1 text-gray-300 hover:text-gray-500 transition-colors">
              <IconChevronRight />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <LinkButton>Показать еще</LinkButton>
      </div>
    </Card>
  );
}
