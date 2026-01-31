import Contact from "@/components/portfolio/Contact";
import Experience from "@/components/portfolio/Experience";
import Footer from "@/components/portfolio/Footer";
import Header from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import Writing from "@/components/portfolio/Writings";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
