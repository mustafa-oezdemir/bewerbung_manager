import type { KreativCareerItem } from "./kreativ.types";
import { KreativCareerSection } from "./KreativCareerSection";

export function KreativLeftColumn({
  experiences,
  education,
  experienceTitle,
  educationTitle,
  continuation = false,
}: {
  experiences: KreativCareerItem[];
  education: KreativCareerItem[];
  experienceTitle: string;
  educationTitle: string;
  continuation?: boolean;
}) {
  return (
    <main className="kreativ-left-column">
      <KreativCareerSection
        kind="experience"
        title={experienceTitle}
        items={experiences}
        continuation={continuation}
      />
      <KreativCareerSection kind="education" title={educationTitle} items={education} />
    </main>
  );
}
