import { createContext, useContext, useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ContextTheme = createContext({ theme: "dark", toggle: () => {} });

function getInitTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
}

export function ThemeProvider({ children }){
    const [ theme, setTheme ] = useState(getInitTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        root.style.colorScheme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
    return <ContextTheme.Provider value={{ theme, toggle}}>
        {children}
    </ContextTheme.Provider>;
}

export const useTheme = () => useContext(ContextTheme);

export function ToggleTheme({ className = "" }){
    const { theme, toggle } = useTheme();
    const dark = theme === "dark";

    return (
        <button type="button" onClick={toggle} aria-label="Dark Theme" aria-pressed={dark} 
        className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-fg/10 text-fg
        transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}>
        <Sun
            size={19}
            className={`absolute transition-all duration-300 ${
          dark ? "scale-50 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        size={19}
        className={`absolute transition-all duration-300 ${
          dark ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-90 opacity-0"
        }`}
      />
        </button>
    )
}