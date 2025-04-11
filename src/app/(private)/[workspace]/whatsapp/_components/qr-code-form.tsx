'use client'

import Image from 'next/image'
import { useActionState, useEffect, useState, useTransition } from 'react'

import { qrCodeAction } from '@/actions/instance/qr-code-action'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function QRCodeForm() {
   const { refresh } = useRouter()
   const [state, dispatch] = useActionState(qrCodeAction, null)
   const [isPending, startTransition] = useTransition()

   const [qrCode, setQrCode] = useState()

   const handleDispatch = () => {
      startTransition(() => {
         dispatch(new FormData())
      })
   }

   useEffect(() => {
      if (!qrCode) handleDispatch()
      state?.data && setQrCode(state.data.base64)

      return () => {
         refresh()
      }
   }, [state])

   return (
      <div className='min-h-[200px] flex flex-col items-center justify-between'>
         <div className='flex-1 flex items-center'>
            {!qrCode || isPending ? (
               <Loader2 size={50} className='animate-spin' />
            ) : (
               <Image src={qrCode} alt='qr-code' width={500} height={500} priority quality={100} />
            )}
         </div>

         <Button disabled={!qrCode || isPending} className='float-right mt-4' onClick={handleDispatch}>
            {isPending ? 'Atualizando Qr Code...' : 'Atualizar Qr Code'}
         </Button>
      </div>
   )
}
