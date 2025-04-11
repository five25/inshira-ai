'use client'

import { deleteInstanceAction } from '@/actions/instance/delete-instance-action'
import { Button } from '@/components/ui/button'
import { Loader2, Smartphone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useTransition } from 'react'

export function DisconnectButton() {
   const { refresh } = useRouter()
   const [state, dispatch] = useActionState(deleteInstanceAction, null)
   const [isPending, startTransition] = useTransition()

   const handleDisconnect = () => {
      startTransition(() => {
         dispatch(new FormData())
      })
   }

   useEffect(() => {
      if (state?.success) refresh()
   }, [state])

   return (
      <Button variant='destructive' disabled={isPending} onClick={handleDisconnect}>
         {isPending ? <Loader2 className='animate-spin' /> : <Smartphone />}
         {isPending ? 'Desconectando...' : 'Desconectar'}
      </Button>
   )
}
