'use client'

import { useActionState } from 'react'
import Form from 'next/form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, TriangleAlert } from 'lucide-react'

import loginAction from '@/actions/auth/login-action'

export function LoginForm() {
   const [state, dispatch, isPending] = useActionState(loginAction, null)

   return (
      <Form action={dispatch}>
         {state?.success === false && (
            <Alert variant='destructive' className='mb-4'>
               <TriangleAlert className='h-4 w-4' />
               {/* <AlertTitle>Error!</AlertTitle> */}
               <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
         )}
         <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
               <Label htmlFor='email'>Email</Label>
               <Input id='email' name='email' type='email' placeholder='m@example.com' />
            </div>
            <div className='grid gap-2'>
               <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  {/* <a href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                     Forgot your password?
                  </a> */}
               </div>
               <Input id='password' name='password' type='password' placeholder='********' />
            </div>
            <Button type='submit' className='w-full' disabled={isPending}>
               {isPending && <Loader2 className='animate-spin' />}
               Login
            </Button>
            {/* <Button variant='outline' className='w-full'>
                  Login with Google
               </Button> */}
         </div>
         <div className='mt-4 text-center text-sm'>
            Don't have an account?{' '}
            <a href='/signup' className='underline underline-offset-4'>
               Sign up
            </a>
         </div>
      </Form>
   )
}
