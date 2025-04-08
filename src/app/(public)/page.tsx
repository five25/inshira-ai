import { auth } from '@/auth'

import { Cta } from './_components/cta'
import Features from './_components/features'
import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Hero } from './_components/hero'

export default async function Home() {
   const session = await auth()

   return (
      <div className='min-h-screen bg-gradient-to-b from-background to-secondary'>
         <Header session={session} />
         <Hero />
         <Features />
         <Cta />
         <Footer />
      </div>
   )
}
