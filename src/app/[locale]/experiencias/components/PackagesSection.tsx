import { SectionWrapper } from '@/components/layout/section/base-section'
import { SectionHeader } from '@/components/layout/section/section-header'
import React from 'react'

export const PackagesSection = () => {
  return (
    <SectionWrapper>
        <SectionHeader
            alignment='center'
            headerTitle={{
                text:'Eventos',
            }}
            description={{
                text: 'Celebra momentos especiales en nuestra sala de conferencias',
            }}
        ></SectionHeader>

    </SectionWrapper>
  )
}
