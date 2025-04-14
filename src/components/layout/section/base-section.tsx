import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'

interface BaseSectionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children: React.ReactNode,
  imageProps?: NextImageProps,
}

export const SectionWrapper = ({children, className, imageProps, ...rest}: BaseSectionProps) => {
  return (
    <section className={cn("relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-50 2xl:px-54 !space-y-4 sm:!space-y-6 md:!space-y-8 lg:!space-y-14", className)} {...rest}>
      {/* <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"></div */}
        {
            imageProps && (
                <figure className="absolute inset-0 -z-20 to-transparent">
                    <Image 
                        src={imageProps.src}
                        alt={imageProps.alt}
                        quality={imageProps.quality}
                        fill={imageProps.fill}
                        className={cn(
                            "object-cover w-full h-full",
                            imageProps.className ?? "")}
                        priority={imageProps.priority}
                        loading={imageProps.loading}
                        placeholder={imageProps.placeholder}
                        blurDataURL={imageProps.blurDataURL}
                        unoptimized={imageProps.unoptimized}
                    />
                </figure>
            )
        }
        {children}
        {/* <div className='max-w-[calc(100vw-2rem)]'>{children}</div> */}
    </section>
  )
}
