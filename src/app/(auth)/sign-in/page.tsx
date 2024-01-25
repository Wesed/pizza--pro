import { Metadata } from 'next'
import { Form } from './components/form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign-in',
}

export default function SignIn() {
  return (
    <div className="p-8">
      {/* usa react slot, o link possui as mesmas propriedades que o btn, e o btn atua como link */}
      <Button variant="outline" asChild className="absolute right-8 top-8">
        <Link href="/sign-up">Novo estabelecimento</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-s text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <Form />
      </div>
    </div>
  )
}
