import LinkButton from "./LinkButton";
import { IconChevronRight } from "./icons";
import { formatAmount, formatDateTime } from "../utils/format";

export interface DealRowData {
  id: number;
  received: number;
  receivedCurrency: string;
  sent: number;
  sentCurrency: string;
  profit: number;
  profitCurrency: string;
  status: "pending" | "completed" | "cancelled" | "failed";
  completedDate?: string;
  date?: string;
  client?: string;
  clientDetail?: string;
  rateLabel?: string;
  rateValue?: string;
  direction?: string;
}

interface DealRowProps {
  deal: DealRowData;
}

function getCardStyles(status: DealRowData["status"]) {
  switch (status) {
    case "completed":
      return "bg-[#F3F4F8] border-[#E9EDF9]";
    case "cancelled":
    case "failed":
      return "bg-[#F8F3F3] border-[#F9E9F3]";
    default:
      return "bg-white border-[#E9EDF9]";
  }
}

export default function DealRow({ deal }: DealRowProps) {
  return (
    <div className={`flex flex-col gap-[48px] rounded-xl border p-5 ${getCardStyles(deal.status)}`}>
      {/* Row 1: Deal number + status, received + sent + profit */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-16">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-black-1">#{deal.id}</div>
          {deal.status === "pending" ? (
            <div className="flex gap-2 text-sm">
              <LinkButton>Подтвердить</LinkButton>
              <button className="text-sm text-blue-2/60 hover:text-blue-2 transition-colors">
                Отменить
              </button>
            </div>
          ) : deal.status === "completed" ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-1" />
              <span>Выполнено</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="h-2 w-2 shrink-0 rounded-full bg-red-1" />
              <span>Отменено</span>
            </div>
          )}
        </div>
        <div>
          <div className="text-base font-semibold text-black-1">{deal.received}</div>
          <div className="text-base text-gray-400">{deal.receivedCurrency}</div>
        </div>
        <div>
          <div className="text-base font-semibold text-black-1">{deal.sent}</div>
          <div className="text-base text-gray-400">{deal.sentCurrency}</div>
        </div>
        <div>
          <div className="text-base font-semibold text-green-1">+{formatAmount(deal.profit)}</div>
          <div className="text-base text-gray-400">{deal.profitCurrency}</div>
        </div>
        <button className="p-1 text-gray-300 hover:text-gray-500 transition-colors" type="button">
          <IconChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Row 2: Details with "дата" headline */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-start gap-16">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-black-1/50">дата</span>
          <span className="text-base text-black-1/80">{formatDateTime(deal.date ?? deal.completedDate)}</span>
        </div>

        <div className="flex flex-col gap-1">
          {(deal.client ?? deal.clientDetail) && (
            <>
              <span className="text-sm text-black-1/50">{deal.client ?? "Клиент"}</span>
              <span className="text-base text-black-1/80">{deal.clientDetail ?? ""}</span>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-1 text-left">
          {(deal.rateLabel ?? deal.rateValue) && (() => {
            const rateVal = deal.rateValue ?? "";
            const numMatch = rateVal.match(/^([\d.]+)\s+(.+)$/);
            const rateNum = numMatch ? numMatch[1] : rateVal;
            const rateCurrency = numMatch ? numMatch[2] : "";
            return (
              <>
                <span className="text-sm text-black-1/50">{deal.rateLabel ?? "Курс"}</span>
                <span className="text-base tabular-nums whitespace-nowrap">
                  <span className="text-black-1">{rateNum}</span>
                  {rateCurrency && <span className="text-black-1/50"> {rateCurrency}</span>}
                </span>
              </>
            );
          })()}
        </div>

        <div className="flex flex-col gap-1">
          {deal.direction && (
            <>
              <span className="text-sm text-black-1/50">Направление</span>
              <span className="text-base text-black-1/80">{deal.direction}</span>
            </>
          )}
        </div>

        <div className="w-6" />
      </div>
    </div>
  );
}
