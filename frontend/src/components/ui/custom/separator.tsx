import clsx from "clsx";

interface SeparatorProps {
  inset?: boolean;
  className?: string;
}

export function Separator({ inset = false, className }: SeparatorProps) {
  const customClassName = clsx("border-t", inset && "ml-2", className);

  return <div className={customClassName}></div>;
}
