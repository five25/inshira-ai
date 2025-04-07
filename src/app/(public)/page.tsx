import { Button } from '@/components/ui/button'
import { Cta } from './_components/cta'
import Features from './_components/features'
import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Hero } from './_components/hero'

export default function Home() {
   return (
      <div className='min-h-screen bg-gradient-to-b from-background to-secondary'>
         <Header />
         <Hero />
         <Features />
         <Cta />
         <Footer />
      </div>
   )
}
