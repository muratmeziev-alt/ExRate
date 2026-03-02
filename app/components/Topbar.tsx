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
    <header className="flex h-fit shrink-0 items-center border-b border-gray-200 bg-[#FBFBFB] py-[25px]">
      <div className="flex w-fit h-fit items-center px-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
            EX
          </div>
          <span className="text-lg font-semibold text-black-1">ExRate</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between pl-[15px] pr-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-[15px] rounded-[10px] border border-[#E9EDF9] bg-[#F0F2F7] px-[10px] py-[8px]">
            <button className="flex items-center gap-1.5 text-[15px] max-[1200px]:text-[14px] font-semibold text-black-1 hover:text-gray-700 transition-colors">
              <span className="text-black-1">{mockRates.pair}</span>
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <div className="flex items-center gap-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] max-[1200px]:text-[14px] text-gray-500">Покупка</span>
                <span className="text-[15px] max-[1200px]:text-[14px] font-medium text-green-1/70">{mockRates.buy.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[15px] max-[1200px]:text-[14px] text-gray-500">Продажа</span>
                <span className="text-[15px] max-[1200px]:text-[14px] font-medium text-red-1/70">{mockRates.sell.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button className="text-[14px] text-blue-2 hover:text-[#1735A2] transition-colors">
            Изменить курс
          </button>
        </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-3 rounded-full border border-blue-1 bg-white py-[3px] pl-[12px] pr-[3px] text-[15px] max-[1200px]:text-[14px] font-medium text-blue-1 hover:bg-blue-50 transition-colors">
          Новая сделка
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-1">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600">
            {mockUser.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-black-1">{mockUser.name}</span>
            <span className="text-[14px] text-gray-500">{mockUser.role}</span>
          </div>
          <button className="ml-1 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>
      </div>
    </header>
  );
}
