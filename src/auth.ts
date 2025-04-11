import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { findUserByCredentials } from './service/user-server'
import db from './lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         credentials: {
            id: {},
            email: {},
            password: {}
         },
         authorize: async credentials => {
            const user = await findUserByCredentials(credentials.email as string, credentials.password as string)
            if (!user) return null

            return {
               id: user.id,
               email: user.email,
               name: user.name
            }
         }
      })
   ],
   callbacks: {
      async session({ session, token }) {
         const { user } = session

         const workspaces = await db.workspace.findMany({
            where: { ownerId: user?.id },
            select: { name: true },
            orderBy: { createdAt: 'desc' }
         })

         return {
            ...session,
            user: {
               ...user,
               id: token.sub,
               workspaces
            }
         }
      }
   }
})
