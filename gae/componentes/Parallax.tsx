"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  image: string;
  text?: string;
  height?: string;
  className?: string;
}

const getRatio = (el: HTMLElement) =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

export const Parallax = ({
  image,
  text,
  height = "100vh",
  className = "",
}: ParallaxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const bg = section.querySelector(".bg");
      
      // Determine if this is likely the first section (Hero)
      // If the top of the section is at 0, we treat it as the first section
      const rect = section.getBoundingClientRect();
      const isFirst = rect.top === 0;

      gsap.fromTo(
        bg,
        {
          backgroundPosition: () =>
            isFirst
              ? "50% 0px"
              : `50% ${-window.innerHeight * getRatio(section)}px`,
        },
        {
          backgroundPosition: () =>
            `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (isFirst ? "top top" : "top bottom"),
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [image, height] }
  );

  return (
    <div
      className={`hidden xl:block w-full m-0 bg-[#6a8faa] font-['Euclid_Circular_A','Poppins'] ${className}`}
      ref={containerRef}
    >
      <div
        ref={sectionRef}
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height }}
      >
        <div
          className="bg absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat brightness-[0.68]"
          style={{ backgroundImage: `url(${image})` }}
        />
        {text && (
          <h1 className="text-white z-10 text-[3em] font-normal [text-shadow:_1px_1px_3px_black]">
            {text}
          </h1>
        )}
      </div>
    </div>
  );
};
