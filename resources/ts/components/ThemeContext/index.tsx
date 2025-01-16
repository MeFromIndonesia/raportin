import {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import TP from "@mui/material/styles/ThemeProvider";
import getTheme from "./getTheme";

type Mode = "light" | "dark" | "auto";

interface ThemeContextProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  activeMode: Mode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(
    (localStorage.getItem("natsabooru-mode") as Mode) || "auto"
  );

  const systemPreference = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const activeMode = useMemo(
    () => (mode === "auto" ? systemPreference : mode),
    [mode, systemPreference]
  );

  const modeSwitch = useMemo(() => {
    if (mode === "light") return "dark";
    if (mode === "dark") return "auto";
    return "light";
  }, [mode]);

  const toggleMode = useCallback(() => {
    const newMode = modeSwitch;
    setMode(newMode);
    localStorage.setItem("natsabooru-mode", newMode);
  }, [modeSwitch]);

  useEffect(() => {
    document.documentElement.dataset.theme = activeMode;

    if (mode === "auto") {
      const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => setMode("auto");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [activeMode, mode]);

  const contextValue = useMemo(
    () => ({ mode, setMode, toggleMode, activeMode }),
    [mode, toggleMode, activeMode]
  );

  const theme = useMemo(() => getTheme(activeMode), [activeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <TP theme={theme}>
        <CssBaseline />
        {children}
      </TP>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export { ThemeContext };
