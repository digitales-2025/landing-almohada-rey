"use client";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Variants } from "motion/react";
import Image from "next/image";
import React from "react";

interface FoggyHeroImageProps {
    className?: string;
    variants?: {
        container?: Variants;
        item?: Variants;
    };
    // preset?: string;
    // as?: React.ElementType;
    // asChild?: React.ElementType;
}

export const FoggyHeroImage = ({
    variants,
}: FoggyHeroImageProps) => {
    const defaultContainerTransitionVariants: {
        container: Variants;
    } = {
        container: {
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.75,
            },
          },
        },
    };
    const defaultItemTrasitionVariants: {
        item: Variants;
    } = {
        item: {
            hidden: {
                opacity: 0,
                filter: 'blur(12px)',
                y: 12,
            },
            visible: {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                transition: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: 1.5,
                },
            },
        },
    }

    const containerVariants = variants?.container ?? defaultContainerTransitionVariants.container;
    const itemVariants = variants?.item ?? defaultItemTrasitionVariants.item;
  return (
    <div className="mx-auto md:-mt-20 lg:-mt-40">
      <AnimatedGroup
        variants={
            {
                ...containerVariants,
                ...itemVariants,
            }
        }
      >
        <div className="-rotate-30 aspect-3/2 relative mx-auto lg:w-2/3">
          <div className="bg-linear-to-b to-background from-background absolute inset-0 via-transparent"></div>
          <div className="bg-linear-to-l to-background from-background absolute inset-0 via-transparent"></div>
          <Image
            src="https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Phone Background"
            width="6240"
            height="4160"
          />
        </div>
      </AnimatedGroup>
    </div>
  );
};
