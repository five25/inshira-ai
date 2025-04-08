import { redirect } from 'next/navigation'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignupForm } from './signup-form'
import { auth } from '@/auth'
import { BtHomeBack } from '../_components/bt-home-back'

export default async function SignupPage() {
   const session = await auth()

   if (session) {
      return redirect('/dashboard')
   }

   return (
      <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
         <BtHomeBack />
         <div className='w-full max-w-sm'>
            <div className='flex flex-col gap-6'>
               <Card>
                  <CardHeader>
                     <CardTitle className='text-2xl'>Sign Up</CardTitle>
                     <CardDescription>Enter your email below to login to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <SignupForm />
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}
