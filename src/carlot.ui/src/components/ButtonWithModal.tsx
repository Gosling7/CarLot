import { type ReactNode, useRef } from "react";

type Props = {
  buttonLabel: string;
  children: ReactNode;
};

export const ButtonWithModal = ({ buttonLabel, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button className="btn" onClick={openModal}>
        {buttonLabel}
      </button>

      <dialog ref={dialogRef} className="modal">
        {children}
      </dialog>
    </>
  )
}
