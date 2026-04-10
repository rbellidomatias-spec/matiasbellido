"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Lock, Clock, X, Mail, Languages } from "lucide-react";
import Section from "./Section";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";

const sideProjectsMeta = [
  {
    id: "budgents",
    image: "/projects/Imagenes/agents.png",
    tags: ["LLMs", "APIs", "Webhooks", "N8N"],
  },
  {
    id: "nutriops",
    image: "/projects/Imagenes/solver.png",
    tags: ["Excel Solver", "Linear Programming", "Web Scraping", "Operations Research"],
  },
];

export default function Projects() {
  const { t, lang, setLang } = useLanguage();
  const { setModalOpen: setGlobalModalOpen } = useModal();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const lockControls = useAnimation();

  const sideProjects = sideProjectsMeta.map((meta) => {
    const content = meta.id === "budgents" ? t.projects.budgents : t.projects.nutriops;
    return { ...meta, ...content };
  });

  // Sync local modal state with global context
  useEffect(() => {
    setGlobalModalOpen(expandedId !== null || emailModalOpen);
  }, [expandedId, emailModalOpen, setGlobalModalOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedId(null);
        setEmailModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (expandedId || emailModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedId, emailModalOpen]);

  useEffect(() => {
    if (!clicked) {
      lockControls.start({
        scale: [1, 1.08, 1],
        rotate: 0,
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      });
    }
  }, [clicked, lockControls]);

  const handleLockClick = async () => {
    setClicked(true);
    await lockControls.start({
      rotate: [0, -8, 8, -8, 8, -4, 4, 0],
      scale: [1, 1.1, 1.1, 1.1, 1.1, 1.05, 1.05, 1],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    setTimeout(() => {
      setEmailModalOpen(true);
      setClicked(false);
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Interesado en Symbiosis AI");
    const body = encodeURIComponent(
      `Hola Matías,\n\nMe gustaría recibir novedades sobre Symbiosis AI.\n\nMi email: ${email}\n\nGracias!`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rbellidomatias@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
    setTimeout(() => {
      setEmailModalOpen(false);
      setEmail("");
    }, 500);
  };

  // In-place language toggle: just changes the language, modal stays open
  const handleModalLangToggle = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  // Compute expanded project from CURRENT lang (re-evaluates on language change)
  const expandedProject = sideProjects.find((p) => p.id === expandedId);

  return (
    <Section id="projects" eyebrow={t.projects.eyebrow} title={t.projects.title}>
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          onClick={handleLockClick}
          className="relative glass rounded-2xl overflow-hidden cursor-pointer group min-h-[500px] lg:min-h-[600px] flex flex-col touch-manipulation"
        >
          <div className="absolute inset-0">
            <Image
              src="/projects/Imagenes/symbiosis.png"
              alt="Symbiosis AI"
              fill
              quality={80}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          </div>

          <AnimatePresence>
            {clicked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-red-500 z-30 mix-blend-overlay"
              />
            )}
          </AnimatePresence>

          <div className="relative z-20 flex flex-col items-center justify-center flex-1 gap-6 p-8">
            <motion.div animate={lockControls} className="relative">
              <div className="absolute inset-0 bg-cyan/40 blur-2xl -z-10" />
              <Lock
                className={`w-20 h-20 transition-colors duration-200 ${
                  clicked ? "text-red-500" : "text-cyan"
                }`}
                strokeWidth={1.5}
              />
            </motion.div>

            <p className="text-xs uppercase tracking-[0.4em] text-cyan">{t.projects.symbiosis.status}</p>

            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-6 h-6 text-white" strokeWidth={1.5} />
              </motion.div>
              <p className="font-display text-3xl font-bold text-white">
                {t.projects.symbiosis.building}
                <motion.span animate={{ opacity: [0, 1, 1, 1] }} transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.33, 0.66, 1] }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 0, 1, 1] }} transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.33, 0.66, 1] }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 0, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.33, 0.66, 1] }}>.</motion.span>
              </p>
            </div>

            <p className="text-xs uppercase tracking-wider text-white/60 mt-4 text-center">
              {t.projects.symbiosis.clickHint}
            </p>
          </div>

          <div className="relative z-20 p-6 md:p-8 border-t border-white/10 bg-black/40 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">
              {t.projects.symbiosis.meta}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-cyan">
              {t.projects.symbiosis.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {t.projects.symbiosis.desc}
            </p>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
              {["Claude", "OpenClaw", "Research", "Python"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-electric/10 text-cyan border border-cyan/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          {sideProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              onClick={() => setExpandedId(project.id)}
              className="glass rounded-2xl overflow-hidden flex flex-col group flex-1 cursor-pointer hover:shadow-glow transition-shadow touch-manipulation"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={80}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-fg-muted mb-2">
                  {project.date} - {project.category}
                </p>
                <h3 className="font-display text-xl font-bold mb-3 text-cyan">
                  {project.title}
                </h3>
                <p className="text-sm text-fg-soft leading-relaxed mb-4 flex-1 line-clamp-3">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-electric/10 text-cyan border border-cyan/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-wider text-cyan/70 mt-3">
                  {lang === "es" ? "Click para leer más →" : "Click to read more →"}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* EXPANDED PROJECT MODAL — uses scale animation, NO layoutId */}
      <AnimatePresence>
        {expandedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setExpandedId(null)}
              className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md"
            />

            <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 md:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-3xl overflow-hidden w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] flex flex-col pointer-events-auto shadow-glow-lg"
              >
                {/* Modal control bar */}
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
                    onClick={() => setExpandedId(null)}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-sm hover:bg-cyan/20 border border-white/10 transition-all touch-manipulation"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="overflow-y-auto">
                  <div
                    className="relative w-full bg-black flex items-center justify-center"
                    style={{ minHeight: "250px", maxHeight: "55vh" }}
                  >
                    <Image
                      src={expandedProject.image}
                      alt={expandedProject.title}
                      fill
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  <div className="p-6 md:p-12">
                    {/* Animate text changes when language toggles */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${expandedProject.id}-${lang}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-4">
                          {expandedProject.date} - {expandedProject.category}
                        </p>

                        <h3 className="font-display text-3xl md:text-5xl font-bold mb-6 text-cyan">
                          {expandedProject.title}
                        </h3>

                        <p className="text-base md:text-lg text-fg leading-relaxed mb-8">
                          {expandedProject.desc}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
                          {expandedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-4 py-2 rounded-full bg-electric/10 text-cyan border border-cyan/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* EMAIL MODAL (Symbiosis) */}
      <AnimatePresence>
        {emailModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEmailModalOpen(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass rounded-2xl p-6 md:p-8 max-w-md w-full shadow-glow-lg"
            >
              <button
                onClick={() => setEmailModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-fg-soft" />
              </button>

              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan/30 blur-2xl -z-10" />
                  <Lock className="w-12 h-12 text-cyan" strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-2 text-cyan">
                {t.projects.modal.title}
              </h3>
              <p className="text-center text-fg-soft text-sm mb-6">
                {t.projects.modal.desc}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.projects.modal.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-full bg-white/5 border border-cyan/20 text-fg placeholder:text-fg-faint focus:outline-none focus:border-cyan/60 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-electric text-white font-medium hover:shadow-glow transition-all flex items-center justify-center gap-2 touch-manipulation"
                >
                  <Mail className="w-4 h-4" />
                  {t.projects.modal.button}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}