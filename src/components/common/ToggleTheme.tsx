import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function ToggleTheme() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "light";
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
      className="md:fixed bottom-4 right-4 md:p-4 max-md:px-3 max-md:py-2.5 rounded-full max-md:rounded-md text-white bg-blue-500 hover:bg-blue-400 transition"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ToggleTheme;
