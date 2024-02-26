'use client'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'


const signInForm = z.object({
  email: z.string().email(),
})

type SignInFormSchema = z.infer<typeof signInForm>

export function Form() {
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { disabled, errors, isSubmitting },
  } = useForm<SignInFormSchema>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate} = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInFormSchema) {
    try {
      await authenticate({ email: data.email })
      toast.success('Um link de login foi enviado para seu email.')
    } catch {
      toast.error('Credenciais inválidas, o email está incorreto ou não está cadastrado.')
    }
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
