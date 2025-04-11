import { BtHomeBack } from '@/components/shared/bt-home-back'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function WorkspaceForm() {
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
                  <CardContent>{/* <LoginForm /> */}</CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}
