"use client";

import { Mail, MapPin, Linkedin, Github, Phone, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=rbellidomatias@gmail.com&su=Colaboremos";

const GMAIL_BASIC_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=rbellidomatias@gmail.com";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="px-6 md:px-16 py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan mb-4">
          {t.footer.eyebrow}
        </p>

        <h2 className="font-display text-5xl md:text-7xl font-bold gradient-text mb-6">
          {t.footer.title}
        </h2>

        <p className="text-xl text-fg-soft max-w-xl mx-auto mb-10 leading-relaxed">
          {t.footer.desc}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
          <a
            href={GMAIL_BASIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 flex items-center gap-4 text-left hover:shadow-glow transition-all group"
          >
            <Mail className="w-5 h-5 text-cyan shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wider text-fg-muted">{t.footer.emailLabel}</p>
              <p className="text-base truncate text-fg">rbellidomatias@gmail.com</p>
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
              <p className="text-xs uppercase tracking-wider text-fg-muted">{t.footer.locationLabel}</p>
              <p className="text-base text-fg">{t.footer.location}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-fg-muted group-hover:text-cyan transition-all" />
          </a>
        </div>

        <a
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric text-white font-medium text-base hover:shadow-glow-lg transition-all group"
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
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/rbellidomatias-spec"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-3 rounded-full hover:text-cyan hover:shadow-glow transition-all"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/message/RRG5RHLSINR3M1"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-3 rounded-full hover:text-cyan hover:shadow-glow transition-all"
            aria-label="WhatsApp"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <p className="text-sm text-fg-faint mt-12">
          Portfolio - Matías Rodrigo Bellido
        </p>
      </div>
    </footer>
  );
}