import { FadeIn } from '@/components/animations/fade-in'
import { BarChart3, MessageSquareText, Shield } from 'lucide-react'

export default function Features() {
   return (
      <section id='features' className='container mx-auto px-4 py-24'>
         <FadeIn>
            <h2 className='text-3xl font-bold text-center mb-16'>Key Features</h2>
         </FadeIn>
         <div className='grid md:grid-cols-3 gap-8'>
            <FadeIn delay={0.2}>
               <div className='bg-card p-6 rounded-lg shadow-lg'>
                  <MessageSquareText className='h-12 w-12 text-primary mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>Conversation Analysis</h3>
                  <p className='text-muted-foreground'>
                     Real-time analysis of WhatsApp conversations to identify improvement areas and success patterns.
                  </p>
               </div>
            </FadeIn>
            <FadeIn delay={0.4}>
               <div className='bg-card p-6 rounded-lg shadow-lg'>
                  <BarChart3 className='h-12 w-12 text-primary mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>Performance Metrics</h3>
                  <p className='text-muted-foreground'>
                     Detailed analytics and insights about response times, conversion rates, and customer satisfaction.
                  </p>
               </div>
            </FadeIn>
            <FadeIn delay={0.6}>
               <div className='bg-card p-6 rounded-lg shadow-lg'>
                  <Shield className='h-12 w-12 text-primary mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>Secure & Private</h3>
                  <p className='text-muted-foreground'>
                     Enterprise-grade security ensuring your conversations and data remain private and protected.
                  </p>
               </div>
            </FadeIn>
         </div>
      </section>
   )
}
