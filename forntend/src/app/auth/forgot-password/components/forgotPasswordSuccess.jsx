import { Button } from "@/components/ui/button";
import { MdDone } from "react-icons/md";
import Link from "next/link";

export default function ForgotPasswordSuccess() {
    return (
        <div className="h-full flex justify-center items-center flex-col gap-10">
            <div className="p-4 bg-green-600 max-w-min h-min rounded-full">
                <span className="text-primary-foreground">
                    <MdDone className="text-3xl" />
                </span>
            </div>
            <div className="space-y-3 text-center">
                <h1 className="text-3xl font-bold">Email send</h1>
                <p className="md:max-w-[400px] text-center text-lg text-muted-foreground leading-6">
                    We send you an email to forgot your password please check your email. if your email is not in your inbox please check your spam folder.
                </p>
            </div>
            <Button variant='secondary'>
                <Link href='/auth/login'>Login</Link>
            </Button>
        </div>
    )
}