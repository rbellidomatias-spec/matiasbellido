"use client";

import { Mail, MapPin, Linkedin, Github, MessageCircle, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="px-6 md:px-16 py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan mb-4">
          {t.footer.eyebrow}
        </p>

        <h2 className="font-display text-5xl md:text-7xl font-bold gradient-text mb-6">
          {t.footer.title}
        </h2>

        <p className="text-lg text-fg-soft max-w-xl mx-auto mb-10">
          {t.footer.desc}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
          <a
            href="mailto:rbellidomatias@gmail.com"
            className="glass rounded-xl p-5 flex items-center gap-4 text-left hover:shadow-glow transition-all group"
          >
            <Mail className="w-5 h-5 text-cyan shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-fg-muted">{t.footer.emailLabel}</p>
              <p className="text-sm truncate text-fg">rbellidomatias@gmail.com</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-fg-muted group-hover:text-cyan transition-all" />
          </a>

          <a
            href="https://www.google.com/maps/place/Buenos+Aires/@-34.615796,-58.5156997,12z/data=!3m1!4b1!4m6!3m5!1s0x95bcca3b4ef90cbd:0xa0b3812e88e88e87!8m2!3d-34.6036739!4d-58.3821215!16zL20vMDFseTVt"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 flex items-center gap-4 text-left hover:shadow-glow transition-all group"
          >
            <MapPin className="w-5 h-5 text-cyan shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-fg-muted">{t.footer.locationLabel}</p>
              <p className="text-sm text-fg">{t.footer.location}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-fg-muted group-hover:text-cyan transition-all" />
          </a>
        </div>

        <a
          href="mailto:rbellidomatias@gmail.com?subject=Colaboremos"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric text-white font-medium hover:shadow-glow-lg transition-all group"
        >
          <Mail className="w-5 h-5" />
          {t.footer.cta}
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>

        <div className="flex items-center justify-center gap-3 mt-10">
          <a
            href="https://www.linkedin.com/in/matiasbellido"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-3 rounded-full hover:text-cyan hover:shadow-glow transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/rbellidomatias-spec"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-3 rounded-full hover:text-cyan hover:shadow-glow transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/message/RRG5RHLSINR3M1"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-3 rounded-full hover:text-cyan hover:shadow-glow transition-all"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        <p className="text-xs text-fg-faint mt-12">
          (c) 2026 Matias Bellido - Optimizing Reality.
        </p>
      </div>
    </footer>
  );
}