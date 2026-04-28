import type { ReactNode } from "react"

type DashboardModalFormProps = {
  children: ReactNode
}

export const DashboardModal = ({ children }: DashboardModalFormProps) => {
  return (
    <div className="modal-box max-w-6xl bg-base-200 animate-fadeIn relative overflow-y-auto max-h-[95vh]">
      {children}
    </div>
  )
}
