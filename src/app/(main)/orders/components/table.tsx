import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'

export function TableOrders() {
  return (
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
      <TableBody className=''>
        {Array.from({ length: 10 }).map((_, i) => {
          return (
            <TableRow key={i}>
              <TableCell>
                <Button variant="outline" size="xs">
                  <Search className="size-3" />
                  <span className="sr-only">Detalhes do pedido</span>
                </Button>
              </TableCell>
              <TableCell className="font-mono text-xs font-medium">
                821e78f7asdhdf128h
              </TableCell>
              <TableCell className="text-muted-foreground">
                há 15 minutos
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                Marcio Ferreira da Silva
              </TableCell>
              <TableCell className="font-medium">R$ 149,90</TableCell>
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
        })}
      </TableBody>
    </Table>
  )
}
