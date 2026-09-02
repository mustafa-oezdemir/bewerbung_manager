import type { Application } from "./schema";

type Contact = Application["contact"];

export const contactFullName = (contact: Contact) =>
  [contact.firstName, contact.lastName].filter(Boolean).join(" ");

const postalContactName = (contact: Contact) => {
  const name = contactFullName(contact);
  if (!name) return "";
  if (contact.salutation === "Herr") return `Herrn ${name}`;
  if (contact.salutation === "Frau") return `Frau ${name}`;
  return name;
};

export const applicationPostalContactLines = (application: Application) =>
  [application.contact, ...application.additionalContacts]
    .map(postalContactName)
    .filter(Boolean);

const greetingForContact = (contact: Contact) => {
  const name = contactFullName(contact);
  if (!name) return "";
  if (contact.salutation === "Herr" && contact.lastName) {
    return `Sehr geehrter Herr ${contact.lastName}`;
  }
  if (contact.salutation === "Frau" && contact.lastName) {
    return `Sehr geehrte Frau ${contact.lastName}`;
  }
  return `Guten Tag ${name}`;
};

export const applicationGreeting = (application: Application) => {
  const greetings = [application.contact, ...application.additionalContacts]
    .map(greetingForContact)
    .filter(Boolean)
    .map((greeting, index) =>
      index === 0
        ? greeting
        : `${greeting.charAt(0).toLocaleLowerCase("de-DE")}${greeting.slice(1)}`,
    );
  return greetings.length
    ? `${greetings.join(", ")},`
    : "Sehr geehrte Damen und Herren,";
};
