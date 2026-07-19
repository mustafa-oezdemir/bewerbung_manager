import {
  programmingLanguageBackgroundTokens,
  type DocumentBackgroundId,
} from "../../shared/documentDesign";

export function DocumentBackgroundLayer({
  backgroundId,
  atsMode = false,
}: {
  backgroundId: DocumentBackgroundId;
  atsMode?: boolean;
}) {
  if (backgroundId !== "programming-languages-bg" || atsMode) return null;
  return (
    <div
      className="document-background-layer programming-languages-layer"
      aria-hidden="true"
    >
      {programmingLanguageBackgroundTokens.map((token) => (
        <span key={token}>{token}</span>
      ))}
    </div>
  );
}
