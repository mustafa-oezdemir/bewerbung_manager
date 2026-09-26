/**
 * ModernContactSection component
 * Renders contact details with icons: phone, email, location, LinkedIn, website
 */

import { ContactIcon } from "../ContactIcon";
import type { ModernContactSectionProps } from "./modern.types";

export function ModernContactSection({
  profile,
  accentColor,
  atsMode,
  inline = false,
}: ModernContactSectionProps) {
  const contactItems: Array<{
    key: string;
    icon: string;
    label: string;
    value?: string;
  }> = [];

  if (profile?.phone) {
    contactItems.push({
      key: "phone",
      icon: "phone",
      label: "Telefon",
      value: profile.phone,
    });
  }
  if (profile?.email) {
    contactItems.push({
      key: "email",
      icon: "email",
      label: "E-Mail",
      value: profile.email,
    });
  }
  if (profile?.linkedin) {
    contactItems.push({
      key: "linkedin",
      icon: "linkedin",
      label: "LinkedIn",
      value: profile.linkedin,
    });
  }
  if (profile?.portfolio) {
    contactItems.push({
      key: "website",
      icon: "website",
      label: "Website",
      value: profile.portfolio,
    });
  }
  if (profile?.github) {
    contactItems.push({
      key: "github",
      icon: "github",
      label: "GitHub",
      value: profile.github,
    });
  }
  const location = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");
  if (location) {
    contactItems.push({
      key: "location",
      icon: "location",
      label: "Wohnort",
      value: location,
    });
  }
  const birth =
    profile?.birthDate || profile?.birthPlace
      ? `Geb. ${profile?.birthDate || ""}${profile?.birthPlace ? ` in ${profile.birthPlace}` : ""}`.trim()
      : "";
  if (birth) {
    contactItems.push({
      key: "birth",
      icon: "birth",
      label: "Geburtsdaten",
      value: birth,
    });
  }

  if (contactItems.length === 0) {
    return null;
  }

  const hasProfessionalLink = contactItems.some(
    (item) => item.key === "linkedin",
  );
  const visibleItems = inline
    ? contactItems
        .filter(
          (item) =>
            ["phone", "email", "linkedin", "location"].includes(item.key) ||
            (item.key === "website" && !hasProfessionalLink),
        )
        .slice(0, 4)
    : contactItems;

  return (
    <section
      className={`modern-section ${inline ? "modern-contact-section--inline" : ""}`}
    >
      {!inline ? (
        <h2 className="modern-section__title">
          {atsMode ? "Persönliche Daten" : "Kontaktdaten"}
        </h2>
      ) : null}
      <ul className="modern-contact-list">
        {visibleItems.map((item) => (
          <li
            key={item.key}
            className="modern-contact-item"
            data-contact-kind={item.key}
          >
            {!atsMode ? (
              <div
                className="modern-contact-item__icon"
                style={{ color: accentColor }}
              >
                <ContactIcon kind={item.key} />
              </div>
            ) : null}
            <span className="modern-contact-item__value">{item.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
