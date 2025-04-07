import { Button } from '@/components/ui/button'
import { Smartphone } from 'lucide-react'
import { VscCircleFilled } from 'react-icons/vsc'

export function Toolbar() {
   return (
      <div className='flex items-center justify-between'>
         <div className='flex items-center gap-2'>
            <VscCircleFilled color='red-500' size={20} />
            <span className='text-sm'>Desconectado</span>
         </div>

         <Button>
            <Smartphone />
            Conectar Whatsapp
         </Button>
      </div>
   )
}
