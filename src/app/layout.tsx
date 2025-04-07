import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/shared/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'InshiraAI - AI-Powered WhatsApp Conversation Analysis',
   description: 'Improve your sales performance with AI-powered WhatsApp conversation analysis'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en' suppressHydrationWarning>
         <body className={inter.className} cz-shortcut-listen='false'>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
               {children}
            </ThemeProvider>
         </body>
      </html>
   )
}
