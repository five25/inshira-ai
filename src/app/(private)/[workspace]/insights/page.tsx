'use client'

import { useState } from 'react'
import { Main } from '@/components/shared/main'
import { Toolbar } from '../_components/toolbar'
import { NoRecordFound } from '../_components/no-record-found'

const timeframeLabel = [
   { label: 'Hoje', value: 'day' },
   { label: 'Semana', value: 'week' },
   { label: 'Mês', value: 'month' },
   { label: 'Custom', value: 'custom' }
]

export default function InsightsPage() {
   const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('week')
   return (
      <Main title='Insights'>
         <Toolbar timeframeLabel={timeframeLabel} timeframe={timeframe} setTimeframe={setTimeframe} />
         <NoRecordFound />
      </Main>
   )
}
