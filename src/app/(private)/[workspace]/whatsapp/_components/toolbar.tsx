import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog'
import { RefreshCw, Smartphone } from 'lucide-react'
import { QRCodeForm } from './qr-code-form'
import { RefreshButton } from './refresh-button'
import { DisconnectButton } from './disconnecte-button'

export function Toolbar({ instance }: { instance: instance }) {
   const status = instance?.state || 'disconnected'

   const color = {
      connecting: 'bg-yellow-500',
      open: 'bg-green-500',
      disconnected: 'bg-red-500',
      close: 'bg-red-500'
   }

   const label = {
      connecting: 'Conectando...',
      open: 'Conectado',
      disconnected: 'Desconectado',
      close: 'Desconectado'
   }

   return (
      <div className='flex items-center justify-between'>
         <div className='flex items-center gap-2'>
            <div className={`w-2 h-2 rounded-full ${color[status]}`}></div>
            <span className='text-sm'>{label[status]}</span>
         </div>

         <div className='flex items-center gap-2'>
            <RefreshButton />

            {status === 'open' && <DisconnectButton />}

            <Dialog>
               <DialogTrigger asChild>
                  {status !== 'open' && (
                     <Button>
                        <Smartphone />
                        Conectar Whatsapp
                     </Button>
                  )}
               </DialogTrigger>
               <DialogContent className='w-sm'>
                  <DialogHeader>
                     <DialogTitle>Conectar Whatsapp</DialogTitle>
                     <DialogDescription>Conecte seu whatsapp para começar a análise</DialogDescription>
                  </DialogHeader>
                  <QRCodeForm />
               </DialogContent>
            </Dialog>
         </div>
      </div>
   )
}
