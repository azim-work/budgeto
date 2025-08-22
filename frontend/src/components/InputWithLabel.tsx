import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputWithLabelProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  suffix?: string;
}

export function InputWithLabel({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  suffix,
}: InputWithLabelProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative ">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={typeof value === "number" ? value.toString() : value} // so 0 can be overriden
          onChange={onChange}
          className={`pr-20 ${className ?? ""} ${
            type === "number"
              ? "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              : ""
          }`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-3 flex items-center text-muted-foreground pointer-events-none text-sm">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}
