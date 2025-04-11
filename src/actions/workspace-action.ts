'use server'

import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import db from '@/lib/db'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function createWorkspaceAction(_prevState: any, formData: FormData) {
   const entries = Array.from(formData.entries())
   const data = Object.fromEntries(entries) as { name: string; slug: string }

   const session = await auth()
   const user = session?.user

   if (!user) {
      return {
         message: 'Você precisa estar logado para criar um workspace',
         success: false
      }
   }

   if (!data.name || !data.slug) {
      return { success: false, message: 'Nome e Url são obrigatórios' }
   }

   try {
      const workspace = await db.workspace.findUnique({
         where: {
            slug: data.slug
         }
      })
      if (workspace) {
         return {
            message: `Já exite um worspace com a URL ${data.slug}`,
            success: false
         }
      }

      await db.workspace.create({
         data: {
            name: data.name,
            slug: data.slug,
            ownerId: user?.id || ''
         }
      })

      return redirect(`/${data.name}/dashboard`)
   } catch (error) {
      if (isRedirectError(error)) throw error
      console.error(error)
      return { success: false, message: 'Ops, algum erro aconteceu!' }
   }
}
