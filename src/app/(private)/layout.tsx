import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { User } from 'next-auth'

// type userProps = User & {
//    workspaces?: {
//       name: string
//    }[]
// }

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
   const session = await auth()

   if (!session?.user) {
      redirect('/login')
   }

   const workspace = session?.user?.workspaces?.[0]?.name

   return workspace ? (
      <SidebarProvider>
         <AppSidebar variant='inset' session={session} workspace={workspace} />
         <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
   ) : (
      children
   )
}
