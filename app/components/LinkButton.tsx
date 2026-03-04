interface LinkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function LinkButton({
  children,
  onClick,
  type = "button",
  className = "",
}: LinkButtonProps) {
  return (
    <button
      type={type}
      className={`text-sm text-blue-2 hover:text-[#1735A2] transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
