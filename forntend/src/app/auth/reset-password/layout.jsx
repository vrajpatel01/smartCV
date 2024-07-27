import { Badge } from "@/components/ui/badge";

export default function ResetPasswordLayout({ children }) {
  return (
    <div className="flex justify-between flex-col h-full items-center mb-5">
      <Badge className="text-base px-4 py-2">Reset password</Badge>
      {children}
    </div>
  );
}
