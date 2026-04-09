"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Section from "./Section";
import { useLanguage } from "@/context/LanguageContext";

export default function Bio() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      number: "01",
      title: t.bio.categories.data,
      skills: ["Python", "R", "SQL", "Power BI"],
    },
    {
      number: "02",
      title: t.bio.categories.ai,
      skills: ["N8N & Make", "APIs / Webhooks"],
    },
    {
      number: "03",
      title: t.bio.categories.dev,
      skills: ["Git / GitHub", "Obsidian", "Microsoft Office"],
    },
    {
      number: "04",
      title: t.bio.categories.prof,
      skills: ["Ingles C1"],
    },
  ];

  return (
    <Section id="bio" eyebrow={t.bio.eyebrow} title={t.bio.title}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-24">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-cyan/60">{category.number}</span>
                <div className="h-px flex-1 bg-gradient-to-r from-cyan/40 to-transparent" />
              </div>
              <h3 className="text-base font-semibold text-fg tracking-wide uppercase">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm px-4 py-2.5 rounded-full bg-electric/10 text-cyan border border-cyan/30 hover:border-cyan/70 hover:bg-electric/20 hover:scale-105 transition-all duration-300 cursor-default font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center mb-12">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/50" />
          <Quote className="w-6 h-6 text-cyan mx-4" strokeWidth={1.5} />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan/50" />
        </div>

        <blockquote className="text-center">
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-fg leading-relaxed font-light italic">
            &ldquo;{t.bio.manifesto}&rdquo;
          </p>

          <footer className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-cyan/40" />
            <cite className="text-sm uppercase tracking-[0.25em] text-cyan not-italic font-medium">
              Matias Bellido
            </cite>
            <div className="h-px w-12 bg-cyan/40" />
          </footer>
        </blockquote>
      </motion.div>
    </Section>
  );
}