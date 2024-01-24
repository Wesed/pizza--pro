'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInFormSchema = z.infer<typeof signInForm>

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { disabled, errors, isSubmitting },
  } = useForm<SignInFormSchema>()

  function handleSignIn(data: SignInFormSchema) {
    toast.success('Um link de login foi enviado para seu email.')
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Seu e-mail</Label>
        <Input id="email" type="email" {...register('email')} />
      </div>

      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting ? 'Acessando...' : 'Acessar painel'}
      </Button>
    </form>
  )
}
