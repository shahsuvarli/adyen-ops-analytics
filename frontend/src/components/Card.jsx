export default function Card({ title, description, children, style }) {
  return (
    <div className="card" style={style}>
      <div className="card-title">{title}</div>
      {description && (
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14, lineHeight: 1.5 }}>
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
