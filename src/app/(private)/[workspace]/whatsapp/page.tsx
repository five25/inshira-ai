import { FaWhatsapp } from 'react-icons/fa'
import { Main } from '@/components/shared/main'
import { Toolbar } from './_components/toolbar'
import axios from 'axios'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { cn } from '@/lib/utils'
import { QRCodeForm } from './_components/qr-code-form'
import { Profile } from './_components/profile'

export default async function WhatsappPage() {
   const session = await auth()
   const workspace = session?.user?.workspaces?.[0]?.name

   if (!workspace) {
      redirect('/workspace')
   }

   const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL
   const EVOLUTION_API_SECRET = process.env.EVOLUTION_API_SECRET

   let instance: instance = {}

   try {
      const { data } = await axios.get(`${EVOLUTION_API_URL}/instance/connectionState/${workspace}`, {
         headers: { apikey: EVOLUTION_API_SECRET }
      })

      instance = data.instance
   } catch (error) {}

   return (
      <Main title='Whatsapp'>
         <Toolbar instance={instance} />

         <div className='mt-6'>{instance?.state === 'open' && <Profile workspace={workspace} />}</div>

         {instance?.state !== 'open' && (
            <div className='flex flex-col items-center justify-center h-full mt-6 gap-4'>
               <FaWhatsapp size={80} className='text-muted-foreground' />
               <h1>Conecte seu whatsapp para começar a análise</h1>
            </div>
         )}
      </Main>
   )
}
