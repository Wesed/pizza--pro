import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, X } from 'lucide-react'
import { OrderStatus } from './order-status'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { OrderDetails } from './order-details'
import { GetOrdersResponse } from '@/api/get-orders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/order-status/cancel-order'
import { approveOrder } from '@/api/order-status/approve-order'
import { deliverOrder } from '@/api/order-status/deliver-order'
import { dispatchOrder } from '@/api/order-status/dispatch-order'

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
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const orderListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    orderListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }
      /* 
        percorro todas as listas e altero o status dos 
        pedidos que possuem id igual ao selecionado.
      */
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  /* 
    qd cancela um pedido, e preciso refletir na interface e pra alterar o cache.
    Assim, ao inves de fazer toda a requisicao dnv, o reactQuery altera
    na cache dos pedidos ja carregados
  */
  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      /* 
      eu nao tenho apenas uma lista de pedidos, eu tenho uma lista pra
      cada pagina da minha tabela, formando um array de listas, e oq
      essas listas tem em comum e a key 'orders'
    */
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

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
        {order.status === 'pending' && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          // so pode cancelar um pedido se ele ainda nao saiu pra entrega
          disabled={
            !['pending', 'processing'].includes(status) || isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId })}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
