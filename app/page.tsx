import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen grid-bg overflow-hidden">
      <Header />
      <div className="relative z-10">
        <Hero />
        <Bio />
        <Experience />
        <Projects />
        <Footer />
      </div>
    </main>
  );
}