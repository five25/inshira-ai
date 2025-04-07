'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DateRangePicker } from './date-range-picker'

interface timeframeLabelProps {
   label: string
   value: string
}

export function Toolbar({
   timeframeLabel,
   timeframe,
   setTimeframe
}: {
   timeframeLabel: timeframeLabelProps[]
   timeframe: string
   setTimeframe: (timeframe: any) => void
}) {
   const buildButtons = timeframeLabel.map(({ label, value }, index) => {
      const isActive = timeframe === value
      return (
         <div
            key={index}
            className={cn('pb-2 cursor-pointer', isActive && 'border-b-2 border-b-foreground')}
            onClick={() => setTimeframe(value)}
         >
            <Button variant='ghost' className={cn('text-muted-foreground', isActive && 'text-foreground')}>
               {label}
            </Button>
         </div>
      )
   })

   return (
      <div className='border-b flex gap-2'>
         <div className='hidden md:flex'>{buildButtons}</div>
         <DateRangePicker />
      </div>
   )
}
