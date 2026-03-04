interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
}

export default function CardHeader({
  icon,
  title,
  action,
  badge,
  headerActions,
  className = "mb-4",
}: CardHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className={`flex items-center ${badge ? "gap-3" : "gap-2"}`}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F2F7]">
          {icon}
        </div>
        <span className="text-base font-medium text-black-1">{title}</span>
        {badge}
      </div>
      {headerActions ?? action}
    </div>
  );
}
