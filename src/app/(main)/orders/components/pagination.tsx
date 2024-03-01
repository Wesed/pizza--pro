'use client'

import { getOrders } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { z } from 'zod'
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'

export function Pagination() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  /* explicacao
    o backend trabalha com os indices comecando no 0, mas seria estranho
    exibir pagina 0 na interface, pois toda pagina comeca em 1, entao o param
    page inicia em 1, mas e salvo como 0 (page - 1), pro back entender
  */
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  const totalCount = result?.meta.totalCount || 0
  const perPage = result?.meta.perPage || 1
  const pages = Math.ceil(totalCount / perPage) || 1

  function onPageChange(pageIndex: number) {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(pageIndex + 1))
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
            variant="outline"
            className="size-8 p-0"
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            variant="outline"
            className="size-8 p-0"
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
            variant="outline"
            className="size-8 p-0"
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
            variant="outline"
            className="size-8 p-0"
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
