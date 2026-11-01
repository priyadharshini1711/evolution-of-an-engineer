export function GridBackground({ className = '' }: { className?: string }) {
  return <div className={`grid-bg ${className}`} aria-hidden="true" />;
}
