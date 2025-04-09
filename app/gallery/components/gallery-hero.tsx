"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface GalleryHeroProps {
  title: string;
  imageUrl: string;
}

export default function GalleryHero({ title, imageUrl }: GalleryHeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div
      ref={ref}
      className="relative h-[50vh] min-h-[400px] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <motion.h1
          className="text-white text-5xl md:text-7xl font-serif"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {title}
        </motion.h1>
      </div>
    </div>
  );
}
