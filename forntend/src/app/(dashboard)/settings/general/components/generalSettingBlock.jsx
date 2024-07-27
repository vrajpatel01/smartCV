export default function GeneralSettingsBlock({ children, title, description }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 space-y-4 gap-5">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
