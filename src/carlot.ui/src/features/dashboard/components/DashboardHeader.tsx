type Props = {
  title: string;
  description: string;
}

export const DashboardHeader = ({ title, description }: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-base-content/60">{description}</p>
    </div>
  )
}
