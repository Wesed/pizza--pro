import { Input } from '@/components/ui/input'
import { Metadata } from 'next'
import { TableOrders } from './components/table'

export const metadata: Metadata = {
  title: 'Pedidos',
}

export default function Orders() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>
      <div className="space-y-2.5">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
        </form>

        <div className="rounded-md border">
          <TableOrders />
        </div>
      </div>
    </>
  )
}
