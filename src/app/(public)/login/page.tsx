import { redirect } from 'next/navigation'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from './login-form'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { BtHomeBack } from '../_components/bt-home-back'

export default async function Login() {
   const session = await auth()

   if (session) {
      return redirect('/dashboard')
   }

   return (
      <div className='relative flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
         <BtHomeBack />
         <div className='w-full max-w-sm'>
            <div className='flex flex-col gap-6'>
               <Card>
                  <CardHeader>
                     <CardTitle className='text-2xl'>Login</CardTitle>
                     <CardDescription>Enter your email below to login to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <LoginForm />
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}
