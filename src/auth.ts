import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import db from './lib/db'
import { compare } from 'bcrypt-ts'

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         credentials: {
            id: {},
            email: {},
            password: {}
         },
         authorize: async credentials => {
            const email = credentials.email as string
            const password = credentials.password as string

            const user = await db.user.findFirst({
               where: { email }
            })

            if (!user) return null

            const passwordMatch = await compare(password, user.password)

            if (!passwordMatch) return null

            return {
               id: user.id,
               name: user.name,
               email: user.email
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
