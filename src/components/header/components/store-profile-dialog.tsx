import { getManagedStore } from '@/api/get-managed-store'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export function StoreProfileDialog() {
  const { data: managedStore } = useQuery({
    queryKey: ['managedStore'],
    queryFn: getManagedStore,
  })

  const storeProfileSchema = z.object({
    name: z.string(),
    description: z.string(),
  })

  type StoreProfileSchema = z.infer<typeof storeProfileSchema>

  const { register, handleSubmit } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    /* values no lugar de default pq os dados nao estao prontos qd o form e carregado. 
      enquanto q o resolver fica monitorando os valores ate ficar pronto   
    */
    values: {
      name: managedStore?.name ?? '',
      description: managedStore?.description ?? '',
    },
  })

  function updateManagedInfo(data: StoreProfileSchema) {
    console.log(data)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento{' '}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(updateManagedInfo)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="storeName">Nome</Label>
            <Input
              id="storeName"
              className="col-span-3"
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="storeDescription">Descrição</Label>
            <Textarea
              id="storeDescription"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
