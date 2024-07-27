import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="flex justify-between pt-10 pb-14 md:pt-20 md:pb-8 items-center flex-col w-screen h-screen">
      {children}
      <div className="space-y-10">
        <div className="flex justify-center items-center gap-3 text-muted-foreground text-sm">
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </div>
  );
}
