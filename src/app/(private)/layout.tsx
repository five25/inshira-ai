import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar variant='inset' />
         <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
   )
}
