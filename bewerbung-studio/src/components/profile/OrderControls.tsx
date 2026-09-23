import { ArrowDown, ArrowUp, ChevronsDown, ChevronsUp } from "lucide-react";

export function OrderControls({
  index,
  length,
  onMove,
  label = "Eintrag",
}: {
  index: number;
  length: number;
  onMove: (target: number) => void;
  label?: string;
}) {
  return (
    <div
      className="sort-actions"
      role="group"
      aria-label={`${label} sortieren`}>
      <button
        type="button"
        className="icon-button"
        disabled={index <= 0}
        title="An den Anfang"
        aria-label={`${label}: An den Anfang`}
        onClick={() => onMove(0)}>
        <ChevronsUp size={15} />
      </button>
      <button
        type="button"
        className="icon-button"
        disabled={index <= 0}
        title="Nach oben"
        aria-label={`${label}: Nach oben`}
        onClick={() => onMove(index - 1)}>
        <ArrowUp size={15} />
      </button>
      <button
        type="button"
        className="icon-button"
        disabled={index >= length - 1}
        title="Nach unten"
        aria-label={`${label}: Nach unten`}
        onClick={() => onMove(index + 1)}>
        <ArrowDown size={15} />
      </button>
      <button
        type="button"
        className="icon-button"
        disabled={index >= length - 1}
        title="Ans Ende"
        aria-label={`${label}: Ans Ende`}
        onClick={() => onMove(length - 1)}>
        <ChevronsDown size={15} />
      </button>
    </div>
  );
}
