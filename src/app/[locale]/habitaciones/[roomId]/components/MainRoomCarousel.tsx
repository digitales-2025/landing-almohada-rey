'use client';

import { useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { ImageRoomType } from '@/actions/rooms/room';
import {
    CarouselDotButton,
    useCarouselIndicator,
} from '@/components/customized/carousel/carousel-indicator';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type Props = {
    images: ImageRoomType[];
};

export const RoomCarousel = ({ images }: Props) => {
    const [api, setApi] = useState<CarouselApi>();
    const { selectedIndex, onDotButtonClick } = useCarouselIndicator(api);
    return (
        <div className="relative">
            <div className="w-full absolute -top-10 lg:-top-20 z-10 flex items-center justify-center h-fit gap-6">
                {images.map((image, index) => (
                    <CarouselDotButton
                        key={image.id}
                        onClick={() => onDotButtonClick(index)}
                        id={`carousel-dot-${image.id}`}
                        variant="outline"
                        className="lg:size-4"
                        selected={selectedIndex === index}
                    >
                        {/* {image.roomTypeId} */}
                        {/* {index + 1} */}
                    </CarouselDotButton>
                ))}
            </div>
            <Carousel
                setApi={setApi}
                opts={{
                    loop: true,
                    startIndex: 2,
                    dragFree: true,
                    containScroll: 'keepSnaps',
                    skipSnaps: false,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: true,
                        stopOnMouseEnter: true,
                    }),
                ]}
            >
                <CarouselContent className="gap-0">
                    {images.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/3 min-w-[120px] md:min-w-[200px] h-fit"
                        >
                            <img
                                className={cn(
                                    'aspect-17/14 object-cover object-center w-full',
                                    selectedIndex === index
                                        ? 'opacity-100'
                                        : 'opacity-50'
                                )}
                                src={image.imageUrl}
                                alt={image.roomTypeId}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};
