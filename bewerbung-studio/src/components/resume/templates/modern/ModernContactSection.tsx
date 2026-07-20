/**
 * ModernContactSection component
 * Renders contact details with icons: phone, email, location, LinkedIn, website
 */

import { Phone, Mail, MapPin, Linkedin, Globe } from "lucide-react";
import type { ModernContactSectionProps } from "./modern.types";

const iconMap: Record<string, React.ReactNode> = {
  phone: <Phone size={16} />,
  email: <Mail size={16} />,
  location: <MapPin size={16} />,
  linkedin: <Linkedin size={16} />,
  website: <Globe size={16} />,
};

export function ModernContactSection({
  profile,
  accentColor,
  atsMode,
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
  if (profile?.city) {
    contactItems.push({
      key: "location",
      icon: "location",
      label: "Wohnort",
      value: profile.city,
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

  if (contactItems.length === 0) {
    return null;
  }

  return (
    <section className="modern-section">
      <h2 className="modern-section__title">Kontaktdaten</h2>
      <ul className="modern-contact-list">
        {contactItems.map((item) => (
          <li key={item.key} className="modern-contact-item">
            <div
              className="modern-contact-item__icon"
              style={
                !atsMode
                  ? {
                      color: accentColor,
                    }
                  : undefined
              }>
              {iconMap[item.icon]}
            </div>
            <span className="modern-contact-item__value">{item.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
