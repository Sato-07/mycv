import { useEffect, useState } from "react";

export const useThemeSwitcher = (): [string, (mode: string) => void] => {
    const preferDarkQuery = "(prefers-color-scheme: dark)";
    const [mode, setMode] = useState<string>("");

    useEffect(() => {
        const userPref = typeof window !== 'undefined' ? window.localStorage.getItem("theme") : null;
        const initialMode = userPref || (window.matchMedia(preferDarkQuery).matches ? "dark" : "light");
        setMode(initialMode);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);

        const handleChange = () => {
            setMode(mediaQuery.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (mode === "dark") {
                document.documentElement.classList.add("dark");
                window.localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                window.localStorage.setItem("theme", "light");
            }
        }
    }, [mode]);

    return [mode, setMode];
};

