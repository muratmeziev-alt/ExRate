import Card from "./Card";
import CardHeader from "./CardHeader";
import LinkButton from "./LinkButton";
import DealRow, { DealRowData } from "./DealRow";
import FilterSelect from "./FilterSelect";
import { IconDeals, IconSearch, IconFilter } from "./icons";

interface RecentDealsCardProps {
  deals: DealRowData[];
}

export default function RecentDealsCard({ deals }: RecentDealsCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-[60px]">
        <div className="flex min-h-[30px] items-center justify-between">
          <div className="flex items-center gap-4">
            <CardHeader
              icon={<IconDeals className="h-4 w-4" />}
              title="Последние сделки"
              className="mb-0"
            />
            <label className="flex w-[209px] items-center gap-1.5 rounded-md border border-black-1/20 bg-white px-2 py-1.5">
              <IconSearch className="h-3 w-3 shrink-0 text-black-1/50" />
              <input
                type="search"
                placeholder="Поиск..."
                className="flex-1 bg-transparent text-sm text-black-1 placeholder:text-black-1/50 focus:outline-none"
                aria-label="Поиск сделок"
              />
            </label>
          </div>
          <div className="flex items-center gap-[15px]">
            <FilterSelect label="Статус" value="Все" />
            <FilterSelect label="По дате" value="Сегодня" />
            <button
              type="button"
              className="flex items-center gap-1.5 text-[14px] font-medium text-blue-2 transition-colors hover:text-blue-1"
            >
              <IconFilter className="h-[11px] w-[18px] shrink-0 text-blue-2" />
              Фильтр
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-16 px-5 text-sm text-black-1/50">
            <span>Сделка</span>
            <span>Получили</span>
            <span>Отдали</span>
            <span>Прибыль</span>
            <span className="w-6" />
          </div>

          <div className="flex flex-col gap-2.5">
            {deals.map((deal, idx) => (
              <DealRow key={`${deal.id}-${idx}`} deal={deal} />
            ))}
          </div>

          <div className="flex justify-center">
            <LinkButton>Показать еще</LinkButton>
          </div>
        </div>
      </div>
    </Card>
  );
}
