import Link from 'next/link'

import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'

export function Hero() {
   return (
      <FadeIn>
         <section className='container mx-auto px-4 py-24 text-center'>
            <h1 className='text-5xl font-bold tracking-tight sm:text-6xl mb-6'>
               Optimize Your WhatsApp Sales
               <span className='text-primary'> with AI Analysis</span>
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
               Get instant feedback on your sales conversations. Improve customer service and boost conversions with
               AI-powered insights.
            </p>
            <div className='flex justify-center gap-4'>
               <Link href='/signup'>
                  <Button size='lg' className='text-lg px-8'>
                     Start Free Trial
                  </Button>
               </Link>
               <Link href='#features'>
                  <Button size='lg' variant='outline' className='text-lg px-8'>
                     Learn More
                  </Button>
               </Link>
            </div>
         </section>
      </FadeIn>
   )
}
