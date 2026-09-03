export function KompaktHeader({
  name,
  title,
  compact = false,
}: {
  name: string;
  title?: string;
  compact?: boolean;
}) {
  return (
    <header
      className={`kompakt-header ${compact ? "kompakt-header--compact" : ""}`}
      data-element-id="kompakt.header"
    >
      {compact ? <p>Lebenslauf · Fortsetzung</p> : null}
      <h1>{name}</h1>
      {title ? <h2>{title}</h2> : null}
    </header>
  );
}
