'use client'

import { useEffect } from 'react'

import Loading from '@/components/shared/loading'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useInstanceStore } from '@/store/instance-store'
import { TriangleAlert } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { Toolbar } from './toolbar'
import { Profile } from './profile'

export function WhatsappComponent({ workspace }: { workspace: string | undefined }) {
   const { instance, isLoading, error, findByWorkspace } = useInstanceStore()

   useEffect(() => {
      if (workspace) findByWorkspace(workspace)
   }, [])

   return (
      <>
         <Loading isLoading={isLoading} />
         {error ? (
            <Alert variant='destructive' className='mb-4'>
               <TriangleAlert className='h-4 w-4' />
               <AlertDescription>{error}</AlertDescription>
            </Alert>
         ) : (
            <div>
               <Toolbar />

               {instance?.status === 'open' && (
                  <div className='mt-6'>
                     <Profile />
                  </div>
               )}

               {instance?.status !== 'open' && (
                  <div className='flex flex-col items-center justify-center h-full mt-6 gap-4'>
                     <FaWhatsapp size={80} className='text-muted-foreground' />
                     <h1>Conecte seu whatsapp para começar a análise</h1>
                  </div>
               )}
            </div>
         )}
      </>
   )
}
