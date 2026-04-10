"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const { isModalOpen } = useModal();
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: "#top", id: "top" },
    { label: t.nav.skills, href: "#bio", id: "bio" },
    { label: t.nav.experience, href: "#experience", id: "experience" },
    { label: t.nav.projects, href: "#projects", id: "projects" },
    { label: t.nav.contact, href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = ["bio", "experience", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when modal opens
  useEffect(() => {
    if (isModalOpen) setMobileOpen(false);
  }, [isModalOpen]);

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

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {!isModalOpen && (
          <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 inset-x-0 z-50 px-4 md:px-8 pt-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="glass rounded-full px-5 md:px-8 py-3 flex items-center justify-between shadow-glow">
                <button
                  onClick={() => handleNavClick("#top")}
                  className="font-display font-bold text-lg gradient-text shrink-0 touch-manipulation"
                  aria-label="Inicio"
                >
                  MB.
                </button>

                <nav className="hidden md:flex items-center gap-8">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="relative text-sm transition-colors group touch-manipulation"
                      >
                        <span
                          className={`transition-colors ${
                            isActive ? "text-cyan" : "text-fg-soft hover:text-fg"
                          }`}
                        >
                          {link.label}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute -bottom-1 left-0 right-0 h-px bg-cyan"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={toggleLang}
                    title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
                    aria-label="Toggle language"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-white/5 transition-colors text-xs uppercase tracking-wider touch-manipulation"
                  >
                    <Languages className="w-3.5 h-3.5 text-cyan" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-fg-soft"
                      >
                        {lang}
                      </motion.span>
                    </AnimatePresence>
                  </button>

                  <button
                    onClick={toggleTheme}
                    title={isDark ? "Light mode" : "Dark mode"}
                    aria-label="Toggle theme"
                    className="p-2.5 rounded-full hover:bg-white/5 transition-colors touch-manipulation"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isDark ? "dark" : "light"}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isDark ? (
                          <Sun className="w-4 h-4 text-cyan" />
                        ) : (
                          <Moon className="w-4 h-4 text-cyan" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>

                  <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    className="md:hidden p-2.5 rounded-full hover:bg-white/5 transition-colors touch-manipulation"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mobileOpen ? "close" : "menu"}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {mobileOpen ? (
                          <X className="w-4 h-4 text-cyan" />
                        ) : (
                          <Menu className="w-4 h-4 text-cyan" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && !isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 inset-x-4 z-40 md:hidden"
          >
            <div className="glass rounded-2xl p-6 shadow-glow-lg">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNavClick(link.href)}
                      className={`text-left text-base font-medium transition-colors touch-manipulation py-2 ${
                        isActive ? "text-cyan" : "text-fg-soft"
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}