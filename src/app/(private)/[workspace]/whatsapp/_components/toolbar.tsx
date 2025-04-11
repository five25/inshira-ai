import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog'
import { useInstanceStore } from '@/store/instance-store'
import { Loader2, RefreshCw, Smartphone } from 'lucide-react'
import Image from 'next/image'

export function Toolbar() {
   const { instance, workspace, isLoading, qrcode, getQrCode, findByWorkspace, deleteByWorkspace } = useInstanceStore()

   const status = instance?.status || 'disconnected'

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

   const handleGetQrCode = () => {
      workspace && getQrCode(workspace)
   }

   return (
      <div className='flex items-center justify-between'>
         <div className='flex items-center gap-2'>
            <div className={`w-2 h-2 rounded-full ${color[status]}`}></div>
            <span className='text-sm'>{label[status]}</span>
         </div>

         <div className='flex items-center gap-2'>
            <Button variant='outline' onClick={() => workspace && findByWorkspace(workspace)}>
               <RefreshCw />
            </Button>

            {status === 'open' && (
               <Button variant='destructive' onClick={() => workspace && deleteByWorkspace(workspace)}>
                  Desconectar
               </Button>
            )}

            <Dialog onOpenChange={() => qrcode && workspace && findByWorkspace(workspace)}>
               <DialogTrigger asChild>
                  {status !== 'open' && (
                     <Button onClick={handleGetQrCode}>
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

                  <div className='min-h-[200px] flex flex-col items-center justify-between'>
                     <div className='flex-1 flex items-center'>
                        {!qrcode || isLoading ? (
                           <Loader2 size={50} className='animate-spin' />
                        ) : (
                           <Image src={qrcode || ''} alt='qr-code' width={500} height={500} priority quality={100} />
                        )}
                     </div>

                     <Button disabled={!qrcode || isLoading} className='float-right mt-4' onClick={handleGetQrCode}>
                        {isLoading ? 'Atualizando Qr Code...' : 'Atualizar Qr Code'}
                     </Button>
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      </div>
   )
}
