'use client';

import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Work from "./components/Work";
import { useState, useEffect } from "react"; // Corrected import

export default function Home() {
  // Initialize with a value that won't cause an immediate flicker if possible.
  // `null` indicates we haven't checked localStorage/system preference yet.
  const [isDarkMode, setIsDarkMode] = useState(null); 

  // Effect to set initial dark mode state
  useEffect(() => {
    let initialThemeIsDark = false;
    if (typeof window !== 'undefined') { // Ensure localStorage is available
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        initialThemeIsDark = true;
      } else if (storedTheme === 'light') {
        initialThemeIsDark = false;
      } else { // No theme stored, check system preference
        initialThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    setIsDarkMode(initialThemeIsDark);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to apply theme class to HTML and update localStorage
  useEffect(() => {
    // Don't run this effect until isDarkMode has been initialized
    if (isDarkMode === null) {
      return;
    }

    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Explicitly set 'light'
    }
  }, [isDarkMode]); // Runs whenever isDarkMode changes (and is not null)

  // Prevent rendering child components until theme is determined to avoid flicker/CLS
  if (isDarkMode === null) {
    return null; // Or a minimal loading skeleton/spinner if preferred
                 // Returning null will mean a blank screen briefly until theme is set.
                 // This is a common strategy to prevent theme flicker.
  }

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main id="main-content"> {/* Added main tag with an id for skip links if needed */}
        <Header isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode} />
        <Work isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}