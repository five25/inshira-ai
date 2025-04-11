'use client'

import Form from 'next/form'
import { ChangeEvent, useActionState, useState } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, TriangleAlert, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { createWorkspaceAction } from '@/actions/workspace-action'

function slugify(text: string) {
   return text
      .toLowerCase()
      .replace(/\s+/g, '-') // espaços → hífen
      .replace(/[^a-z0-9-_]/g, '') // mantém letras, números, _ e -
      .replace(/-+/g, '-') // remove múltiplos hífens
}

export function WorkspaceForm({ host }: { host: string | null }) {
   const [state, dispatch, isPending] = useActionState(createWorkspaceAction, null)

   const [name, setName] = useState('')
   const [slug, setSlug] = useState('')
   const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

   function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
      const input = e.target.value
      setName(input)

      // só atualiza o slug se o usuário ainda não começou a editar manualmente
      if (!slugManuallyEdited) {
         const newSlug = slugify(input)
         setSlug(newSlug)
      }
   }

   function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
      const input = e.target.value
      setSlug(slugify(input))
      setSlugManuallyEdited(true)
   }

   return (
      <>
         {state?.success === false && (
            <Alert variant='destructive' className='mb-4'>
               <TriangleAlert className='h-4 w-4' />
               <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
         )}
         <Form action={dispatch} className='flex flex-col gap-y-4 animate-fade-in'>
            <div className='flex items-start gap-x-4'>
               <div
                  className='border-border hover:bg-muted bg-os-background-100 relative flex size-[4.5rem] max-h-[4.5rem] max-w-[4.5rem] cursor-pointer 
                              items-center justify-center rounded-md border transition-colors overflow-hidden'
               >
                  <Upload />
                  <input type='file' className='hidden' />
               </div>
               <div className='grid gap-y-2'>
                  <span className='text-xs'>Image</span>
                  <div className='flex items-center gap-x-2'>
                     <Button type='button'>
                        <Upload />
                        Upload image
                     </Button>
                     <Button type='button' disabled>
                        Remove
                     </Button>
                  </div>
                  <p className='text-muted-foreground text-[11px]'>
                     *.png, *.jpeg files up to 2MB at least 400px by 400px
                  </p>
               </div>
            </div>

            <div className='flex flex-col gap-6'>
               <div className='grid gap-2'>
                  <Label htmlFor='name'>Workspace name</Label>
                  <Input
                     id='name'
                     name='name'
                     type='text'
                     placeholder='eg: My Workspace'
                     value={name}
                     onChange={handleNameChange}
                  />
               </div>
            </div>

            <div className='flex flex-col gap-6'>
               <div className='grid gap-2'>
                  <Label htmlFor='slug'>Workspace URL</Label>
                  <div className='flex'>
                     <div
                        className='border-input bg-muted text-muted-foreground inline-flex items-center rounded-l-md border border-r-0 
                                    px-3 text-sm lowercase select-none z-1'
                     >
                        {host}/
                     </div>
                     <Input
                        id='slug'
                        name='slug'
                        type='text'
                        placeholder='eg: my-workspace'
                        value={slug}
                        onChange={handleSlugChange}
                        className='ml-[-5px]'
                     />
                  </div>
               </div>
            </div>

            <Button className='mt-4' disabled={isPending}>
               {isPending && <Loader2 className='animate-spin' />}
               Create Workspace
            </Button>
         </Form>
      </>
   )
}
