/**
 * Shared layout for Deals header and card rows.
 * Use the same grid and padding for perfect column alignment.
 */

export const DEALS_GRID_CLASS =
  "grid w-full grid-cols-[minmax(180px,1fr)_minmax(120px,0.7fr)_minmax(220px,1fr)_minmax(180px,0.8fr)_auto] items-start gap-x-6 lg:gap-x-12";

export const DEALS_GRID_PADDING = "px-4";

interface DealsGridProps {
  children: React.ReactNode;
  className?: string;
  asHeader?: boolean;
}

export function DealsGrid({ children, className = "", asHeader }: DealsGridProps) {
  return (
    <div className={`${DEALS_GRID_CLASS} ${className}`} role={asHeader ? "row" : undefined}>
      {children}
    </div>
  );
}
