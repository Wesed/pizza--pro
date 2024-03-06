'use client'

import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { cancelOrder } from '@/api/cancel-order'
import { GetOrdersResponse } from '@/api/get-orders'

interface CancelButtonProps {
  status: string
  id: string
}

export function CancelButton({ status, id }: CancelButtonProps) {
  const queryClient = useQueryClient()

  /* 
    qd cancela um pedido, e preciso refletir na interface e pra alterar o cache.
    Assim, ao inves de fazer toda a requisicao dnv, o reactQuery altera
    na cache dos pedidos ja carregados
  */
  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    /* 
      eu nao tenho apenas uma lista de pedidos, eu tenho uma lista pra
      cada pagina da minha tabela, formando um array de listas, e oq
      essas listas tem em comum e a key 'orders'
    */
    async onSuccess(_, { orderId }) {
      const orderListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      orderListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return
        }
        /* 
          percorro todas as listas e altero o status pra 'canceled' dos 
          pedidos que possuem id igual ao cancelado.
        */
        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: 'canceled',
              }
            }
            return order
          }),
        })
      })
    },
  })

  return (
    <Button
      // so pode cancelar um pedido se ele ainda nao saiu pra entrega
      disabled={!['pending', 'processing'].includes(status)}
      onClick={() => cancelOrderFn({ orderId: id })}
      variant="ghost"
      size="xs"
    >
      <X className="mr-2 size-3" />
      Cancelar
    </Button>
  )
}
