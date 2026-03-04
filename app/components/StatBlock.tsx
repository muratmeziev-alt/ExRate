interface StatBlockProps {
  label: string;
  value: string;
  valueClassName?: string;
  className?: string;
}

export default function StatBlock({
  label,
  value,
  valueClassName = "text-black-1",
  className = "",
}: StatBlockProps) {
  return (
    <div className={className}>
      <div className="mb-2 text-sm text-gray-400">{label}</div>
      <div className={`text-[20px] font-medium ${valueClassName}`}>{value}</div>
    </div>
  );
}
