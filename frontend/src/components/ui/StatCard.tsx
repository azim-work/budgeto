interface StatCardProps {
  label: string;
  value: string;
}

export const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <div className="flex-1 py-4 text-center bg-white rounded-xl">
      <p className="text-sm sm:text-base text-muted-foreground ">{label}</p>
      <div className="text-xl sm:text-2xl font-semibold">{value}</div>
    </div>
  );
};
