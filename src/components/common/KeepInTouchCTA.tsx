'use client';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { Button } from '@/components/ui/button';
import { Form, FormMessage } from '@/components/ui/form';
import React, { useTransition } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoLogoWhatsapp } from 'react-icons/io';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface KeepInTouchCTAProps {
    className?: string;
    children?: React.ReactNode;
}

export const KeepInTouchCTA = ({ className, children }: KeepInTouchCTAProps) => {
    const whatssAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const whatssAppBaseUrl = process.env.NEXT_PUBLIC_BASE_WHATSSAPP_URL;
    const t = useTranslations('KeepInTouchSection');
    const [isPending, startTransition] = useTransition();

    const schema = z.object({
        introductionComment: z
            .string()
            .min(10, { message: t('ctaInput.minErrorMessage', { min: '10' }) })
            .max(500, {
                message: t('ctaInput.maxErrorMessage', { max: '500' }),
            }),
    });

    const form = useForm({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        shouldUnregister: true,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        defaultValues: {
            introductionComment: '',
        },
    });

    const errors = form.formState.errors;

    const onSubmit = async (data: z.infer<typeof schema>) => {
        // Usamos startTransition para indicar que esta acción puede llevar tiempo
        startTransition(() => {
            try {
                if (!whatssAppNumber) {
                    toast.error(t('ctaInput.generalErrorMessage'));
                    return;
                }

                const { introductionComment } = data;
                const message = encodeURIComponent(introductionComment);
                const url = `${whatssAppBaseUrl}?phone=${whatssAppNumber}&text=${message}`;

                // Abrir WhatsApp en una nueva pestaña
                window.open(url, '_blank', 'noopener,noreferrer');

                // Mostrar confirmación y reiniciar formulario
                toast.success(t('ctaInput.successMessage'));
                form.reset();
            } catch (error) {
                toast.error(t('ctaInput.generalErrorMessage'));
            }
        });
    };

    const onError = (errors: FieldErrors<z.infer<typeof schema>>) => {
        if (errors.introductionComment) {
            toast.error(errors.introductionComment.message);
        }
    };

    return (
        <SectionWrapper id={t('sectionName')} className={className}>
            { children }
            <div className="bg-primary/5 p-6 lg:p-10 space-y-8">
                <SectionHeader
                    headerTitle={{
                        text: t('title').toUpperCase(),
                    }}
                    description={{
                        text: t('caption'),
                    }}
                ></SectionHeader>
                <p className="text-base lg:text-lg text-secondary dark:text-secondary-foreground text-pretty text-center font-light">
                    {t('description')}
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="w-full flex flex-col gap-4"
                    >
                        <div className="border border-secondary dark:border-secondary-foreground p-4 flex flex-col space-y-4 md:space-y-0 md:flex-row gap-4 md:justify-between items-end bg-white">
                            <Textarea
                                {...form.register('introductionComment', {
                                    required: true,
                                })}
                                className="w-full border-none rounded-none focus:border-none ring-none active:ring-none focus:!ring-0 shadow-none text-wrap min-h-[3rem]"
                                placeholder={t('ctaInput.placeholder')}
                            />
                            <Button
                                disabled={isPending}
                                type="submit"
                                size={'lg'}
                                className="cursor-pointer bg-secondary text-background py-6 px-8 flex gap-2 rounded-none hover:scale-105 transition-all w-full sm:w-fit"
                            >
                                <IoLogoWhatsapp />{' '}
                                <span>{t('ctaInput.buttonLabel')}</span>
                            </Button>
                        </div>
                        {errors.introductionComment?.message && (
                            <FormMessage className="text-destructive">
                                {errors.introductionComment.message}
                            </FormMessage>
                        )}
                    </form>
                </Form>
            </div>
        </SectionWrapper>
    );
};
