import CurrencyChip from "./CurrencyChip";
import Card from "./Card";
import CardHeader from "./CardHeader";
import LinkButton from "./LinkButton";
import StatBlock from "./StatBlock";
import { IconCash, IconSettings } from "./icons";
import { formatAmount } from "../utils/format";

interface CurrencyItem {
  currency: string;
  amount: number;
  decimals?: number;
}

interface CashCardProps {
  primaryCurrencies: CurrencyItem[];
  secondaryCurrencies: CurrencyItem[];
  freeRub: string;
  profitToday: string;
}

export default function CashCard({
  primaryCurrencies,
  secondaryCurrencies,
  freeRub,
  profitToday,
}: CashCardProps) {
  return (
    <Card fullHeight>
      <CardHeader
        icon={<IconCash />}
        title="Касса"
        action={<LinkButton>Перейти</LinkButton>}
      />

      <div className="mt-auto">
        <div className="mb-3 text-sm text-gray-400">Остаток валют</div>

        <div className="mb-2 flex flex-wrap gap-2">
          {primaryCurrencies.map((item) => (
            <CurrencyChip
              key={item.currency}
              value={formatAmount(item.amount)}
              code={item.currency}
              variant="primary"
            />
          ))}
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {secondaryCurrencies.map((item) => (
            <CurrencyChip
              key={item.currency}
              value={item.currency === "BTC" ? item.amount.toFixed(8) : formatAmount(item.amount)}
              code={item.currency}
              variant="secondary"
            />
          ))}
        </div>

        <LinkButton className="flex items-center gap-1.5">
          <IconSettings />
          Настроить
        </LinkButton>

        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
          <StatBlock label="Свободно RUB" value={freeRub} />
          <StatBlock
            label="Прибыль (сегодня)"
            value={profitToday}
            valueClassName="text-green-1"
            className="text-left"
          />
        </div>
      </div>
    </Card>
  );
}
