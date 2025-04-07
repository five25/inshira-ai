import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
   id: number
   name: string
   email: string
   avatar: string
}

interface AuthState {
   user: User | null
   token: string | null
   loading: boolean
   error: string | null
   clearError: () => void
   login: ({ email, password }: { email: string; password: string }) => Promise<boolean>
   register: ({
      name,
      fone,
      email,
      password
   }: {
      name: string
      fone: string
      email: string
      password: string
   }) => Promise<boolean>
   logout: () => void
}

export const useAuthStore = create<AuthState>()(
   persist(
      set => ({
         user: null,
         token: null,
         loading: false,
         error: null,

         clearError: () => set({ error: null }),

         login: async ({ email, password }) => {
            set({ loading: true, error: null })

            try {
               const {
                  data: { user, token }
               } = await axios.post('/api/v1/auth/login', { email, password })

               set({ user, token, loading: false })
               return true
            } catch (error: any) {
               set({ error: error.response.data.error, loading: false })
               return false
            }
         },

         register: async ({ name, fone, email, password }) => {
            set({ loading: true, error: null })

            try {
               await axios.post('/api/v1/auth/register', { name, fone, email, password })

               set({ loading: false })
               return true
            } catch (error: any) {
               set({ error: error.response.data.error, loading: false })
               return false
            }
         },

         logout: () => set({ user: null, token: null, error: null })
      }),
      { name: 'auth-storage' }
   )
)
