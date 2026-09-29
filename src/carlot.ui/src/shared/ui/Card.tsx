interface CardProps {
  label: string;
  children: React.ReactNode;
}

export default function Card({ label, children }: CardProps) {
  return (
    <div className="card border border-base-300 bg-base-100 rounded-xl p-4 flex-auto">
      <h2>{label}</h2>

      <div className="overflow-y-scroll min-h-100 max-h-100">
        {children}
      </div>
    </div>
  )
}