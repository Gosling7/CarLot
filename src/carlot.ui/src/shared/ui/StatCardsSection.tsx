import type { ReactNode } from "react"

type Props = {
  children: ReactNode;
}

// TODO: could use a better name
export const StatCardsSection = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  )
}
