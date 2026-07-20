import type { KreativCareerItem } from "./kreativ.types";
import { KreativCareerSection } from "./KreativCareerSection";

export function KreativLeftColumn({
  experiences,
  education,
  continuation = false,
}: {
  experiences: KreativCareerItem[];
  education: KreativCareerItem[];
  continuation?: boolean;
}) {
  return (
    <main className="kreativ-left-column">
      <KreativCareerSection
        title="Berufserfahrung"
        items={experiences}
        continuation={continuation}
      />
      <KreativCareerSection title="Ausbildung" items={education} />
    </main>
  );
}
