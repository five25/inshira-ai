import { auth } from '@/auth'
import { Main } from '@/components/shared/main'
import { WhatsappComponent } from './_components/whatsapp-page'

export default async function WhatsappPage() {
   const session = await auth()
   const workspace = session?.user?.workspaces?.[0]?.name

   return (
      <Main title='Whatsapp'>
         <WhatsappComponent workspace={workspace} />
      </Main>
   )
}
