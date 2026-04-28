type SectionButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const SectionButton = ({ label, isActive, onClick }: SectionButtonProps) => (
  <button
    type="button"
    className={`btn rounded-xl ${isActive ? "btn-neutral" : ""}`}
    onClick={onClick}
  >
    {label}
  </button>
);