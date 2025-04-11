import { Loader2 } from 'lucide-react'

export default function Loading({ isLoading }: { isLoading: boolean }) {
   return (
      isLoading && (
         <div className='fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50'>
            <div className='flex flex-col gao-2 items-center p-6 rounded-2xl shadow-xl text-center text-lg font-semibold'>
               <Loader2 size={30} className='animate-spin mr-2' />
               Carregando...
            </div>
         </div>
      )
   )
}
