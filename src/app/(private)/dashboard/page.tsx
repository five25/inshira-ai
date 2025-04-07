'use client'

import { useEffect, useState } from 'react'
import { SectionCards } from './_components/section-cards'
import { ChartAreaInteractive } from './_components/chart-area-interactive'
import { DataTable } from './_components/data-table'

import data from './data.json'
import { Main } from '@/components/shared/main'
import { Button } from '@/components/ui/button'
import { Toolbar } from '../_components/toolbar'
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from 'date-fns'

const timeframeLabel = [
   { label: 'Hoje', value: 'day' },
   { label: 'Semana', value: 'week' },
   { label: 'Mês', value: 'month' },
   { label: 'Custom', value: 'custom' }
]

// Sample data for different timeframes
const dailyData = [
   { name: '00h', value: 8, score: 72 },
   { name: '04h', value: 5, score: 75 },
   { name: '08h', value: 12, score: 78 },
   { name: '12h', value: 15, score: 82 },
   { name: '16h', value: 18, score: 85 },
   { name: '20h', value: 10, score: 80 }
]

const weeklyData = [
   { name: 'Seg', value: 24, score: 75 },
   { name: 'Ter', value: 32, score: 82 },
   { name: 'Qua', value: 28, score: 78 },
   { name: 'Qui', value: 35, score: 85 },
   { name: 'Sex', value: 42, score: 88 },
   { name: 'Sab', value: 22, score: 80 },
   { name: 'Dom', value: 18, score: 76 }
]

const monthlyData = [
   { name: 'Sem 1', value: 120, score: 75 },
   { name: 'Sem 2', value: 145, score: 78 },
   { name: 'Sem 3', value: 132, score: 82 },
   { name: 'Sem 4', value: 158, score: 85 }
]

export default function DashboardPage() {
   const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'custom'>('week')
   const [timeRange, setTimeRange] = useState('30d')
   const [conversationData, setConversationData] = useState(weeklyData)
   const [scoreData, setScoreData] = useState(weeklyData)
   const [dateRange, setDateRange] = useState({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date())
   })
   const [stats, setStats] = useState({
      conversations: 156,
      score: '78/100',
      users: 28,
      days: 22
   })

   useEffect(() => {
      // Update date range based on timeframe
      const now = new Date()
      let start: Date
      let end: Date
      let data = weeklyData // Set default data

      switch (timeframe) {
         case 'day':
            start = startOfDay(now)
            end = endOfDay(now)
            data = dailyData
            setStats({
               conversations: 68,
               score: '82/100',
               users: 15,
               days: 1
            })
            break
         case 'week':
            start = startOfWeek(now)
            end = endOfWeek(now)
            data = weeklyData
            setStats({
               conversations: 156,
               score: '78/100',
               users: 28,
               days: 7
            })
            break
         case 'month':
            start = startOfMonth(now)
            end = endOfMonth(now)
            data = monthlyData
            setStats({
               conversations: 555,
               score: '80/100',
               users: 42,
               days: 30
            })
            break
         case 'custom':
            start = dateRange.start
            end = dateRange.end
            data = conversationData
            setStats(stats)
         default:
            start = new Date()
            end = new Date()
            break
      }

      setDateRange({ start, end })
      setConversationData(data)
      setScoreData(data)
   }, [timeframe])

   return (
      <Main title='Dashboard'>
         <Toolbar timeframeLabel={timeframeLabel} timeframe={timeframe} setTimeframe={setTimeframe} />

         <div className='flex flex-col gap-2 md:gap-6 mt-4'>
            <SectionCards stats={stats} />
            <ChartAreaInteractive conversationData={conversationData} scoreData={scoreData} />
            {/* <DataTable data={data} /> */}
         </div>
         {/* <div className='flex flex-1 flex-col'>
            <div className='flex flex-1 flex-col gap-2'>
               <div className='flex flex-col gap-4 md:gap-6'>
                  <SectionCards />
                  <ChartAreaInteractive />
                  <div className='px-4 lg:px-6'></div>
                  <DataTable data={data} />
               </div>
            </div>
         </div> */}
      </Main>
   )
}
