'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function RefreshButton() {
   const { refresh } = useRouter()

   const [isPending, startTransition] = useState(false)

   const handleRefresh = () => {
      startTransition(true)

      setTimeout(() => {
         refresh()
         startTransition(false)
      }, 1000)
   }

   return (
      <Button variant='outline' onClick={handleRefresh} disabled={isPending}>
         <RefreshCw className={cn(isPending && 'animate-spin')} />
      </Button>
   )
}
