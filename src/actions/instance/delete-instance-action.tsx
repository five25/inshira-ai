'use server'

import { auth } from '@/auth'
import axios from 'axios'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function deleteInstanceAction(_prevState: any, _formData: FormData) {
   const session = await auth()
   const user = session?.user

   if (!user) {
      return {
         message: 'Você precisa estar logado para conectar o Whatsapp',
         success: false
      }
   }

   const workspace = user?.workspaces?.[0]?.name

   if (!workspace) {
      return {
         message: 'Workspace não existe',
         success: false
      }
   }

   const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL
   const EVOLUTION_API_SECRET = process.env.EVOLUTION_API_SECRET

   try {
      // logout instance
      await axios.delete(`${EVOLUTION_API_URL}/instance/logout/${workspace}`, {
         headers: { apikey: EVOLUTION_API_SECRET }
      })

      //  delete instance
      await axios.delete(`${EVOLUTION_API_URL}/instance/delete/${workspace}`, {
         headers: { apikey: EVOLUTION_API_SECRET }
      })

      return { success: true, message: 'Whatsapp deletado com sucesso!' }
   } catch (error) {
      if (isRedirectError(error)) throw error
      console.error(error)
      return { success: false, message: 'Ops, algum erro aconteceu!' }
   }
}
