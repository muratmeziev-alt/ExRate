interface CurrencyChipProps {
  value: string | number;
  code: string;
  variant?: "primary" | "secondary";
}

export default function CurrencyChip({ value, code, variant = "primary" }: CurrencyChipProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-[10px] border border-[#E9EDF9] px-[10px] py-[6px] ${
        isPrimary ? "bg-[#F0F2F7]" : "bg-[#F5F7F9]"
      }`}
    >
      <span
        className={`text-sm font-medium ${
          isPrimary ? "text-black-1" : "text-black-1/50"
        }`}
      >
        {value}
      </span>
      <span
        className={`text-sm ${
          isPrimary ? "text-gray-400" : "text-gray-400/50"
        }`}
      >
        {code}
      </span>
    </div>
  );
}
