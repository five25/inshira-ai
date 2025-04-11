'use client'

import { useState } from 'react'
import { Main } from '@/components/shared/main'
import { NoRecordFound } from '../_components/no-record-found'
import { Toolbar } from '../_components/toolbar'

const timeframeLabel = [
   { label: 'Hoje', value: 'day' },
   { label: 'Semana', value: 'week' },
   { label: 'Mês', value: 'month' },
   { label: 'Custom', value: 'custom' }
]

export default function MensagensPage() {
   const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('week')

   return (
      <Main title='Mensagens'>
         <Toolbar timeframeLabel={timeframeLabel} timeframe={timeframe} setTimeframe={setTimeframe} />
         <NoRecordFound />
      </Main>
   )
}
