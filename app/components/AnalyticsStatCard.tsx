import { IconTrendUp } from "./icons";

interface AnalyticsStatCardProps {
  title: string;
  label: string;
  value: string | number;
  change?: string;
}

export default function AnalyticsStatCard({
  title,
  label,
  value,
  change = "+20%",
}: AnalyticsStatCardProps) {
  return (
    <div className="flex flex-1 min-w-0 flex-col gap-8 rounded-[10px] border border-[#E9EDF9] bg-[#F0F2F7]/70 p-5">
      <p className="text-lg font-medium text-black-1">{title}</p>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-black-1/50">{label}</p>
        <div className="flex items-end gap-2.5 overflow-hidden">
          <p className="text-[25px] font-medium text-black-1">{value}</p>
          <span className="mb-0.5 flex items-center gap-0.5 rounded-[20px] border border-green-1/70 bg-green-1/5 px-2.5 py-0.5 text-sm font-medium text-green-1">
            <IconTrendUp className="h-2.5 w-2.5 shrink-0" />
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}
