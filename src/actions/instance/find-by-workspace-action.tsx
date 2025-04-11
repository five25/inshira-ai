'use server'

import { auth } from '@/auth'
import axios from 'axios'
import { stat } from 'fs'

export async function findByWorkspaceAction(_prevState: any, formData: FormData) {
   const session = await auth()
   const user = session?.user

   if (!user) {
      return {
         message: 'Você precisa estar logado para conectar o Whatsapp',
         success: false
      }
   }

   const workspace = user?.workspaces?.find(w => w.name === formData.get('workspace'))?.name

   if (!workspace) {
      return {
         message: 'Workspace não existe',
         success: false
      }
   }

   const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL
   const EVOLUTION_API_SECRET = process.env.EVOLUTION_API_SECRET

   try {
      const { data } = await axios.get(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
         headers: { apikey: EVOLUTION_API_SECRET }
      })

      const instance = data.find((instance: any) => instance.name === workspace)

      if (!instance) return { success: true }

      const { name, profileName, connectionStatus, profilePicUrl, ownerJid, _count } = instance

      return {
         success: true,
         instance: {
            name,
            profileName,
            profilePicUrl,
            status: connectionStatus,
            phone: ownerJid?.split('@')[0],
            messages: _count.Message,
            chats: _count.Chat,
            contacts: _count.Contact
         }
      }
   } catch (error) {
      console.error(error)
      return { success: false, message: 'Ops, algum erro aconteceu!' }
   }
}
