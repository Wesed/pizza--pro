'use client'

import { TableBody } from '@/components/ui/table'
import { OrderTableRow } from './order-table-row'
import { getOrders } from '@/api/get-orders'
import { useQuery } from '@tanstack/react-query'

export function OrderTableBody() {
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
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
