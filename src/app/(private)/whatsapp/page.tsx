import { FaWhatsapp } from 'react-icons/fa'
import { Main } from '@/components/shared/main'
import { Toolbar } from './_components/toolbar'

export default function WhatsappPage() {
   return (
      <Main title='Whatsapp'>
         <Toolbar />

         <div className='flex flex-col items-center justify-center h-full mt-6 gap-4'>
            <FaWhatsapp size={80} className='text-muted-foreground' />
            <h1>Conecte seu whatsapp para começar a análise</h1>
         </div>
      </Main>
   )
}
