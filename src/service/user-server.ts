import db from '@/lib/db'
import { compare } from 'bcrypt-ts'

type User = {
   name: string
   email: string
   password?: string
}

export async function findUserByCredentials(email: string, password: string): Promise<User | null> {
   const user = await db.user.findFirst({
      where: { email },
      include: {
         workspaces: true
      }
   })

   if (!user) return null

   const passwordMatch = await compare(password, user.password)

   if (!passwordMatch) return null

   return {
      name: user.name,
      email: user.email
   }
}
