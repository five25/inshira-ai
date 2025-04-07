import { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type SelectFieldProps = ComponentProps<typeof Select> & {
   label: string
   name: string
   placeholder?: string
   itens: { label: string; value: string }[]
   containerClassName?: string
}

export const SelectField = ({
   label,
   name,
   required,
   placeholder,
   itens,
   containerClassName,
   ...props
}: SelectFieldProps) => {
   const { control } = useFormContext()

   return (
      <Controller
         control={control}
         name={name}
         render={({ field, fieldState }) => (
            <div className={cn('flex flex-col gap-1', containerClassName)}>
               <Label className='text-xs'>{label}</Label>
               <Select {...props} onValueChange={field.onChange} defaultValue={field?.value ?? 'active'}>
                  <SelectTrigger>
                     <SelectValue placeholder={placeholder}></SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                     {itens.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                           {item.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>

               {fieldState.error && <p className='text-red-500 text-sm'>{fieldState.error.message}</p>}
            </div>
         )}
      />
   )
}
