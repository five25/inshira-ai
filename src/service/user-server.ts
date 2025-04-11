import db from '@/lib/db'
import { compare } from 'bcrypt-ts'

type AuthUser = {
   id: string
   name: string
   email: string
   password?: string
   workspaces?: {
      name: string
   }[]
}

export async function findUserByCredentials(email: string, password: string): Promise<AuthUser | null> {
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
