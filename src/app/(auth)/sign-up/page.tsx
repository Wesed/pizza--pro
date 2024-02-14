import { Metadata } from 'next'
import { Form } from './components/form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign-up',
}

export default function SignUp() {
  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link href="/sign-in">Fazer login</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta grátis
          </h1>
          <p className="text-s text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

        <Form />
      </div>
    </div>
  )
}
