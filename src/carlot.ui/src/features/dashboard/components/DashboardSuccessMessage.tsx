type DashboardSuccessMessageProps = {
  header: string;
  message: string;
}

export const DashboardSuccessMessage = ({ header, message }: DashboardSuccessMessageProps) => {
  return (
    <div className="bg-success/10 border border-success rounded-xl p-5">
      <h4 className="font-semibold text-success mb-1">
        {header}
      </h4>
      <p className="text-sm opacity-80">
        {message}
      </p>
    </div>
  )
}