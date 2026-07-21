import {
  CakeSlice,
  Link,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { toExternalHref } from "./tabellarisch.model";
import type { TabellarischHeaderProps } from "./tabellarisch.types";

type HeaderContact = {
  label: string;
  value: string;
  href: string;
  Icon: LucideIcon;
};

export function TabellarischHeader({
  name,
  profile,
  photoSource,
  atsMode,
}: TabellarischHeaderProps) {
  const location = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");
  const birth = [profile?.birthDate, profile?.birthPlace]
    .filter(Boolean)
    .join(" in ");
  const profileLink =
    profile?.linkedin || profile?.portfolio || profile?.github || "";
  const contacts: HeaderContact[] = [
    {
      label: "Telefon",
      value: profile?.phone || "",
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
      Icon: Phone,
    },
    {
      label: "E-Mail",
      value: profile?.email || "",
      href: profile?.email ? `mailto:${profile.email}` : "",
      Icon: Mail,
    },
    {
      label: "Profil",
      value: profileLink,
      href: profileLink ? toExternalHref(profileLink) : "",
      Icon: Link,
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
  ].filter((contact) => contact.value.trim());

  return (
    <header
      className={`tabellarisch-header ${!photoSource || atsMode ? "tabellarisch-header--without-photo" : ""}`}
      data-element-id="tabellarisch.header"
    >
      <div className="tabellarisch-header__identity">
        <h1 className="tabellarisch-header__name">{name}</h1>
        {profile?.title ? (
          <p className="tabellarisch-header__title">{profile.title}</p>
        ) : null}
        {contacts.length ? (
          <address className="tabellarisch-header__contacts">
            {contacts.map(({ Icon, ...contact }) => {
              const content = (
                <>
                  {!atsMode ? <Icon aria-hidden="true" /> : null}
                  {atsMode ? <strong>{contact.label}:</strong> : null}
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

      {photoSource && !atsMode ? (
        <figure className="tabellarisch-header__photo">
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </figure>
      ) : null}
    </header>
  );
}
