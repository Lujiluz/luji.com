import dynamic from "next/dynamic";
import { Hero } from "@/components/portfolio/Hero";
import Header from "@/components/portfolio/Header";

// lazy loading
const TextSlideContainer = dynamic(() => import("@/components/ui/text-slide-container"));
const Projects = dynamic(() => import("@/components/portfolio/Projects"));
const Skills = dynamic(() => import("@/components/portfolio/Skills"));
const Experience = dynamic(() => import("@/components/portfolio/Experience"));
const Writing = dynamic(() => import("@/components/portfolio/Writings"));
const Contact = dynamic(() => import("@/components/portfolio/Contact"));
const Footer = dynamic(() => import("@/components/portfolio/Footer"));

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TextSlideContainer />
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
