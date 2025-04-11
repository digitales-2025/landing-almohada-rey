import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import { Mail, SendHorizonal } from "lucide-react";
import { Variants } from "motion/react";
import React from "react";

interface AnimatedInputCTAProps {
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  // preset?: string;
  // as?: React.ElementType;
  // asChild?: React.ElementType;
}

export const AnimatedInputCTA = ({ variants }: AnimatedInputCTAProps) => {
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
        filter: "blur(12px)",
        y: 12,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.3,
          duration: 1.5,
        },
      },
    },
  };
  return (
    <AnimatedGroup
      variants={{
        container:
          variants?.container ?? defaultContainerTransitionVariants.container,
        item: variants?.item ?? defaultItemTrasitionVariants.item,
      }}
      className="mt-12"
    >
      <form action="" className="mx-auto max-w-sm">
        <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.5rem)] border pr-2 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
          <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4" />

          <input
            placeholder="Your mail address"
            className="h-12 w-full bg-transparent pl-12 focus:outline-none"
            type="email"
          />

          <div className="md:pr-1.5 lg:pr-0">
            <Button
              aria-label="submit"
              size="sm"
              className="rounded-(--radius)"
            >
              <span className="hidden md:block">Get Started</span>
              <SendHorizonal
                className="relative mx-auto size-5 md:hidden"
                strokeWidth={2}
              />
            </Button>
          </div>
        </div>
      </form>
    </AnimatedGroup>
  );
};
