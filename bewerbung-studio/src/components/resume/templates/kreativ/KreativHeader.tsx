import {
  CakeSlice,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { toKreativExternalHref } from "./kreativ.model";
import type { KreativHeaderProps } from "./kreativ.types";

type KreativContact = {
  label: string;
  value: string | undefined;
  href: string;
  Icon: LucideIcon;
};

export function KreativHeader({
  profile,
  name,
  photoSource,
  compact = false,
  atsMode = false,
}: KreativHeaderProps) {
  const location = [profile?.postalCode, profile?.city, profile?.country]
    .filter(Boolean)
    .join(" ");
  const birth = [profile?.birthDate, profile?.birthPlace]
    .filter(Boolean)
    .join(", ");
  const contacts: KreativContact[] = [
    {
      label: "Telefon",
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
      Icon: Phone,
    },
    {
      label: "E-Mail",
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
      Icon: Mail,
    },
    {
      label: "LinkedIn",
      value: profile?.linkedin,
      href: profile?.linkedin
        ? toKreativExternalHref(profile.linkedin)
        : "",
      Icon: Linkedin,
    },
    {
      label: "Wohnort",
      value: location,
      href: "",
      Icon: MapPin,
    },
    {
      label: "Geboren",
      value: birth,
      href: "",
      Icon: CakeSlice,
    },
  ].filter((contact) => contact.value?.trim());

  return (
    <header
      className={`kreativ-header ${compact ? "kreativ-header--compact" : ""} ${!photoSource || atsMode ? "kreativ-header--no-photo" : ""}`}
      data-element-id="kreativ.header"
    >
      <div className="kreativ-header__identity">
        {compact ? (
          <p className="kreativ-header__kicker">
            Lebenslauf · Fortsetzung
          </p>
        ) : null}
        <h1>{name}</h1>
        {profile?.title ? <h2>{profile.title}</h2> : null}
        {!compact && contacts.length ? (
          <address className="kreativ-header__contacts">
            {contacts.map(({ Icon, ...contact }) => {
              const content = (
                <>
                  <Icon aria-hidden="true" />
                  <span>{contact.value}</span>
                </>
              );

              return contact.href ? (
                <a
                  aria-label={`${contact.label}: ${contact.value}`}
                  href={contact.href}
                  key={contact.label}
                >
                  {content}
                </a>
              ) : (
                <span
                  aria-label={`${contact.label}: ${contact.value}`}
                  key={contact.label}
                >
                  {content}
                </span>
              );
            })}
          </address>
        ) : null}
      </div>
      {!compact && !atsMode && photoSource ? (
        <figure
          className="kreativ-header__photo"
          data-element-id="kreativ.photo"
        >
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </figure>
      ) : null}
    </header>
  );
}
