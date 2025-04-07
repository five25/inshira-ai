'use client'

import { Calendar, MessageSquare, TrendingDownIcon, TrendingUp, TrendingUpIcon, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

interface StatCardProps {
   title: string
   value: string | number
   icon: React.ReactNode
   trend?: string
   trendUp?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
   const trendIco = trendUp ? <TrendingUpIcon className='size-3' /> : <TrendingDownIcon className='size-3' />
   const trendColor = trendUp ? 'text-green-500' : 'text-red-500'
   const trendText = trendUp ? `+${trend}` : `-${trend}`

   return (
      <Card className='@container/card'>
         <CardHeader className='relative'>
            <CardDescription>{title}</CardDescription>
            <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>{value}</CardTitle>
            <div className='absolute right-4 top-4'>
               {icon}
               {/* <Badge variant='outline' className={`flex gap-1 rounded-lg text-xs ${trendColor}`}>
                  {trendIco}
                  {trendText}
               </Badge> */}
            </div>
         </CardHeader>
         {trend && (
            <CardFooter className='flex-col items-start gap-1 text-sm'>
               <div className='line-clamp-1 flex gap-2 font-medium flex items-center justify-between'>
                  {trendText} em relação ao mês anterior
                  <Badge variant='outline' className={`flex gap-1 rounded-lg text-xs ${trendColor}`}>
                     {trendIco}
                     {trendText}
                  </Badge>
                  {/* Trending up this month <TrendingUpIcon className='size-4' /> */}
               </div>
               {/* <div className='text-muted-foreground'>Visitors for the last 6 months</div> */}
            </CardFooter>
         )}
      </Card>
   )
}

interface SectionCardsProps {
   stats: {
      conversations: number
      score: string
      users: number
      days: number
   }
}

export function SectionCards({ stats }: SectionCardsProps) {
   return (
      <div className='*:data-[slot=card]:shadow-xs md:grid-cols-2 xl:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
         <StatCard
            title='Conversas Analisadas'
            value={stats.conversations}
            icon={<MessageSquare size={24} className='text-indigo-600 dark:text-indigo-400' />}
            trend='12%'
            trendUp={true}
         />
         <StatCard
            title='Score Médio'
            value={stats.score}
            icon={<TrendingUp size={24} className='text-indigo-600 dark:text-indigo-400' />}
            trend='5%'
            trendUp={true}
         />
         <StatCard
            title='Usuários Ativos'
            value={stats.users}
            icon={<Users size={24} className='text-indigo-600 dark:text-indigo-400' />}
            trend='3%'
            trendUp={false}
         />
         <StatCard
            title='Dias Ativos'
            value={stats.days}
            icon={<Calendar size={24} className='text-indigo-600 dark:text-indigo-400' />}
         />
      </div>
   )
}
