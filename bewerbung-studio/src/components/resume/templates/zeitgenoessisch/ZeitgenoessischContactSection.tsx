import {
  AtSign,
  Github,
  Link2,
  Linkedin,
  MapPin,
  Phone,
} from "lucide-react";
import type { ApplicantProfile } from "../../../../shared/schema";
import { toZeitgenoessischExternalHref } from "./zeitgenoessisch.model";
import { ZeitgenoessischSectionHeading } from "./ZeitgenoessischSectionHeading";

const contactIcon = {
  phone: Phone,
  email: AtSign,
  portfolio: Link2,
  linkedin: Linkedin,
  location: MapPin,
  github: Github,
} as const;

export function ZeitgenoessischContactSection({
  profile,
}: {
  profile: ApplicantProfile | undefined;
}) {
  const location = [profile?.postalCode, profile?.city, profile?.country]
    .filter(Boolean)
    .join(" ");
  const contacts = [
    {
      kind: "phone",
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      kind: "email",
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      kind: "portfolio",
      value: profile?.portfolio
        ? toZeitgenoessischExternalHref(profile.portfolio)
        : "",
      href: profile?.portfolio
        ? toZeitgenoessischExternalHref(profile.portfolio)
        : "",
    },
    {
      kind: "linkedin",
      value: profile?.linkedin
        ? toZeitgenoessischExternalHref(profile.linkedin)
        : "",
      href: profile?.linkedin
        ? toZeitgenoessischExternalHref(profile.linkedin)
        : "",
    },
    { kind: "location", value: location, href: "" },
    {
      kind: "github",
      value: profile?.github
        ? toZeitgenoessischExternalHref(profile.github)
        : "",
      href: profile?.github
        ? toZeitgenoessischExternalHref(profile.github)
        : "",
    },
  ].filter((contact) => contact.value?.trim()) as Array<{
    kind: keyof typeof contactIcon;
    value: string;
    href: string;
  }>;

  if (!contacts.length) return null;

  return (
    <section
      className="zeitgenoessisch-section zeitgenoessisch-contacts"
      data-element-id="zeitgenoessisch.contacts"
    >
      <ZeitgenoessischSectionHeading title="Kontakte" icon="contacts" />
      <div className="zeitgenoessisch-contact-list">
        {contacts.map((contact) => {
          const Icon = contactIcon[contact.kind];
          const urlBreakMarker =
            contact.kind === "linkedin"
              ? "/in/"
              : contact.kind === "github"
                ? "github.com/"
                : "";
          const urlBreakIndex = urlBreakMarker
            ? contact.value.indexOf(urlBreakMarker) + urlBreakMarker.length
            : 0;
          const content = (
            <>
              <span
                className="zeitgenoessisch-contact-item__icon"
                aria-hidden="true"
              >
                <Icon />
              </span>
              <span className="zeitgenoessisch-contact-item__value">
                {urlBreakIndex > urlBreakMarker.length ? (
                  <>
                    {contact.value.slice(0, urlBreakIndex)}
                    <br />
                    {contact.value.slice(urlBreakIndex)}
                  </>
                ) : (
                  contact.value
                )}
              </span>
            </>
          );
          return contact.href ? (
            <a
              className="zeitgenoessisch-contact-item"
              href={contact.href}
              key={contact.kind}
            >
              {content}
            </a>
          ) : (
            <span
              className="zeitgenoessisch-contact-item"
              key={contact.kind}
            >
              {content}
            </span>
          );
        })}
      </div>
    </section>
  );
}
