import { Home } from "lucide-react"
import Link from "next/link"
import { SettingsNavigator } from "./navigator"

export default function NavigationTab() {
    return (
        <>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-y px-6 -mx-6">
                <nav className="font-medium flex flex-row items-center gap-5 text-sm lg:gap-6">
                    <SettingsNavigator />
                </nav>
            </header>
        </>
    )
}