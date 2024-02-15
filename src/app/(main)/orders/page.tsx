import { Input } from '@/components/ui/input'
import { Metadata } from 'next'
import { OrderTableRow } from './components/order-table-row'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OrderTableFilters } from './components/order-table-filters'

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
        <OrderTableFilters />

        <div className="rounded-md border">
          <Table className="border border-muted">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <OrderTableRow
                    key={i}
                    id="821e78f7asdhdf128h"
                    timeOrder={15}
                    status="pendente"
                    clientName="Marcio Ferreira da Silva"
                    totalOrder={'149,90'}
                  />
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
