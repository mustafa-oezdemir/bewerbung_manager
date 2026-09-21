import {
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Wrench,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { getTemplateKnowledge, parseTemplateStrengths, resolveTemplateSummary } from "../resume-template-data";
import type { ApplicantProfile } from "../../../../shared/schema";
import type { ResumePagePlan } from "../../../../shared/documentPagination";
import {
  externalUrl,
  formatPhoneForDisplay,
  formatUrlForDisplay,
} from "../../../../shared/contactPresentation";
import { groupPehlioneCompetencies } from "../../../../shared/pehlioneCompetencies";
import {
  getPehlioneCoreCompetencies,
  getPehlioneProjectHighlight,
  getPehlioneTechnicalFocus,
} from "../../../../shared/pehlioneContent";
import {
  defaultResumePersonalFieldVisibility,
  getResumeSemanticSection,
  getResumeSemanticTitle,
  resolveKnowledgeGroups,
} from "../../../../features/resume-sections/resume-section-system";
import { getProfileMediaSource } from "../../../../shared/profileMedia";
import "./pehlione.css";

type Props = {
  profile?: ApplicantProfile;
  name: string;
  atsMode: boolean;
  plan: ResumePagePlan;
  totalPages: number;
  accentColor: string;
  secondaryColor: string;
  resumeProfile: string;
  sections: ApplicantProfile["resumeSections"];
};

const heading = (icon: ReactNode, title: string) => (
  <h2 className="pehlione-section-heading">
    <span>{icon}</span>
    <b>{title}</b>
  </h2>
);

const contactItems = (profile?: ApplicantProfile) => {
  const visibility = {
    ...defaultResumePersonalFieldVisibility,
    ...profile?.resumePersonalFieldVisibility,
  };
  return [
  { key: "location", icon: <MapPin />, value: [profile?.city, profile?.country].filter(Boolean).join(", ") },
  { key: "phone", icon: <Phone />, value: formatPhoneForDisplay(profile?.phone), href: profile?.phone ? `tel:${profile.phone.replace(/[^\d+]/g, "")}` : "" },
  { key: "email", icon: <Mail />, value: profile?.email || "", href: profile?.email ? `mailto:${profile.email}` : "" },
  { key: "linkedin", icon: <Linkedin />, value: formatUrlForDisplay(profile?.linkedin || profile?.github || ""), href: externalUrl(profile?.linkedin || profile?.github || "") },
  ].filter((item) => item.value && visibility[item.key === "location" ? "address" : item.key as keyof typeof visibility]);
};

export function PehlioneResume({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  accentColor,
  secondaryColor,
  resumeProfile,
  sections,
}: Props) {
  const continuation = plan.pageNumber > 1;
  const lastPage = plan.pageNumber === totalPages;
  const experienceIds = new Set(plan.items.filter((item) => item.kind === "experience").map((item) => item.id));
  const educationIds = new Set(plan.items.filter((item) => item.kind === "education").map((item) => item.id));
  const experiences = (profile?.experiences ?? []).filter((item) => experienceIds.has(item.id));
  const education = (profile?.education ?? []).filter((item) => educationIds.has(item.id));
  const strengths = parseTemplateStrengths(profile, 8);
  const competencyGroups = groupPehlioneCompetencies(strengths);
  const knowledge = getTemplateKnowledge(profile).slice(0, 8);
  const coreCompetencies = getPehlioneCoreCompetencies(profile);
  const technicalFocus = getPehlioneTechnicalFocus(profile);
  const summary = resolveTemplateSummary(profile, resumeProfile);
  const density = plan.items.length >= 5 ? "compact" : plan.density;
  const project = getPehlioneProjectHighlight(profile);
  const semanticSections = profile?.resumeSemanticSections;
  const summarySection = getResumeSemanticSection(semanticSections, "summary");
  const knowledgeSection = getResumeSemanticSection(semanticSections, "knowledge");
  const interestsSection = getResumeSemanticSection(semanticSections, "interests");
  const closingSection = getResumeSemanticSection(semanticSections, "closing");
  const knowledgeGroups = resolveKnowledgeGroups("pehlione_white_blue", profile?.resumeKnowledgeGroups);
  const visibleKnowledgeGroups = knowledgeGroups.filter((group) => group.visible);
  const coreGroup = visibleKnowledgeGroups[0];
  const focusGroup = visibleKnowledgeGroups[1];
  const closing = profile?.resumeClosing ?? { showPlace: true, showDate: true, showSignature: true };
  const signatureSource = getProfileMediaSource(profile?.signaturePath);
  const style = {
    "--pehlione-primary": accentColor,
    "--pehlione-accent": secondaryColor,
  } as CSSProperties;
  const career = (
    items: Array<
      ApplicantProfile["experiences"][number] | ApplicantProfile["education"][number]
    >,
    kind: "experience" | "education",
  ) => (
    <div className="pehlione-career-list">
      {items.map((item) => (
        <article className="pehlione-career-entry" key={item.id}>
          <p className="pehlione-career-entry__period">{item.from} – {item.to}</p>
          <div>
            <h3>{kind === "experience" ? (item as ApplicantProfile["experiences"][number]).role : (item as ApplicantProfile["education"][number]).degree}</h3>
            <p className="pehlione-career-entry__organisation">
              {kind === "experience" ? (item as ApplicantProfile["experiences"][number]).company : (item as ApplicantProfile["education"][number]).institution}
              {item.city ? ` · ${item.city}` : ""}
            </p>
            {kind === "experience" && (item as ApplicantProfile["experiences"][number]).achievements.filter(Boolean).length ? (
              <ul>{(item as ApplicantProfile["experiences"][number]).achievements.filter(Boolean).slice(0, 5).map((entry) => <li key={entry}>{entry}</li>)}</ul>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <article
      className={`pehlione-resume ${atsMode ? "pehlione-resume--ats" : ""}`}
      data-density={density}
      data-page={plan.pageNumber}
      style={style}>
      {!atsMode && !continuation ? (
        <aside className="pehlione-sidebar">
          <div className="pehlione-hero" aria-hidden="true">
            <i /><i /><i /><b>◉</b>
          </div>
          <section className="pehlione-sidebar-section">
            {heading(<UserRound />, "Kontakt")}
            <ul className="pehlione-contact-list">
              {contactItems(profile).map((item) => <li key={item.key}><span>{item.icon}</span>{item.href ? <a href={item.href}>{item.value}</a> : item.value}</li>)}
            </ul>
          </section>
          {knowledgeSection.visible && sections.strengths && (coreGroup?.items.length || coreCompetencies.length || competencyGroups.length) ? (
            <section className="pehlione-sidebar-section">
              {heading(<Lightbulb />, coreGroup?.title || "Kernkompetenzen")}
              <ul className="pehlione-bullet-list">{coreGroup?.items.length
                ? coreGroup.items.map((item) => <li key={item}>{item}</li>)
                : coreCompetencies.length
                ? coreCompetencies.map((item) => <li key={item}>{item}</li>)
                : competencyGroups.map((group) => <li key={group.title}><strong>{group.title}:</strong> {group.values.join(" · ")}</li>)}</ul>
            </section>
          ) : null}
          {knowledgeSection.visible && (focusGroup?.items.length || technicalFocus.length || (sections.skills && knowledge.length)) ? (
            <section className="pehlione-sidebar-section">
              {heading(<Wrench />, focusGroup?.title || "Technische Schwerpunkte")}
              <ul className="pehlione-focus-list">{(focusGroup?.items.length ? focusGroup.items : technicalFocus.length ? technicalFocus : knowledge).map((item, index) => <li key={item}><span>{index % 2 ? <Database /> : <Code2 />}</span>{item}</li>)}</ul>
            </section>
          ) : null}
          {knowledgeSection.visible && visibleKnowledgeGroups.slice(2).map((group) => group.items.length ? (
            <section className="pehlione-sidebar-section" key={group.id}>
              {heading(<Lightbulb />, group.title)}
              <ul className="pehlione-bullet-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ) : null)}
          {sections.languages && profile?.languages.filter(Boolean).length ? (
            <section className="pehlione-sidebar-section">
              {heading(<UserRound />, "Sprachen")}
              <ul className="pehlione-bullet-list">{profile.languages.filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ) : null}
        </aside>
      ) : null}
      <main className="pehlione-main">
        <header className="pehlione-header">
          <h1>{name}</h1>
          <h2>{profile?.title || "Fachkraft"}</h2>
        </header>
        {atsMode && !continuation ? (
          <section className="pehlione-ats-contact"><b>Kontakt:</b> {contactItems(profile).map((item) => item.value).join(" · ")}</section>
        ) : null}
        {!continuation && summarySection.visible && sections.profile && summary ? <section className="pehlione-main-section">{heading(<UserRound />, getResumeSemanticTitle(semanticSections, "summary"))}<p className="pehlione-summary">{summary}</p></section> : null}
        {sections.experience && experiences.length ? <section className="pehlione-main-section">{heading(<BriefcaseBusiness />, `${getResumeSemanticTitle(semanticSections, "career")}${continuation ? " · Fortsetzung" : ""}`)}{career(experiences, "experience")}</section> : null}
        {sections.education && education.length ? <section className="pehlione-main-section">{heading(<GraduationCap />, getResumeSemanticTitle(semanticSections, "education"))}{career(education, "education")}</section> : null}
        {!continuation && project ? <section className="pehlione-main-section pehlione-project">{heading(<Lightbulb />, "Projekt-Highlight")}<h3>{project.title}</h3><p>{[project.company, ...project.technologies].filter(Boolean).join(" · ")}</p>{project.achievements.length ? <ul>{project.achievements.map((entry) => <li key={entry}>{entry}</li>)}</ul> : null}</section> : null}
        {lastPage && sections.certifications && profile?.certifications.length ? <section className="pehlione-main-section pehlione-training">{heading(<GraduationCap />, "Weiterbildungen")}<ul>{profile.certifications.map((item) => <li key={item}>{item}</li>)}</ul></section> : null}
        {lastPage && interestsSection.visible && profile?.specialSections.filter((section) => section.kind === "interests" && section.isVisible).map((section) => (
          <section className="pehlione-main-section pehlione-training" key={section.id}>{heading(<Lightbulb />, section.title)}<ul>{section.entries.map((entry) => <li key={entry.id}>{entry.title || entry.description}</li>)}</ul></section>
        ))}
        {lastPage && closingSection.visible && (closing.showPlace || closing.showDate || closing.showSignature) ? (
          <footer className="pehlione-closing">
            {(closing.showPlace || closing.showDate) ? <p>{[closing.showPlace ? profile?.applicationPlace || profile?.city : "", closing.showDate ? profile?.applicationDate : ""].filter(Boolean).join(", ")}</p> : null}
            {closing.showSignature && signatureSource ? <img src={signatureSource} alt="Unterschrift" /> : null}
            {closing.showSignature ? <strong>{name}</strong> : null}
          </footer>
        ) : null}
        {!experiences.length && !education.length ? <p className="pehlione-empty">Berufserfahrung und Ausbildung im Profil ergänzen.</p> : null}
      </main>
    </article>
  );
}
