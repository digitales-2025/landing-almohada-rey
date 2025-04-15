'use client';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoLogoWhatsapp } from "react-icons/io";
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

export const KeepInTouchCTA = () => {
    const t = useTranslations('IndexPageExperiences');

    const schema = z.object({
        introductionComment: z.string().optional(),
    });

    const form = useForm({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        shouldUnregister: true,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        defaultValues: {
            introductionComment: undefined,
        },
    })
    return (
        <SectionWrapper id={t('keepInTouchSection.sectionName')}>
            <div className='bg-primary/5 p-6 lg:p-10 space-y-8'>
                <SectionHeader
                    headerTitle={{
                        text: t('keepInTouchSection.title').toUpperCase(),
                    }}
                    description={{
                        text: t('keepInTouchSection.caption'),
                    }}
                ></SectionHeader>
                <p className="text-base lg:text-lg text-secondary dark:text-secondary-foreground text-pretty text-center font-light">
                    {
                        t('keepInTouchSection.description')
                    }
                </p>
                <Form {...form}>
                    <form >
                        <div className='border border-secondary dark:border-secondary-foreground p-4 flex flex-col space-y-4 md:space-y-0 md:flex-row gap-4 md:justify-between items-end bg-white'>
                            <Textarea {...form.register('introductionComment', { required: true })} className="w-full border-none rounded-none focus:border-none ring-none active:ring-none focus:!ring-0 shadow-none text-wrap min-h-[3rem]" placeholder={t('keepInTouchSection.ctaInput.placeholder')} />
                            <Button size={'lg'} className="bg-secondary text-background py-6 px-8 flex gap-2 rounded-none hover:scale-105 transition-all w-full sm:w-fit"><IoLogoWhatsapp />  <span>{t('keepInTouchSection.ctaInput.buttonLabel')}</span></Button>
                        </div>
                    </form>
                </Form>
            </div>
        </SectionWrapper>
    );
};
