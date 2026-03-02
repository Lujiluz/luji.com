"use client";

import Slide from "./text-slide";
import Picture1 from "@/public/images/image-1-generated.webp";
import Picture2 from "@/public/images/image-2-generated.webp";

export default function TextSlideContainer() {
  return (
    <main className="overflow-hidden w-full">
      <div className="md:h-[10vh]" />

      <div className="flex flex-col gap-2 md:gap-0">
        {/* Nggak perlu lagi passing 'progress' */}
        <Slide src={Picture1} left="-40%" direction="left" />
        <Slide src={Picture2} left="-25%" direction="right" />
        <Slide src={Picture1} left="-75%" direction="left" />
      </div>

      <div className="md:h-[15vh]" />
    </main>
  );
}
