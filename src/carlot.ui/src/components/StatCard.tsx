interface StatCardProps {
  label: string;
  data: number;
}

export default function StatCard({ label, data }: StatCardProps) {
  return (
    <div className="stat bg-base-100 border border-base-300 rounded-xl">
      <div className="stat-title">{label}</div>
      <div className="stat-value">{data}</div>
    </div>
  )
}
