import { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

type InputFieldProps = ComponentProps<typeof Input> & {
   label: string
   name: string
   containerClassName?: string
}

export const InputField = ({ label, name, required, containerClassName, ...props }: InputFieldProps) => {
   const { control } = useFormContext()

   return (
      <Controller
         control={control}
         name={name}
         // rules={{
         //    required: required && 'Campo obrigatório'
         // }}
         render={({ field, fieldState }) => (
            <div className={cn('flex flex-col gap-1', containerClassName)}>
               <Label className='text-xs'>{label}</Label>
               <Input required {...props} {...field} />
               {fieldState.error && <p className='text-red-500 text-sm'>{fieldState.error.message}</p>}
            </div>
         )}
      />
   )
}
