import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import axios from 'axios'
import { MessageSquare, UserCircle2, Users } from 'lucide-react'

export async function Profile({ workspace }: { workspace: string }) {
   const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL
   const EVOLUTION_API_SECRET = process.env.EVOLUTION_API_SECRET

   const { data } = await axios.get(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
      headers: { apikey: EVOLUTION_API_SECRET }
   })

   const profile = data.find((instance: any) => instance.name === workspace)

   const { name, profileName, profilePicUrl, ownerJid, _count } = profile

   return (
      <Card className='backdrop-blur-sm shadow-xl'>
         <CardHeader className='flex flex-col sm:flex-row items-center gap-4 pb-2 overflow-hidden'>
            <Avatar className='w-32 h-32 border-4 border-primary'>
               <img src={profilePicUrl} alt={profileName || name} className='object-cover' />
            </Avatar>
            <div className='flex flex-col gap-2 items-center sm:items-start'>
               <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>{profileName || name}</h1>
               <p className='text-gray-500 dark:text-gray-400'>{ownerJid?.split('@')[0]}</p>
            </div>
         </CardHeader>
         <CardContent>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 overflow-hidden'>
               <StatCard
                  icon={<MessageSquare className='w-6 h-6 text-primary' />}
                  label='Mensagens'
                  value={_count.Message}
               />
               <StatCard icon={<Users className='w-6 h-6 text-primary' />} label='Grupos' value={_count.Chat} />
               <StatCard
                  icon={<UserCircle2 className='w-6 h-6 text-primary' />}
                  label='Contatos'
                  value={_count.Contact}
               />
            </div>
         </CardContent>
      </Card>
   )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
   return (
      <div className='flex flex-col items-center p-4 bg-muted rounded-lg'>
         {icon}
         <span className='mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100'>{value.toLocaleString()}</span>
         <span className='text-sm text-gray-500 dark:text-gray-400'>{label}</span>
      </div>
   )
}
