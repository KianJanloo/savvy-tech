import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function ToggleTheme() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-4 right-4 p-4 rounded-full text-white bg-blue-500 hover:bg-blue-400 transition"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ToggleTheme;
