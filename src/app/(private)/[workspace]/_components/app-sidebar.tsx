'use client'

import Link from 'next/link'

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarTrigger
} from '@/components/ui/sidebar'
import {
   Banknote,
   Bot,
   Cable,
   CalendarCheck2,
   ChartSpline,
   CircleDollarSign,
   FileSliders,
   Folder,
   GalleryHorizontalEnd,
   GalleryVerticalEnd,
   LayoutDashboard,
   MessageSquareText,
   Settings,
   SquareChartGantt,
   User,
   UserRoundPen
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

import { NavUser } from './nav-user'
import { Logo } from '@/components/shared/logo'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

const data = {
   user: {
      name: 'Fabrício Lima',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg'
   },
   navMain: [
      {
         title: 'Painel',
         url: '#',
         items: [
            {
               title: 'Dashboard',
               url: '/dashboard',
               icon: LayoutDashboard
            },
            {
               title: 'Insights',
               url: '/insights',
               icon: ChartSpline
            },
            {
               title: 'Messagens',
               url: '/messages',
               icon: MessageSquareText
            },
            {
               title: 'Whatsapp',
               url: '/whatsapp',
               icon: FaWhatsapp
            }
         ]
      },
      {
         title: 'Configurações',
         url: '#',
         items: [
            {
               title: 'Perfil',
               url: '/settings/profile',
               icon: UserRoundPen
            },
            {
               title: 'Planos',
               url: '/settings/plans',
               icon: Banknote
            }
         ]
      }
   ]
}

type SidebarProps = React.ComponentProps<typeof Sidebar> & {
   session: Session
}

export function AppSidebar({ session, ...props }: SidebarProps) {
   const pathName = usePathname()

   return (
      <Sidebar collapsible='icon' {...props}>
         <SidebarHeader className='flex flex-row items-center justify-between gap-1'>
            <SidebarMenuButton size='lg' asChild>
               <Link href='/' className='flex items-center gap-2'>
                  {/* <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                     <SquareChartGantt size={30} />
                  </div>
                  <div className='text-2xl font-bold text-zinc-900'>
                     My<span className='text-amber-500'>APP</span>
                  </div> */}
                  <div className='flex items-center space-x-2'>
                     <Bot className='h-8 w-8 text-primary' />
                     <span className='text-2xl font-bold'>InshiraAI</span>
                  </div>
               </Link>
            </SidebarMenuButton>
         </SidebarHeader>
         <SidebarContent>
            {data.navMain.map(item => (
               <SidebarGroup key={item.title}>
                  <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                     <SidebarMenu>
                        {item.items.map(item => (
                           <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton asChild tooltip={item.title} isActive={pathName === item.url}>
                                 <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                 </Link>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        ))}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            ))}
         </SidebarContent>
         <SidebarFooter>
            <NavUser session={session} />
         </SidebarFooter>
      </Sidebar>
   )
}
