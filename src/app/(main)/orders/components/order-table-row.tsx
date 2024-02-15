import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'

interface OrderTableRowProps {
  id: string
  timeOrder: number
  status: string
  clientName: string
  totalOrder: string
}

export function OrderTableRow({
  id,
  timeOrder,
  status,
  clientName,
  totalOrder,
}: OrderTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="size-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{id}</TableCell>
      <TableCell className="text-muted-foreground">
        há {timeOrder} minutos
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">{status}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">{clientName}</TableCell>
      <TableCell className="font-medium">R$ {totalOrder}</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
