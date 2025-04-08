import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function BtHomeBack() {
   return (
      <Link href='/'>
         <Button className='absolute left-3 top-3' variant='ghost'>
            <ArrowLeft />
            <span>Voltar para a home</span>
         </Button>
      </Link>
   )
}
