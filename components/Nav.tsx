
"use client"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Home, Info, LogIn, LogOut, Menu, Settings, Upload, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient as createClientComponentClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { revalidatePath } from "next/cache";
import { signOutAction } from "@/app/actions";

// Navigation items for authenticated users
const authenticatedItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Upload', href: '/protected/upload', icon: Upload },
    { name: 'About', href: '/about', icon: Info },
];

// Navigation items for non-authenticated users
const publicItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
];

function NavItems({ className, isAuthenticated, onItemClick }: {
    className?: string,
    isAuthenticated: boolean,
    onItemClick?: () => void
}) {
    const items = isAuthenticated ? authenticatedItems : publicItems;

    return (
        <div className={cn("flex gap-4", className)}>
            {items.map((item) => {
                const IconComponent = item.icon;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                        onClick={onItemClick}
                    >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}

const UserMenu = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const getUserEmail = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email || "");
            }
        };
        getUserEmail();
    }, [supabase.auth]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/protected/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOutAction}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const AuthButtons = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => {
    const handleClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/sign-in" className="flex items-center" onClick={handleClick}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                </Link>
            </Button>
            <Button asChild>
                <Link href="/sign-in" onClick={handleClick}>
                    Sign Up
                </Link>
            </Button>
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const supabase = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsAuthenticated(!!user);
        };

        // Check initial auth state
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase.auth]);

    const handleCloseSheet = () => {
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl">Alt F4</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:flex-1 md:justify-between md:items-center">
                    <NavItems className="mx-6" isAuthenticated={isAuthenticated} />
                    {isAuthenticated ? (
                        <UserMenu />
                    ) : (
                        <AuthButtons setIsOpen={setIsOpen} />
                    )}
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
                        <SheetContent side="bottom">
                            <SheetHeader>
                                <SheetTitle>Navigation Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col space-y-4 mt-4">
                                <NavItems
                                    className="flex-col items-start"
                                    isAuthenticated={isAuthenticated}
                                    onItemClick={handleCloseSheet}
                                />
                                {isAuthenticated ? (
                                    <div className="flex flex-col space-y-2">
                                        <Link
                                            href="/protected"
                                            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                                            onClick={handleCloseSheet}
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            onClick={async () => {
                                                handleCloseSheet();
                                                await signOutAction();
                                            }}
                                            className="justify-start"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign out
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <Button variant="ghost" asChild>
                                            <Link
                                                href="/protected/sign-in"
                                                className="flex items-center"
                                                onClick={handleCloseSheet}
                                            >
                                                <LogIn className="mr-2 h-4 w-4" />
                                                Sign In
                                            </Link>
                                        </Button>
                                        <Button asChild>
                                            <Link
                                                href="/protected/sign-in"
                                                onClick={handleCloseSheet}
                                            >
                                                Sign Up
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
