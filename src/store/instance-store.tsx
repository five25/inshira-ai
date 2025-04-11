import { deleteInstanceAction } from '@/actions/instance/delete-instance-action'
import { findByWorkspaceAction } from '@/actions/instance/find-by-workspace-action'
import { qrCodeAction } from '@/actions/instance/qr-code-action'
import { create } from 'zustand'

type InstanceProps = {
   name: string
   profileName: string
   profilePicUrl: string
   status?: 'disconnected' | 'close' | 'connecting' | 'open' | undefined
   phone: string
   messages: number
   chats: number
   contacts: number
}

interface InstanceStoreProps {
   instance: InstanceProps | null
   workspace: string | null
   isLoading: boolean
   error: string | null
   qrcode: string | null
   getQrCode: (workspace: string) => Promise<void>
   findByWorkspace: (workspace: string) => Promise<void>
   deleteByWorkspace: (workspace: string) => Promise<void>
}

export const useInstanceStore = create<InstanceStoreProps>(set => ({
   instance: null,
   workspace: null,
   qrcode: null,
   isLoading: false,
   error: null,

   getQrCode: async (workspace: string) => {
      set({ isLoading: true, error: null })

      const formData = new FormData()
      formData.append('workspace', workspace)

      try {
         const res = await qrCodeAction(null, formData)

         if (res.success) {
            set({ qrcode: res.data.base64, workspace })
         } else {
            set({ error: res.message })
         }
      } catch (err) {
         set({ error: 'Erro ao buscar instância' })
      } finally {
         set({ isLoading: false })
      }
   },

   findByWorkspace: async (workspace: string) => {
      set({ isLoading: true, error: null })

      const formData = new FormData()
      formData.append('workspace', workspace)

      try {
         const res = await findByWorkspaceAction(null, formData)

         if (res.success) {
            set({ instance: res.instance, workspace })
         } else {
            set({ error: res.message })
         }
      } catch (err) {
         set({ error: 'Erro ao buscar instância' })
      } finally {
         set({ isLoading: false })
      }
   },

   deleteByWorkspace: async (workspace: string) => {
      set({ isLoading: true, error: null })

      const formData = new FormData()
      formData.append('workspace', workspace)

      try {
         const res = await deleteInstanceAction(null, formData)

         if (res.success) {
            set({ instance: null })
         } else {
            set({ error: res.message })
         }
      } catch (err) {
         set({ error: 'Erro ao buscar instância' })
      } finally {
         set({ isLoading: false })
      }
   }
}))
