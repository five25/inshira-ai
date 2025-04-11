import { TriangleAlert } from 'lucide-react'

export function NoRecordFound() {
   return (
      <div className='flex flex-col items-center justify-center gap-2 mt-6'>
         <TriangleAlert size={80} className='text-muted-foreground' />
         <h1 className='text-lg'>Nenhum registro encontrado</h1>
         <span className='text-muted-foreground text-sm'>Tente ajustar os filtros para ver mais resultados</span>
      </div>
   )
}
