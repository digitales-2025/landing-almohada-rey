import { cn } from "@/lib/utils";
import React from "react";

interface BaseHeroWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const BaseHeroWrapper = ({ children, className, ...rest }: BaseHeroWrapperProps) => {
  return (
    <div  className={cn("relative h-fit mx-auto px-6 pt-32 lg:pb-16 lg:pt-48", className)} {...rest}>

      <div className="relative z-10 mx-auto text-center text-wrap">
        {children}
      </div>
    </div>
  );
};
