import {
  AtSign,
  CakeSlice,
  Github,
  Globe2,
  Link as LinkIcon,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import {
  toZweispaltigExternalHref,
  uniqueZweispaltigValues,
} from "./zweispaltig.model";
import type { ZweispaltigHeaderProps } from "./zweispaltig.types";

type ZweispaltigContact = {
  kind:
    | "phone"
    | "email"
    | "linkedin"
    | "location"
    | "birth"
    | "github"
    | "portfolio";
  label: string;
  value: string | undefined;
  href: string;
  Icon: LucideIcon;
};

export function ZweispaltigHeader({
  profile,
  name,
  photoSource,
  compact = false,
  atsMode = false,
}: ZweispaltigHeaderProps) {
  const location = [profile?.postalCode, profile?.city, profile?.country]
    .filter(Boolean)
    .join(" ");
  const specializations = uniqueZweispaltigValues(
    profile?.skills ?? [],
  ).slice(0, 3);
  const birth = [profile?.birthDate, profile?.birthPlace]
    .filter(Boolean)
    .join(", ");
  const contacts: ZweispaltigContact[] = [
    {
      kind: "phone",
      label: "Telefon",
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
      Icon: Phone,
    },
    {
      kind: "email",
      label: "E-Mail",
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
      Icon: AtSign,
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      value: profile?.linkedin,
      href: profile?.linkedin
        ? toZweispaltigExternalHref(profile.linkedin)
        : "",
      Icon: LinkIcon,
    },
    {
      kind: "location",
      label: "Wohnort",
      value: location,
      href: "",
      Icon: MapPin,
    },
    {
      kind: "birth",
      label: "Geboren",
      value: birth,
      href: "",
      Icon: CakeSlice,
    },
    {
      kind: "github",
      label: "GitHub",
      value: profile?.github,
      href: profile?.github
        ? toZweispaltigExternalHref(profile.github)
        : "",
      Icon: Github,
    },
    {
      kind: "portfolio",
      label: "Portfolio",
      value: profile?.portfolio,
      href: profile?.portfolio
        ? toZweispaltigExternalHref(profile.portfolio)
        : "",
      Icon: Globe2,
    },
  ].filter((contact) => contact.value?.trim()) as ZweispaltigContact[];

  return (
    <header
      className={`zweispaltig-header ${compact ? "zweispaltig-header--compact" : ""}`}
      data-element-id="zweispaltig.header"
    >
      <div className="zweispaltig-header__identity">
        {compact ? (
          <p className="zweispaltig-header__kicker">
            Lebenslauf · Fortsetzung
          </p>
        ) : null}
        <h1>{name}</h1>
        {profile?.title || (!compact && specializations.length) ? (
          <h2>
            {profile?.title ? <span>{profile.title}</span> : null}
            {!compact
              ? specializations.map((specialization) => (
                  <span key={specialization}>{specialization}</span>
                ))
              : null}
          </h2>
        ) : null}

        {!compact && contacts.length ? (
          <address className="zweispaltig-header__contacts">
            {contacts.map(({ Icon, ...contact }) => {
              const content = atsMode ? (
                <>
                  <strong>{contact.label}</strong>
                  <span>{contact.value}</span>
                </>
              ) : (
                <>
                  <Icon aria-hidden="true" />
                  <span>{contact.value}</span>
                </>
              );

              return contact.href ? (
                <a
                  aria-label={`${contact.label}: ${contact.value}`}
                  data-contact-kind={contact.kind}
                  href={contact.href}
                  key={contact.label}
                >
                  {content}
                </a>
              ) : (
                <span
                  aria-label={`${contact.label}: ${contact.value}`}
                  data-contact-kind={contact.kind}
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
          className="zweispaltig-header__photo"
          data-element-id="zweispaltig.photo"
        >
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </figure>
      ) : null}
    </header>
  );
}
