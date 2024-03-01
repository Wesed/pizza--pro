'use client'

import { TableBody } from '@/components/ui/table'
import { OrderTableRow } from './order-table-row'
import { getOrders } from '@/api/get-orders'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'

export function OrderTableBody() {
  const searchParams = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    /* explicacao 
      por padrao, o react query nao recarrega os dados pq a key nao mudou,
      e por isso usa oq tem no cache. o pageIndex serve pra ele entender que
      nao e mais a mesma pagina. Assim, ele recarrega a proxima pagina
      e salva ambas no cache. 
      Ex: to na pag1, se for pra pag2, vai carregar, mas se voltar pra pag1,
      vai usar do cache 
    */
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  return (
    <TableBody>
      {result &&
        result.orders.map((order) => {
          return <OrderTableRow key={order.orderId} order={order} />
        })}
    </TableBody>
  )
}
