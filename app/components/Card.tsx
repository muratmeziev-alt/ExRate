interface CardProps {
  children: React.ReactNode;
  fullHeight?: boolean;
}

export default function Card({ children, fullHeight }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-5 ${
        fullHeight ? "flex h-full flex-col" : ""
      }`}
    >
      {children}
    </div>
  );
}
