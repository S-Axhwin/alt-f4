"use client"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Home, Info, Menu, Settings, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Upload', href: '/protected/upload', icon: Upload },
    { name: 'About', href: '/about', icon: Info },
];



function NavItems({ className }: { className?: string }) {
    return (
        <div className={cn("flex gap-4", className)}>
            {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                        {/* <IconComponent className="h-4 w-4" /> */}
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold">Your App</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:flex-1 justify-end">
                    <NavItems className="mx-6" />
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden flex-1 justify-end">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Navigation Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col space-y-4 mt-4">
                                <NavItems className="flex-col items-start" />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
