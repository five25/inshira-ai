'use server'

import { auth } from '@/auth'
import axios from 'axios'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function qrCodeAction(_prevState: any, _formData: FormData) {
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
      // verificar se já tem a instancia criada
      let resp
      try {
         resp = await axios.get(`${EVOLUTION_API_URL}/instance/connect/${workspace}`, {
            headers: { apikey: EVOLUTION_API_SECRET }
         })
      } catch (e) {}

      // criar instancia na evolution caso não tenha
      if (!resp) {
         resp = await axios.post(
            `${EVOLUTION_API_URL}/instance/create`,
            {
               instanceName: workspace,
               qrcode: true,
               integration: 'WHATSAPP-BAILEYS'
            },
            { headers: { apikey: EVOLUTION_API_SECRET } }
         )
      }

      return { success: true, message: 'QR Code gerado com sucesso', data: resp.data }
   } catch (error) {
      if (isRedirectError(error)) throw error
      console.error(error)
      return { success: false, message: 'Ops, algum erro aconteceu!' }
   }
}
