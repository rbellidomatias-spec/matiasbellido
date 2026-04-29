"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Languages, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const { isModalOpen } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDark, setIsDark] = useState(true);

  // ORDEN CORRECTO: Inicio → Habilidades → Proyectos → Experiencia → Contacto
  const navItems = [
    { href: "#home", label: t.nav.home, id: "home" },
    { href: "#skills", label: t.nav.skills, id: "skills" },
    { href: "#projects", label: t.nav.projects, id: "projects" },
    { href: "#experience", label: t.nav.experience, id: "experience" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ];

  // Theme toggle
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved !== "light";
    setIsDark(dark);
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLangToggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <AnimatePresence>
      {!isModalOpen && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="glass rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between">
              {/* Logo */}
              <Link href="#home" className="font-display text-xl font-bold text-cyan tracking-tight">
                MB.
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? "text-cyan"
                        : "text-fg-soft hover:text-cyan"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="h-0.5 bg-cyan rounded-full mt-0.5"
                      />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Right side: lang + theme + mobile menu */}
              <div className="flex items-center gap-2">
                {/* Lang toggle */}
                <button
                  onClick={handleLangToggle}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-cyan/10 transition-colors touch-manipulation"
                  aria-label="Toggle language"
                >
                  <Languages className="w-4 h-4 text-cyan" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 3 }}
                      transition={{ duration: 0.15 }}
                      className="text-xs uppercase font-mono text-fg-soft"
                    >
                      {lang}
                    </motion.span>
                  </AnimatePresence>
                </button>

                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-cyan/10 transition-colors touch-manipulation"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-4 h-4 text-cyan" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-4 h-4 text-cyan" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-full hover:bg-cyan/10 transition-colors touch-manipulation"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-cyan" />
                  ) : (
                    <Menu className="w-5 h-5 text-cyan" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.nav
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-1"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-full text-sm font-medium transition-all ${
                        activeSection === item.id
                          ? "bg-cyan/10 text-cyan"
                          : "text-fg-soft hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}