interface StatCardProps {
  label: string;
  value: string;
  className?: string;
}

export const StatCard = ({ label, value, className }: StatCardProps) => {
  return (
    <div className="flex-1 py-4 text-center bg-white rounded-xl">
      <p className="text-sm sm:text-base text-muted-foreground ">{label}</p>
      <div className={`text-xl sm:text-2xl font-semibold ${className}`}>
        {value}
      </div>
    </div>
  );
};
