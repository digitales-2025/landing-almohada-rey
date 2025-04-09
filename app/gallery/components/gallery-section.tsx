"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GallerySectionProps {
  title: string;
  description?: string;
  images: GalleryImage[];
  rightAligned?: boolean;
  fullWidth?: boolean;
}

export default function GallerySection({
  title,
  description,
  images,
  rightAligned = false,
  fullWidth = false,
}: GallerySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className={`py-16 px-4 md:px-8 ${rightAligned ? "bg-gray-50" : "bg-white"}`}>
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`flex flex-col ${rightAligned ? "md:flex-row-reverse" : "md:flex-row"} gap-8`}
        >
          <div className={`${fullWidth ? "w-full" : "md:w-1/2"}`}>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`
                    overflow-hidden rounded-lg shadow-md
                    ${index === 0 && images.length > 1 ? "md:col-span-2" : ""}
                    ${fullWidth ? "md:col-span-2" : ""}
                  `}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className={`${fullWidth ? "w-full" : "md:w-1/2"} flex flex-col justify-center`}>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif mb-4">
              {title}
            </motion.h2>
            {description && (
              <motion.p variants={itemVariants} className="text-gray-600 mb-6">
                {description}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
