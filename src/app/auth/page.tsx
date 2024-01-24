import { Form } from './components/form'

export default function Auth() {
  return (
    <div className="p-8">
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
