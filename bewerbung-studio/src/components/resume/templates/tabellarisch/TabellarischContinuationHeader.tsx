/**
 * Tabellarisch Template - Continuation Header Component
 * Simplified header for page 2+
 */

interface TabellarischContinuationHeaderProps {
  name: string;
  title?: string;
}

export function TabellarischContinuationHeader({
  name,
  title,
}: TabellarischContinuationHeaderProps) {
  return (
    <div className="tabellarisch-continuation-header">
      <h2 className="tabellarisch-continuation-header__name">{name}</h2>
      {title && (
        <p className="tabellarisch-continuation-header__title">{title}</p>
      )}
    </div>
  );
}
