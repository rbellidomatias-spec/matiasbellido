"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "./Section";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const experience = [
  {
    period: "Abr 2024 - Actualidad",
    role: "Tutor Academico Particular",
    company: "Freelance - Autonomo",
    type: "Matematica & Estadistica",
    desc: "Coordino un staff de docentes que cubre demanda en niveles primario, secundario y universitario. Dicto clases avanzadas de Analisis Matematico, Algebra Lineal y Estadistica Descriptiva (UBA CBC y Primer Ano), traduciendo conceptos abstractos al ritmo de cada alumno.",
    tags: ["Liderazgo", "Docencia", "Gestion de equipo"],
  },
  {
    period: "Jun 2023 - Actualidad",
    role: "Personal Trainer & Wellness Coach",
    company: "Profesional Independiente",
    type: "Hibrido",
    desc: "Gestion integral de cartera de clientes con planificacion basada en datos. Diseno mesociclos ajustando volumen e intensidad segun KPIs fisicos semanales. Establezco metricas claras y monitoreo evolucion para garantizar adherencia y resultados.",
    tags: ["KPIs", "Planificacion estrategica", "Retencion"],
  },
  {
    period: "Dic 2024 - Nov 2025",
    role: "Customer Experience",
    company: "Arcos Dorados",
    type: "Jornada parcial - Presencial",
    desc: "Experiencia laboral intensiva en un entorno corporativo de altos estandares operativos. Ejecucion precisa de procesos estandarizados bajo metricas de tiempo y eficiencia, resolucion de problemas en momentos de alta demanda y coordinacion constante con el staff.",
    tags: ["Operaciones", "Trabajo en equipo", "Alta presion"],
  },
  {
    period: "Ago 2024 - Dic 2024",
    role: "Gerente de Desarrollo de Negocio",
    company: "SomeClub",
    type: "Jornada parcial - Hibrido",
    desc: "Rol enfocado en prospeccion estrategica y calificacion de leads para el equipo de ventas. Administracion y actualizacion de bases de datos en CRM, analisis de funnels (tasa de respuesta, agendamiento) y comunicacion B2B/B2C identificando puntos de dolor en clientes potenciales.",
    tags: ["CRM", "Analisis de funnels", "B2B/B2C"],
  },
  {
    period: "Feb 2024 - Abr 2024",
    role: "Consultor Comercial",
    company: "FIAT Argentina",
    type: "Jornada completa - Presencial",
    desc: "Gestion integral del ciclo de ventas y asesoramiento comercial en el sector automotriz, enfocado en cumplimiento de objetivos mensuales y satisfaccion del cliente. Cierre mediante tecnicas de negociacion consultiva y manejo de objeciones.",
    tags: ["Negociacion", "Sales", "KPIs comerciales"],
  },
  {
    period: "Ago 2023 - Dic 2023",
    role: "Asistente de Investigacion (Pasante)",
    company: "Fundacion Apolo",
    type: "Contrato de practicas - Presencial",
    desc: "Participacion en el programa ACAP del Gobierno de la Ciudad. Colaboracion en proyectos de transparencia institucional y politicas publicas: busqueda y sintesis de fuentes, soporte en organizacion de documentos y redaccion de resumenes ejecutivos.",
    tags: ["Investigacion", "Politicas publicas", "Research"],
  },
];

const education = [
  {
    period: "Abr 2023 - Oct 2028",
    institution: "Universidad de Buenos Aires",
    degree: "Actuario - Actuarial Science",
    desc: "Foco academico en Metodos Cuantitativos, Estadistica Matematica y Macroeconomia. Investigacion independiente en Data Science y aplicacion de algoritmos (Python/R) a modelos actuariales.",
    logo: "/projects/Imagenes/UBA.jpg",
  },
  {
    period: "Mar 2018 - Nov 2023",
    institution: "Colegio Santa Teresa de Jesus",
    degree: "Bachiller en Ciencias Sociales y Humanidades",
    desc: "Formacion humanista centrada en el pensamiento critico y la conciencia social. Voluntariado en TECHO, deportes y actividades de accion social.",
    logo: "/projects/Imagenes/STJ.png",
  },
];

const courses = [
  "Negociacion - Santander Open Academy",
  "Storytelling - Santander Open Academy",
  "Data Science Intro - Santander Open Academy",
  "Gestion Agile - Santander Open Academy",
  "Finanzas - FEMSA",
];

export default function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" eyebrow={t.experience.eyebrow} title={t.experience.title}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-5 h-5 text-cyan" />
            <h3 className="font-display text-base font-semibold uppercase tracking-[0.2em] text-fg">
              {t.experience.experienceTitle}
            </h3>
          </div>

          <div className="relative">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-cyan/60 via-cyan/30 to-transparent" />

            <div className="space-y-8">
              {experience.map((item, i) => (
                <motion.div
                  key={item.role + item.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-bg border-2 border-cyan flex items-center justify-center" style={{ background: "var(--bg)" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  </div>

                  <div className="glass rounded-xl p-5 hover:shadow-glow transition-all">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan/80 mb-2 font-mono">
                      {item.period}
                    </p>
                    <h4 className="font-display text-lg font-bold text-fg mb-1">
                      {item.role}
                    </h4>
                    <p className="text-sm text-cyan mb-1">{item.company}</p>
                    <p className="text-[11px] text-fg-muted uppercase tracking-wider mb-3">
                      {item.type}
                    </p>
                    <p className="text-sm text-fg-soft leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
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
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-5 h-5 text-cyan" />
            <h3 className="font-display text-base font-semibold uppercase tracking-[0.2em] text-fg">
              {t.experience.educationTitle}
            </h3>
          </div>

          <div className="space-y-6 mb-12">
            {education.map((item, i) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-6 hover:shadow-glow transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 relative w-20 h-20 rounded-2xl overflow-hidden bg-white border border-cyan/30">
                    <Image
                      src={item.logo}
                      alt={item.institution}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan/80 mb-2 font-mono">
                      {item.period}
                    </p>
                    <h4 className="font-display text-lg font-bold text-fg mb-1">
                      {item.institution}
                    </h4>
                    <p className="text-sm text-cyan mb-3">{item.degree}</p>
                    <p className="text-sm text-fg-soft leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-cyan" />
              <h3 className="font-display text-base font-semibold uppercase tracking-[0.2em] text-fg">
                {t.experience.coursesTitle}
              </h3>
            </div>

            <div className="glass rounded-xl p-6">
              <ul className="space-y-3">
                {courses.map((course, i) => (
                  <motion.li
                    key={course}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-fg-soft"
                  >
                    <div className="w-1 h-1 rounded-full bg-cyan shrink-0" />
                    {course}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}