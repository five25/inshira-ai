'use server'

import { hashSync } from 'bcrypt-ts'
import db from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function signupAction(_prevState: any, formData: FormData) {
   const entries = Array.from(formData.entries())
   const data = Object.fromEntries(entries) as { name: string; email: string; password: string }

   if (!data.name || !data.email || !data.password) {
      return {
         message: 'Preencha todos os campos',
         success: false
      }
   }

   // se um usuário com o mesmo email já existe
   const user = await db.user.findUnique({
      where: {
         email: data.email
      }
   })
   if (user) {
      return {
         message: 'Este usuário já existe',
         success: false
      }
   }

   await db.user.create({
      data: {
         name: data.name,
         email: data.email,
         password: hashSync(data.password)
      }
   })

   return redirect('/login')
}
