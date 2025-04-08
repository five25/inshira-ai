'use client'

import { useEffect, useState } from 'react'
import { Bot } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, useScroll } from 'framer-motion'

export function Header({ session }: { session: any }) {
   const { scrollY } = useScroll()
   const [isScrolled, setIsScrolled] = useState(false)

   useEffect(() => {
      const unsubscribe = scrollY.onChange(latest => {
         setIsScrolled(latest > 0)
      })
      return () => unsubscribe()
   }, [scrollY])

   return (
      <motion.header
         className='fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200'
         animate={{
            backgroundColor: isScrolled ? 'hsl(var(--background)/0.8)' : 'hsl(var(--background)/1)',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            borderColor: isScrolled ? '#ffffff1a' : 'transparent'
         }}
      >
         <nav className='container mx-auto px-4 py-4'>
            <div className='flex items-center justify-between'>
               <div className='flex items-center space-x-2'>
                  <Bot className='h-8 w-8 text-primary' />
                  <span className='text-2xl font-bold'>InshiraAI</span>
               </div>
               <div className='flex items-center space-x-4'>
                  {session && (
                     <Link href='/dashboard'>
                        <Button>Acessar conta</Button>
                     </Link>
                  )}
                  {!session && (
                     <Link href='/login'>
                        <Button variant='ghost'>Login</Button>
                     </Link>
                  )}
                  {!session && (
                     <Link href='/signup'>
                        <Button>Get Started</Button>
                     </Link>
                  )}
               </div>
            </div>
         </nav>
      </motion.header>
   )
}
