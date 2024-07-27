import { Badge } from "@/components/ui/badge"

export default function LoginLayout({ children }) {
    return (
        <div className="flex justify-center items-center flex-col h-full">
            <Badge className="text-base px-4 py-2">
                Welcome 😃
            </Badge>
            {children}
        </div>
    )
}