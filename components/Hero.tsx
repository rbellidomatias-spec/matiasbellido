"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Linkedin, Github, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col items-center gap-6"
        >
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden glass shadow-glow-lg">
            <Image
              src="/projects/Imagenes/profile.png"
              alt="Matías Bellido"
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 90vw, 384px"
              className="object-cover object-top scale-90"
            />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/matiasbellido"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="glass p-3 rounded-full hover:text-cyan hover:shadow-glow transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/rbellidomatias-spec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="glass p-3 rounded-full hover:text-cyan hover:shadow-glow transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/message/RRG5RHLSINR3M1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="glass p-3 rounded-full hover:text-cyan hover:shadow-glow transition-all"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          <div className="absolute -inset-4 bg-gradient-to-r from-electric to-cyan opacity-20 blur-3xl -z-10 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm uppercase tracking-widest text-cyan">
            <Sparkles className="w-4 h-4" />
            {t.hero.badge}
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] gradient-text">
            {t.hero.titleLine1}
            <br />
            <span className="whitespace-nowrap">{t.hero.titleLine2}</span>
          </h1>

          <p className="text-xl md:text-2xl text-fg-soft max-w-xl leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <a
              href="#projects"
              className="group relative px-7 py-4 rounded-full bg-electric text-white font-medium text-base overflow-hidden transition-all hover:shadow-glow"
            >
              <span className="relative z-10">{t.hero.ctaProjects}</span>
            </a>
            <a
              href="#bio"
              className="px-7 py-4 rounded-full glass text-fg-soft hover:text-fg transition-colors inline-flex items-center gap-2 text-base"
            >
              {t.hero.ctaAbout} <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}