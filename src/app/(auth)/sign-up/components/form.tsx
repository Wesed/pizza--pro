'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpForm = z.object({
  storeName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpFormSchema = z.infer<typeof signUpForm>

export function Form() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { disabled, errors, isSubmitting },
  } = useForm<SignUpFormSchema>()

  function handleSignUp(data: SignUpFormSchema) {
    try {
      console.log(data)
      toast.success('Estabelecimento cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => router.push('/sign-in'),
        },
      })
    } catch {
      toast.error('Ocorreu um erro ao cadastrar o estabelecimento.')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="storeName">Nome do estabelecimento</Label>
        <Input id="storeName" type="text" {...register('storeName')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="managerName">Seu nome</Label>
        <Input
          id="managerName"
          type="managerName"
          {...register('managerName')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Seu e-mail</Label>
        <Input id="email" type="email" {...register('email')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Telefone</Label>
        <Input id="phone" type="tel" {...register('phone')} />
      </div>

      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting ? 'Cadastrando...' : 'Finalizar cadastro'}
      </Button>

      <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
        Ao continuar, você concorda com nossos{' '}
        <a href="" className="underline underline-offset-4">
          termos de serviço
        </a>{' '}
        e{' '}
        <a href="" className="underline underline-offset-4">
          políticas de privacidade
        </a>
      </p>
    </form>
  )
}
