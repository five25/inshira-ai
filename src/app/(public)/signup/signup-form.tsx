'use client'

import { useActionState } from 'react'
import Form from 'next/form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, TriangleAlert } from 'lucide-react'

import signupAction from '@/actions/auth/signup-action'

export function SignupForm() {
   const [state, dispatch, isPending] = useActionState(signupAction, null)

   return (
      <>
         {state?.success === false && (
            <Alert variant='destructive' className='mb-4'>
               <TriangleAlert className='h-4 w-4' />
               {/* <AlertTitle>Error!</AlertTitle> */}
               <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
         )}
         <Form action={dispatch}>
            <div className='flex flex-col gap-6'>
               <div className='grid gap-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' name='name' type='text' placeholder='seu nome' />
               </div>
               <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' name='email' type='email' placeholder='m@example.com' />
               </div>
               <div className='grid gap-2'>
                  <div className='flex items-center'>
                     <Label htmlFor='password'>Password</Label>
                  </div>
                  <Input id='password' name='password' type='password' placeholder='********' />
               </div>
               <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending && <Loader2 className='animate-spin' />}
                  Sign Up
               </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
               Have an account?{' '}
               <a href='/login' className='underline underline-offset-4'>
                  Login
               </a>
            </div>
         </Form>
      </>
   )
}
