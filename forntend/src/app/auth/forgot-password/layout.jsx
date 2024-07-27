import { Badge } from "@/components/ui/badge";

export default function ForgotPasswordLayout({ children }) {
  return (
    <div className="flex justify-between flex-col h-full items-center mb-5">
      <Badge className="text-base px-4 py-2">Create new password</Badge>
      {children}
    </div>
  );
}
