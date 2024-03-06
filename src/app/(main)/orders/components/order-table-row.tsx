import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, X } from 'lucide-react'
import { OrderStatus } from './order-status'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { OrderDetails } from './order-details'
import { CancelButton } from './cancel-button'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const { orderId, createdAt, status, customerName, total } = order
  return (
    <TableRow>
      <TableCell>
        <OrderDetails orderId={order.orderId} />
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">
        {total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <CancelButton status={order.status} id={order.orderId} />
      </TableCell>
    </TableRow>
  )
}
