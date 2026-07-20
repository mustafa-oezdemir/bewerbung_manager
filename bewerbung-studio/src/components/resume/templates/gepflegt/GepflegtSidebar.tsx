/**
 * Gepflegt template sidebar component
 * Left column with photo, profile, strengths, languages, skills
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import { KnowledgeSectionRenderer } from "../../../document/KnowledgeSectionRenderer";
import { GepflegtSidebarPhoto } from "./GepflegtSidebarPhoto";
import { GepflegtStrengthsSection } from "./GepflegtStrengthsSection";
import type { GepflegtSidebarProps } from "./gepflegt.types";

export interface GepflegtSidebarExtendedProps extends GepflegtSidebarProps {
  photoSource?: string | null;
  name?: string;
}

export function GepflegtSidebar({
  profile,
  accentColor,
  sidebarBackground,
  sidebarText,
  atsMode,
  photoSource = null,
  name = "",
}: GepflegtSidebarExtendedProps) {
  if (atsMode) {
    return null;
  }

  return (
    <aside
      className="gepflegt-sidebar"
      style={
        {
          "--gepflegt-sidebar-background": sidebarBackground,
          "--gepflegt-sidebar-text": sidebarText,
          "--gepflegt-accent-color": accentColor,
        } as React.CSSProperties
      }>
      {/* Profile Photo (top of sidebar) */}
      <GepflegtSidebarPhoto
        photoSource={photoSource}
        name={name}
        atsMode={atsMode}
      />

      {/* Profile Summary (Zusammenfassung) */}
      {profile?.summary && (
        <section className="gepflegt-sidebar__section">
          <h3 className="gepflegt-sidebar__section-title">Zusammenfassung</h3>
          <p
            className="gepflegt-sidebar__summary"
            dangerouslySetInnerHTML={{ __html: profile.summary }}
          />
        </section>
      )}

      {/* Strengths (Stärken) */}
      <GepflegtStrengthsSection profile={profile} atsMode={atsMode} />

      {/* Languages (Sprachen) */}
      {profile?.languages && profile.languages.length > 0 && (
        <section className="gepflegt-sidebar__section">
          <h3 className="gepflegt-sidebar__section-title">Sprachen</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5mm" }}>
            {profile.languages.map((language, idx) => (
              <div key={idx} className="gepflegt-language">
                <span className="gepflegt-language__name">{language}</span>
                <span className="gepflegt-language__level">●●●●○</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills/Knowledge Section (Fähigkeiten) */}
      {profile?.knowledgeSection && (
        <section
          className="gepflegt-sidebar__section"
          style={{ color: sidebarText }}>
          <KnowledgeSectionRenderer
            section={profile.knowledgeSection}
            legacySkills={profile.skills}
            atsMode={false}
          />
        </section>
      )}

      {/* Certifications (Zertifikate) */}
      {profile?.certifications && profile.certifications.length > 0 && (
        <section className="gepflegt-sidebar__section">
          <h3 className="gepflegt-sidebar__section-title">Zertifikate</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "4mm",
              fontSize: "var(--gepflegt-body-font-size, 9.2pt)",
              lineHeight: "var(--gepflegt-line-height, 1.4)",
            }}>
            {profile.certifications.map((cert, idx) => (
              <li key={idx} style={{ marginBottom: "1mm" }}>
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
