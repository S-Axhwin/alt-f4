import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Home, Upload, Settings, Info } from "lucide-react";
import { cn } from "@/lib/utils";

import { ThemeSwitcher } from "@/components/theme-switcher";
import Navbar from "@/components/Nav";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Alt F4 ",
    description: "Safe Content Management System",
};

const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Upload', href: '/upload', icon: Upload },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'About', href: '/about', icon: Info },
];



export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className} suppressHydrationWarning>
            <body className="bg-background text-foreground">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="min-h-screen flex flex-col">
                        <Navbar />
                        <div className="flex-1">
                            <div className="">
                                {children}
                            </div>
                        </div>

                        <footer className="border-t py-6 md:py-0">
                            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                                <p className="text-sm text-muted-foreground">
                                    Alt F4 Team
                                </p>
                                <ThemeSwitcher />
                            </div>
                        </footer>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
