import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
   const session = await auth()

   if (!session) {
      redirect('/login')
   }

   return (
      <SidebarProvider>
         <AppSidebar variant='inset' session={session} />
         <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
   )
}
