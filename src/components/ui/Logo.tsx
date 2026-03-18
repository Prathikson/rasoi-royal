export function LogoMark({ size=36, className="" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="0.75" opacity="0.3"/>
      <text x="18" y="24" textAnchor="middle" fontFamily="var(--font-playfair), serif" fontSize="16" fontWeight="400" fill="currentColor" letterSpacing="0">R</text>
    </svg>
  );
}
export function LogoFull({ className="" }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center gap-2.5 no-underline ${className}`} style={{ color:"var(--fg)" }}>
      <span style={{ fontFamily:"var(--font-playfair), serif", fontSize:"18px", fontWeight:400, letterSpacing:"0.04em", color:"var(--fg)" }}>Rasoi</span>
      <span style={{ fontFamily:"var(--font-playfair), serif", fontSize:"11px", fontWeight:400, letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--fg3)", marginTop:"2px" }}>Royal</span>
    </a>
  );
}
