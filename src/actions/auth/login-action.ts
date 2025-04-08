'use server'

import { signIn } from '@/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export default async function loginAction(_prevState: any, formData: FormData) {
   const entries = Array.from(formData.entries())
   const data = Object.fromEntries(entries) as { name: string; email: string; password: string }

   if (!data.email || !data.password) {
      return { success: false, message: 'Preencha todos os campos' }
   }

   try {
      await signIn('credentials', {
         email: data.email,
         password: data.password,
         redirect: true,
         redirectTo: '/dashboard'
      })
   } catch (error: any) {
      if (isRedirectError(error)) throw error

      if (error.type === 'CredentialsSignin') {
         return { success: false, message: 'Dados de login incorretos' }
      }
      return { success: false, message: 'Ops, algum erro aconteceu!' }
   }
}
