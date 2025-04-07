import Link from 'next/link'

export function Logo() {
   return (
      <Link href='/' className='text-2xl font-bold text-zinc-900'>
         My<span className='text-amber-500'>APP</span>
      </Link>
   )
}
