'use client'
import Link from "next/link"
import {
    BarChartBigIcon,
    Home,
    LayoutDashboard,
} from "lucide-react"
import { usePathname } from "next/navigation";

export const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
    }
]

export const DesktopNavigation = () => {
    const pathname = usePathname();
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={
                            `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? "hover:text-primary text-primary" : "text-muted-foreground"
                            }`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                )
            })}
        </nav>
    )
}

export const MobileNavigation = () => {
    const pathname = usePathname();
    return (
        <nav className="grid gap-2 text-lg font-medium">
            <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
            >
                <BarChartBigIcon className="h-6 w-6" />
                <span className="sr-only">D4 Data</span>
            </Link>
            {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={
                            `mx-[-0.65rem] flex items-center gap-2 text-lg font-semibold ${isActive ? "text-primary" : "text-foreground"
                            }`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                )
            })}
        </nav>
    )
}