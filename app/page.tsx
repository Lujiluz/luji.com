import Header from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
