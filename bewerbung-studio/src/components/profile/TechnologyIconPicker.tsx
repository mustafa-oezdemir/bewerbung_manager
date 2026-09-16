import { deviconOptions } from "../../shared/deviconCatalog";
import { TechnologyBrandIcon } from "../resume/TechnologyBrandIcon";

export function TechnologyIconPicker({
  technologyTitle,
  value,
  onChange,
}: {
  technologyTitle: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="technology-icon-picker">
      <span className="technology-icon-picker__preview">
        <TechnologyBrandIcon
          technology={technologyTitle || "Technologie"}
          iconId={value}
        />
      </span>
      <label className="field">
        <span>Technologie-Icon</span>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">Automatisch nach Bezeichnung</option>
          {deviconOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label} ({option.id})
            </option>
          ))}
        </select>
        <small>{deviconOptions.length} Devicon-Symbole verfügbar</small>
      </label>
    </div>
  );
}
