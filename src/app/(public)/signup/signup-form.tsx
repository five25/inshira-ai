'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
   const router = useRouter()

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      router.push('/dashboard')
   }

   return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
         <Card>
            <CardHeader>
               <CardTitle className='text-2xl'>Sign Up</CardTitle>
               <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit}>
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
                     <Button type='submit' className='w-full'>
                        Sign Up
                     </Button>
                  </div>
                  <div className='mt-4 text-center text-sm'>
                     Have an account?{' '}
                     <a href='/login' className='underline underline-offset-4'>
                        Login
                     </a>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}
