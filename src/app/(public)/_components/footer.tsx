import Link from 'next/link'
import { Bot } from 'lucide-react'

export function Footer() {
   return (
      <footer className='container mx-auto px-4 py-12'>
         <div className='flex flex-col md:flex-row justify-between items-center border-t pt-8'>
            <div className='flex items-center space-x-2 mb-4 md:mb-0'>
               <Bot className='h-6 w-6 text-primary' />
               <span className='font-semibold'>InshiraAI</span>
            </div>
            <div className='flex space-x-6 text-sm text-muted-foreground'>
               <Link href='/privacy'>Privacy Policy</Link>
               <Link href='/terms'>Terms of Service</Link>
               <Link href='/contact'>Contact</Link>
            </div>
         </div>
      </footer>
   )
}
