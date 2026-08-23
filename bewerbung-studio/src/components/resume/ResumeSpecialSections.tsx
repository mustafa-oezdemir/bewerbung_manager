import type { ApplicantProfile } from "../../shared/schema";

const joinValues = (values: Array<string | undefined>, separator: string) =>
  values.map((value) => value?.trim()).filter(Boolean).join(separator);

const hasEntryContent = (
  entry: ApplicantProfile["specialSections"][number]["entries"][number],
) =>
  Boolean(
    entry.title.trim() ||
      entry.subtitle.trim() ||
      entry.from.trim() ||
      entry.to.trim() ||
      entry.date.trim() ||
      entry.location.trim() ||
      entry.url.trim() ||
      entry.description.trim() ||
      entry.bullets.some((bullet) => bullet.trim()),
  );

export function ResumeSpecialSections({
  profile,
  sectionClassName,
  headingClassName,
}: {
  profile: ApplicantProfile | undefined;
  sectionClassName?: string;
  headingClassName?: string;
}) {
  const sections = (profile?.specialSections ?? [])
    .filter((section) => section.isVisible)
    .map((section) => ({
      ...section,
      entries: section.entries.filter(hasEntryContent),
    }))
    .filter((section) => section.entries.length);

  if (!sections.length) return null;

  return (
    <div className="resume-special-output-list">
      {sections.map((section) => (
        <section
          className={[sectionClassName, "resume-special-output"]
            .filter(Boolean)
            .join(" ")}
          data-element-id={`special.${section.id}`}
          key={section.id}
        >
          <h2 className={headingClassName}>{section.title}</h2>
          <div className="resume-special-output__entries">
            {section.entries.map((entry) => {
              const period =
                entry.date.trim() ||
                joinValues([entry.from, entry.to], " – ");
              const metadata = joinValues(
                [entry.subtitle, entry.location, period],
                " · ",
              );
              return (
                <article className="resume-special-output__entry" key={entry.id}>
                  {entry.title ? <h3>{entry.title}</h3> : null}
                  {metadata ? <p className="resume-special-output__meta">{metadata}</p> : null}
                  {entry.description ? <p>{entry.description}</p> : null}
                  {entry.bullets.some((bullet) => bullet.trim()) ? (
                    <ul>
                      {entry.bullets
                        .map((bullet) => bullet.trim())
                        .filter(Boolean)
                        .map((bullet, index) => (
                          <li key={`${entry.id}-${index}`}>{bullet}</li>
                        ))}
                    </ul>
                  ) : null}
                  {entry.url ? <p className="resume-special-output__url">{entry.url}</p> : null}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
