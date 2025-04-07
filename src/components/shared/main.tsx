import { ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/shared/theme-toggle'

export function Main({ children, title, actions }: { children: ReactNode; title: string; actions?: ReactNode }) {
   return (
      <div>
         <header
            className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 bg-background z-10 rounded-t-xl
               flex h-12 shrink-0 items-center px-4 py-2 md:p-6 gap-2 border-b transition-[width,height] ease-linear'
         >
            <div className='flex h-full w-full items-center justify-between gap-1'>
               <div className='flex w-full items-center gap-1'>
                  <SidebarTrigger className='-ml-1' />
                  <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
                  <h1 className='text-base font-medium'>{title}</h1>
               </div>
               <div className='flex items-center gap-2'>
                  {actions}
                  <ThemeToggle />
               </div>
            </div>
         </header>

         <main className='flex-1 py-4 px-6'>{children}</main>
      </div>
   )
}
