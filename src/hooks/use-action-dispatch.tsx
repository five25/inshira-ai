'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { TriangleAlert } from 'lucide-react'
import Form from 'next/form'
import { useActionState, useTransition } from 'react'

export function useActionDispatch(action: (prevState: any, formData: FormData) => Promise<any>) {
   const [state, dispatch] = useActionState(action, null)
   const [isPending, startTransition] = useTransition()

   const handleDispatch = (formData: FormData) => {
      startTransition(() => {
         dispatch(formData)
      })
   }

   const FormNext = ({ children }: { children: React.ReactNode }) => (
      <Form action={handleDispatch}>
         {state?.success === false && (
            <Alert variant='destructive' className='mb-4'>
               <TriangleAlert className='h-4 w-4' />
               <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
         )}
         {children}
      </Form>
   )

   return [state, handleDispatch, isPending, FormNext]
}
