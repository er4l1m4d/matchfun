interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({ width, height, radius, style }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      aria-hidden
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="skeleton-text" aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            width: i === lines - 1 ? "60%" : "100%",
            height: "0.75rem",
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card" aria-hidden style={{ padding: "var(--space-5)" }}>
      <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", marginBottom: "var(--space-3)" }}>
        <div className="skeleton" style={{ width: "40px", height: "40px", borderRadius: "var(--radius-full)" }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ width: "60%", height: "0.875rem", borderRadius: "4px", marginBottom: "6px" }} />
          <div className="skeleton" style={{ width: "40%", height: "0.75rem", borderRadius: "4px" }} />
        </div>
      </div>
      <div className="skeleton" style={{ width: "100%", height: "80px", borderRadius: "var(--radius-md)" }} />
    </div>
  );
}
