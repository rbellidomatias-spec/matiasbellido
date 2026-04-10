"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { Briefcase, GraduationCap, Award, X, Languages, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";

const educationLogos = [
  "/projects/Imagenes/UBA.jpg",
  "/projects/Imagenes/STJ.png",
];

const courses = [
  "Negociación - Santander Open Academy",
  "Storytelling - Santander Open Academy",
  "Data Science Intro - Santander Open Academy",
  "Gestión Agile - Santander Open Academy",
  "Finanzas - FEMSA",
];

export default function Experience() {
  const { t, lang, setLang } = useLanguage();
  const { setModalOpen: setGlobalModalOpen } = useModal();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  // Sync local modal state with global context
  useEffect(() => {
    setGlobalModalOpen(expandedIdx !== null);
  }, [expandedIdx, setGlobalModalOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedIdx(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (expandedIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedIdx]);

  // Track active card based on scroll position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cards = carousel.querySelectorAll("[data-card]");
      if (cards.length === 0) return;
      const cardWidth = (cards[0] as HTMLElement).offsetWidth + 24; // gap-6 = 24px
      const scrollLeft = carousel.scrollLeft;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveCard(Math.min(idx, cards.length - 1));
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll("[data-card]");
    if (!cards[idx]) return;
    const cardWidth = (cards[0] as HTMLElement).offsetWidth + 24;
    carousel.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
  };

  const scrollPrev = () => scrollToCard(Math.max(0, activeCard - 1));
  const scrollNext = () =>
    scrollToCard(Math.min(t.experience.items.length - 1, activeCard + 1));

  const handleModalLangToggle = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  const expandedEdu = expandedIdx !== null ? t.experience.education[expandedIdx] : null;
  const expandedLogo = expandedIdx !== null ? educationLogos[expandedIdx] : null;

  return (
    <Section id="experience" eyebrow={t.experience.eyebrow} title={t.experience.title}>
      {/* ============ EXPERIENCIA - CARRUSEL HORIZONTAL ============ */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-cyan" />
            <h3 className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-fg">
              {t.experience.experienceTitle}
            </h3>
          </div>

          {/* Desktop arrow controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={activeCard === 0}
              aria-label="Previous"
              className="p-2 rounded-full glass hover:shadow-glow transition-all disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
            >
              <ChevronLeft className="w-5 h-5 text-cyan" />
            </button>
            <button
              onClick={scrollNext}
              disabled={activeCard === t.experience.items.length - 1}
              aria-label="Next"
              className="p-2 rounded-full glass hover:shadow-glow transition-all disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
            >
              <ChevronRight className="w-5 h-5 text-cyan" />
            </button>
          </div>
        </div>

        {/* Carousel scroll container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-6 px-6 md:-mx-16 md:px-16"
          style={{ scrollPaddingLeft: "1.5rem" }}
        >
          {t.experience.items.map((item, i) => (
            <motion.div
              key={item.role + item.company}
              data-card
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="snap-start shrink-0 w-[85vw] sm:w-[400px] md:w-[420px]"
            >
              <div className="glass rounded-xl p-6 h-full flex flex-col hover:shadow-glow transition-all">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan/80 mb-2 font-mono">
                  {item.period}
                </p>
                <h4 className="font-display text-lg md:text-xl font-bold text-fg mb-1">
                  {item.role}
                </h4>
                <p className="text-base text-cyan mb-1">{item.company}</p>
                <p className="text-xs text-fg-muted uppercase tracking-wider mb-3">
                  {item.type}
                </p>
                <p className="text-sm md:text-base text-fg-soft leading-relaxed mb-4 flex-1">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-electric/10 text-cyan border border-cyan/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {t.experience.items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to experience ${i + 1}`}
              className="touch-manipulation p-1.5"
            >
              <div
                className={`h-1.5 rounded-full transition-all ${
                  activeCard === i
                    ? "w-8 bg-cyan"
                    : "w-1.5 bg-cyan/30 hover:bg-cyan/60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Swipe hint for mobile */}
        <p className="text-center text-xs text-fg-muted mt-3 md:hidden uppercase tracking-wider">
          {lang === "es" ? "← Deslizá para ver más →" : "← Swipe to see more →"}
        </p>
      </div>

      {/* ============ EDUCACIÓN + FORMACIÓN COMPLEMENTARIA - 2 COLUMNAS ============ */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* EDUCACIÓN */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-5 h-5 text-cyan" />
            <h3 className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-fg">
              {t.experience.educationTitle}
            </h3>
          </div>

          <div className="space-y-6">
            {t.experience.education.map((item, i) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setExpandedIdx(i)}
                className="glass rounded-xl p-5 md:p-6 hover:shadow-glow transition-all cursor-pointer group touch-manipulation"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-white border border-cyan/30">
                    <Image
                      src={educationLogos[i]}
                      alt={item.institution}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan/80 mb-2 font-mono">
                      {item.period}
                    </p>
                    <h4 className="font-display text-lg md:text-xl font-bold text-fg mb-1">
                      {item.institution}
                    </h4>
                    <p className="text-sm md:text-base text-cyan mb-3">{item.degree}</p>
                    <p className="text-sm md:text-base text-fg-soft leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-cyan/70 mt-3">
                      {lang === "es" ? "Click para leer más →" : "Click to read more →"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FORMACIÓN COMPLEMENTARIA */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-5 h-5 text-cyan" />
            <h3 className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-fg">
              {t.experience.coursesTitle}
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <ul className="space-y-4">
              {courses.map((course, i) => (
                <motion.li
                  key={course}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 text-sm md:text-base text-fg-soft"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0 mt-2" />
                  <span>{course}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ============ EXPANDED EDUCATION MODAL ============ */}
      <AnimatePresence>
        {expandedEdu && expandedLogo && expandedIdx !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setExpandedIdx(null)}
              className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md"
            />

            <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 md:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-3xl overflow-hidden w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] flex flex-col pointer-events-auto shadow-glow-lg"
              >
                <div className="absolute top-3 right-3 md:top-4 md:right-4 z-50 flex items-center gap-2">
                  <button
                    onClick={handleModalLangToggle}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-black/60 backdrop-blur-sm hover:bg-cyan/20 border border-white/10 transition-all touch-manipulation"
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
                        className="text-xs uppercase text-white"
                      >
                        {lang}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                  <button
                    onClick={() => setExpandedIdx(null)}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-sm hover:bg-cyan/20 border border-white/10 transition-all touch-manipulation"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="overflow-y-auto p-6 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`edu-${expandedIdx}-${lang}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-8 pr-24 md:pr-28">
                        <div className="shrink-0 relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-white border border-cyan/30">
                          <Image
                            src={expandedLogo}
                            alt={expandedEdu.institution}
                            fill
                            sizes="112px"
                            className="object-contain p-2"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs uppercase tracking-[0.2em] text-cyan/80 mb-2 font-mono">
                            {expandedEdu.period}
                          </p>
                          <h3 className="font-display text-2xl md:text-4xl font-bold text-fg mb-2 leading-tight">
                            {expandedEdu.institution}
                          </h3>
                          <p className="text-base md:text-lg text-cyan">{expandedEdu.degree}</p>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        {expandedEdu.longDesc.split("\n\n").map((paragraph, idx) => {
                          const lines = paragraph.split("\n");
                          const hasBullets = paragraph.includes("•");
                          const headerLine = hasBullets ? lines[0] : null;
                          const bulletLines = hasBullets ? lines.slice(1) : lines;

                          return (
                            <div key={idx} className="mb-5 last:mb-0">
                              {headerLine && (
                                <p className="text-base md:text-lg text-cyan font-semibold mb-3">
                                  {headerLine}
                                </p>
                              )}
                              {bulletLines.map((line, lineIdx) => (
                                <p
                                  key={lineIdx}
                                  className={`text-sm md:text-base text-fg-soft leading-relaxed ${
                                    line.startsWith("•") ? "pl-4 mb-1" : "mb-2"
                                  }`}
                                >
                                  {line}
                                </p>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}