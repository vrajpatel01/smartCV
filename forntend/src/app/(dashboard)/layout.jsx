import MainHeader from "@/components/mainHeader";
import Sidebar from "@/components/sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* <MainHeader /> */}
        <div className="p-4 sm:px-6 sm:py-0">{children}</div>
      </div>
    </div>
  );
}
