import "./Theme.css";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  console.log("ThemeProvider");
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
