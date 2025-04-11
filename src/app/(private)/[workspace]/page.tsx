import Form from 'next/form'
import { headers } from 'next/headers'

import { BtHomeBack } from '@/components/shared/bt-home-back'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { WorkspaceForm } from './_components/workspace-form'
import logoutAction from '@/actions/auth/logout-action'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function WorkspacePage() {
   const header = await headers()
   const host = header.get('host')

   const session = await auth()
   const workspace = session?.user?.workspaces?.[0]?.name

   if (workspace) {
      redirect(`/${workspace}/dashboard`)
   }

   return (
      <div className='relative flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10'>
         <BtHomeBack />
         <div className='w-full max-w-md min-w-sm'>
            <div className='flex flex-col gap-6'>
               <Card>
                  <CardHeader>
                     <CardTitle className='text-2xl'>Workspace</CardTitle>
                     <CardDescription>Create your first Workspace</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <WorkspaceForm host={host} />
                  </CardContent>
               </Card>
            </div>
         </div>

         <div className='text-muted-foreground flex w-full items-center justify-center py-6 text-xs'>
            <ul className='flex items-center gap-x-4'>
               <li>© {new Date().getFullYear()} Inshira-ia</li>
               <li>
                  <a className='underline' href='/privacy'>
                     <span>Privacy Policy</span>
                  </a>
               </li>
               <li>
                  <a className='underline' href='/support'>
                     <span>Support</span>
                  </a>
               </li>
               <li className='underline'>
                  <Form action={logoutAction}>
                     <Button
                        variant='link'
                        className='inline-flex size-fit p-0 text-xs underline text-primary/80 hover:text-accent-foreground/50 whitespace-nowrap'
                     >
                        Sign out
                     </Button>
                  </Form>
               </li>
            </ul>
         </div>
      </div>
   )
}
