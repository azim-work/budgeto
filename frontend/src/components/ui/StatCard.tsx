interface StatCardProps {
  label: string;
  value: string;
}

export const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <div className="flex-1 px-10 py-4">
      <p className="text-muted-foreground text-sm">{label}</p>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
};
