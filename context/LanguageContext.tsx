"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "es" | "en";

type Dict = {
  nav: {
    home: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    desc: string;
    ctaProjects: string;
    ctaAbout: string;
  };
  bio: {
    eyebrow: string;
    title: string;
    categories: {
      data: string;
      ai: string;
      dev: string;
      prof: string;
    };
    manifesto: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    experienceTitle: string;
    educationTitle: string;
    coursesTitle: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    symbiosis: {
      status: string;
      building: string;
      clickHint: string;
      meta: string;
      title: string;
      desc: string;
    };
    modal: {
      title: string;
      desc: string;
      placeholder: string;
      button: string;
    };
  };
  footer: {
    eyebrow: string;
    title: string;
    desc: string;
    emailLabel: string;
    locationLabel: string;
    location: string;
    cta: string;
  };
};

export const translations: Record<Lang, Dict> = {
  es: {
    nav: {
      home: "Inicio",
      skills: "Habilidades",
      experience: "Experiencia",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      badge: "Actuario & Data Scientist",
      titleLine1: "Hola! Soy",
      titleLine2: "Matias Bellido",
      desc: "Soy estudiante de Actuario y autodidacta en Data Science, enfocado en cerrar la brecha entre el analisis teorico y la ejecucion practica. Me mueve la curiosidad por emprender proyectos que desafien lo convencional y el deseo constante de aprender. Creo en la capacidad de transformar problemas complejos en soluciones humanas y funcionales que tengan un impacto real.",
      ctaProjects: "Ver Proyectos",
      ctaAbout: "Sobre mi",
    },
    bio: {
      eyebrow: "Matias Rodrigo Bellido",
      title: "Habilidades",
      categories: {
        data: "Data & Analytics",
        ai: "AI & Automation",
        dev: "Development & Tools",
        prof: "Professional",
      },
      manifesto:
        "Creo que la teoria solo cobra sentido cuando se convierte en una solucion. Soy estudiante de Actuario y autodidacta en Data Science porque me apasiona entender el por que de las cosas, y me motiva mucho mas construir el como. Mi enfoque es simple: combinar el rigor estadistico con distintas herramientas para que los datos dejen de ser ruido y pasen a ser decisiones estrategicas.",
    },
    experience: {
      eyebrow: "Journey",
      title: "Experiencia & Educacion",
      experienceTitle: "Experiencia",
      educationTitle: "Educacion",
      coursesTitle: "Formacion Complementaria",
    },
    projects: {
      eyebrow: "Work",
      title: "Proyectos",
      symbiosis: {
        status: "Status",
        building: "Building",
        clickHint: "Click para recibir novedades",
        meta: "2025 - En desarrollo - Flagship",
        title: "Symbiosis AI",
        desc: "Nace de una investigacion propia: encueste a 100+ estudiantes universitarios en CABA y detecte el Execution Gap - la brecha entre saber y hacer. Symbiosis es un sistema de agentes de IA que cierra esa brecha: traduce objetivos en acciones concretas, monitorea cumplimiento y ajusta el plan en tiempo real.",
      },
      modal: {
        title: "Quiero ser parte",
        desc: "Symbiosis AI esta en construccion. Dejame tu email y te aviso cuando lance.",
        placeholder: "tu@email.com",
        button: "Avisarme",
      },
    },
    footer: {
      eyebrow: "Contacto",
      title: "Colaboremos",
      desc: "Abierto a oportunidades en Data, Finanzas y proyectos de IA aplicada.",
      emailLabel: "Email",
      locationLabel: "Ubicacion",
      location: "CABA, Argentina",
      cta: "Colaboremos - Enviar Email",
    },
  },
  en: {
    nav: {
      home: "Home",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Actuary & Data Scientist",
      titleLine1: "Hi! I'm",
      titleLine2: "Matias Bellido",
      desc: "I'm an Actuarial student and self-taught Data Scientist, focused on bridging the gap between theoretical analysis and practical execution. Driven by curiosity to take on unconventional projects and a constant desire to learn. I believe in transforming complex problems into human, functional solutions that create real impact.",
      ctaProjects: "View Projects",
      ctaAbout: "About me",
    },
    bio: {
      eyebrow: "Matias Rodrigo Bellido",
      title: "Skills",
      categories: {
        data: "Data & Analytics",
        ai: "AI & Automation",
        dev: "Development & Tools",
        prof: "Professional",
      },
      manifesto:
        "I believe theory only makes sense when it turns into a solution. I'm an Actuarial student and self-taught Data Scientist because I'm passionate about understanding the why of things, and even more motivated to build the how. My approach is simple: combine statistical rigor with different tools so that data stops being noise and becomes strategic decisions.",
    },
    experience: {
      eyebrow: "Journey",
      title: "Experience & Education",
      experienceTitle: "Experience",
      educationTitle: "Education",
      coursesTitle: "Complementary Training",
    },
    projects: {
      eyebrow: "Work",
      title: "Projects",
      symbiosis: {
        status: "Status",
        building: "Building",
        clickHint: "Click to receive updates",
        meta: "2025 - In development - Flagship",
        title: "Symbiosis AI",
        desc: "Born from original research: I surveyed 100+ university students in Buenos Aires and identified the Execution Gap - the distance between knowing and doing. Symbiosis is an AI agent system that closes that gap: it translates goals into concrete actions, monitors compliance, and adjusts the plan in real time.",
      },
      modal: {
        title: "I want in",
        desc: "Symbiosis AI is under construction. Drop your email and I'll let you know when it launches.",
        placeholder: "you@email.com",
        button: "Notify me",
      },
    },
    footer: {
      eyebrow: "Contact",
      title: "Let's Collaborate",
      desc: "Open to opportunities in Data, Finance, and applied AI projects.",
      emailLabel: "Email",
      locationLabel: "Location",
      location: "Buenos Aires, Argentina",
      cta: "Let's Collaborate - Send Email",
    },
  },
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "es" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);