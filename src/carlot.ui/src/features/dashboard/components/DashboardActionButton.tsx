import { type ReactNode, useRef } from "react";

type Props = {
  label: string;
  children: ReactNode;
}

export const DashboardActionButton = ({ label, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button className="btn rounded-xl" onClick={openModal}>
        {label}
      </button>

      <dialog ref={dialogRef} className="modal">
        {children}
      </dialog>
    </>
  )
}
