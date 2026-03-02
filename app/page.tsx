import dynamic from "next/dynamic";
import SplashScreen from "@/components/ui/splash-screen";
import { Hero } from "@/components/portfolio/Hero";
import Header from "@/components/portfolio/Header";
import { SplashProvider } from "@/contexts/SplashContext";

const TextSlideContainer = dynamic(() => import("@/components/ui/text-slide-container"));
const Projects = dynamic(() => import("@/components/portfolio/Projects"));
const Skills = dynamic(() => import("@/components/portfolio/Skills"));
const Experience = dynamic(() => import("@/components/portfolio/Experience"));
const Writing = dynamic(() => import("@/components/portfolio/Writings"));
const Contact = dynamic(() => import("@/components/portfolio/Contact"));
const Footer = dynamic(() => import("@/components/portfolio/Footer"));

export default function Home() {
  return (
    <SplashProvider>
      <SplashScreen />
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
    </SplashProvider>
  );
}
