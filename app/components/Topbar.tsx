"use client";

const mockRates = {
  pair: "USD–RUB",
  buy: 92.45,
  sell: 93.20,
};

const mockUser = {
  name: "Алексей",
  role: "Оператор",
};

export default function Topbar() {
  return (
    <header className="flex h-fit shrink-0 items-center border-b border-gray-200 bg-[#FBFBFB] py-[20px]">
      <div className="flex w-fit h-fit items-center pl-[15px] pr-5">
        <img src="/Logo_Ex.svg" alt="ExRate" className="h-10 w-auto" />
      </div>

      <div className="flex flex-1 items-center justify-between pl-[15px] pr-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-[15px] rounded-[10px] border border-[#E9EDF9] bg-[#F0F2F7] px-[10px] py-[8px]">
            <button className="flex items-center gap-1.5 text-[14px] font-semibold text-black-1 hover:text-gray-700 transition-colors">
              <span className="text-black-1">{mockRates.pair}</span>
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <div className="flex items-center gap-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] text-gray-500">Покупка</span>
                <span className="text-[14px] font-medium text-green-1/70">{mockRates.buy.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[14px] text-gray-500">Продажа</span>
                <span className="text-[14px] font-medium text-red-1/70">{mockRates.sell.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button className="text-[14px] text-blue-2 hover:text-[#1735A2] transition-colors">
            Изменить курс
          </button>
        </div>

      <div className="flex items-center gap-[20px]">
        <button className="flex items-center gap-3 rounded-full border border-blue-1 py-[3px] pl-[12px] pr-[3px] text-[14px] font-medium text-blue-1 hover:bg-blue-50 transition-colors">
          Новая сделка
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-1">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
        </button>

        <div className="flex items-stretch gap-3">
          <div className="flex aspect-square shrink-0 items-center justify-center overflow-hidden self-stretch min-w-0 w-[40px] rounded-full bg-gray-100 text-sm font-medium text-gray-600">
            {mockUser.name.charAt(0)}
          </div>
          <div className="flex flex-col justify-center items-start gap-0">
            <button
              type="button"
              className="flex h-fit w-fit cursor-pointer items-center gap-0.5 rounded-lg p-0 text-left text-gray-400 transition-colors"
              onClick={() => {
                /* dropdown open - TODO */
              }}
            >
              <span className="text-[14px] font-medium text-black-1">{mockUser.name}</span>
              <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                <img src="/ArrowTopDown.svg" alt="" className="h-[9px] w-[9px]" />
              </span>
            </button>
            <span className="pl-0 text-[12px] text-gray-500 leading-tight">{mockUser.role}</span>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}
