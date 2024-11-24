"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Gamepad2, GithubIcon, Laptop, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const ICON_SIZE = 16;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"sm"}>
                    {theme === "light" ? (
                        <GithubIcon
                            key="light"
                            size={ICON_SIZE}
                            className={"text-muted-foreground"}
                        />
                    ) : theme === "dark" ? (
                        <Gamepad2
                            key="dark"
                            size={ICON_SIZE}
                            className={"text-muted-foreground"}
                        />
                    ) : (
                        <Laptop
                            key="system"
                            size={ICON_SIZE}
                            className={"text-muted-foreground"}
                        />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-content" align="start">
                <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(e) => setTheme(e)}
                >
                    <DropdownMenuRadioItem className="flex gap-2" value="light">
                        <GithubIcon size={ICON_SIZE} className="text-muted-foreground" />{" "}
                        <span>Github</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className="flex gap-2" value="dark">
                        <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
                        <span>Discord</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className="flex gap-2" value="system">
                        <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
                        <span>System</span>
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { ThemeSwitcher };
