"use client";

import { IconChevronDown } from "./icons";

interface FilterSelectProps {
  label: string;
  value: string;
  className?: string;
}

export default function FilterSelect({ label, value, className = "" }: FilterSelectProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-[10px] rounded-[5px] border border-black-1/20 px-[7px] py-[5px] text-[14px] transition-colors hover:border-gray-300 ${className}`}
    >
      <span className="font-normal text-black-1">{label}</span>
      <span className="w-px shrink-0 self-stretch bg-black-1/20" aria-hidden />
      <span className="flex items-center gap-[3px]">
        <span className="font-medium text-blue-2">{value}</span>
        <IconChevronDown className="h-3 w-3 shrink-0 text-blue-2" />
      </span>
    </button>
  );
}
