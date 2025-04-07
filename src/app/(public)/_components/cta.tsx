import Link from 'next/link'

import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'

export function Cta() {
   return (
      <FadeIn>
         <section className='container mx-auto px-4 py-24'>
            <div className='bg-primary text-primary-foreground rounded-2xl p-12 text-center'>
               <h2 className='text-3xl font-bold mb-4'>Ready to Transform Your Sales Process?</h2>
               <p className='text-xl mb-8 opacity-90'>
                  Join thousands of sales professionals using WhatsAI to improve their performance.
               </p>
               <Link href='/signup'>
                  <Button size='lg' variant='secondary' className='text-lg px-8'>
                     Start Your Free Trial
                  </Button>
               </Link>
            </div>
         </section>
      </FadeIn>
   )
}
