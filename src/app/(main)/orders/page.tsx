import { Metadata } from 'next'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderTableFilters } from './components/order-table-filters'
import { OrderTableBody } from './components/order-table-body'
import { Pagination } from './components/pagination'

export const metadata: Metadata = {
  title: 'Pedidos',
}

export default function Orders() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
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
              <OrderTableBody />
            </Table>
          </div>
          <Pagination />
        </div>
      </div>
    </>
  )
}
