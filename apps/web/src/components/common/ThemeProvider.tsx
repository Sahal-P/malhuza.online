import { createContext, useContext, useEffect, useState } from "react"
import { darkDefaultTheme,
  lightDefaultTheme,
  Theme as EditorTheme, } from "@blocknote/react";
type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useEditorTheme = () => {
  const lightTheme = {
    ...lightDefaultTheme,
    colors: {
      ...lightDefaultTheme.colors,
      editor: {
        text: lightDefaultTheme.colors.editor.text,
        background: lightDefaultTheme.colors.editor.background,
      },
      highlightColors: lightDefaultTheme.colors.highlightColors,
    },
  } satisfies EditorTheme;
  
  const darkTheme = {
    ...darkDefaultTheme,
    colors: {
      ...darkDefaultTheme.colors,
      editor: {
        text: darkDefaultTheme.colors.editor.text,
        background: "#191919",
      },
      highlightColors: darkDefaultTheme.colors.highlightColors,
    },
  } satisfies EditorTheme;
  
  const systemTheme = {
    light: lightTheme,
    dark: darkTheme,
  };

  return {systemTheme, lightTheme, darkTheme}
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
