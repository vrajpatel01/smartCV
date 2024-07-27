import NavigationTab from "./components/navigationTab";

export default function SettingsLayout({ children }) {
  return (
    <div>
      <NavigationTab />
      <div className="mt-4">{children}</div>
    </div>
  );
}
