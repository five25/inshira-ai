'use client'

import Form from 'next/form'
import { useActionState } from 'react'

import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription } from '../ui/alert'

type FormSubmitProps = {
   children:
      | React.ReactNode
      | ((isPending: boolean, state: { message: string; success: boolean } | null) => React.ReactNode)
   handleAction: (
      _prevState: any,
      formData: FormData
   ) => Promise<{
      message: string
      success: boolean
   }>
}

export function FormSubmit2({ children, handleAction }: FormSubmitProps) {
   const [state, dispatch, isPending] = useActionState(handleAction, null)

   const prevChildren = typeof children === 'function' ? children(isPending, state) : children

   return (
      <>
         {state?.success === false && (
            <Alert variant='destructive' className='mb-4'>
               <TriangleAlert className='h-4 w-4' />
               <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
         )}
         <Form action={dispatch}>{prevChildren}</Form>
      </>
   )
}
