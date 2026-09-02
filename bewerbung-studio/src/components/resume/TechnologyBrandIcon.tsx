import { getTechnologyBrandIconMarkup } from "../../shared/technologyBrand";

export function TechnologyBrandIcon({
  technology,
  className = "",
}: {
  technology: string;
  className?: string;
}) {
  return (
    <span
      className={`technology-brand-icon ${className}`.trim()}
      data-technology={technology}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: getTechnologyBrandIconMarkup(technology),
      }}
    />
  );
}
