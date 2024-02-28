'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '../../ui/button'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'
import { getManagedStore } from '@/api/get-managed-store'
import { Skeleton } from '../../ui/skeleton'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { StoreProfileDialog } from './store-profile-dialog'
import { useState } from 'react'
import { signOut } from '@/api/sign-out'
import { useRouter } from 'next/navigation'

export function AccountMenu() {
  const route = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  const { data: managedStore, isLoading: isLoadingManagedStore } = useQuery({
    queryKey: ['managedStore'],
    queryFn: getManagedStore,
  })

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  function handleCloseModalDialog() {
    setOpenDialog(false)
  }

  const { mutateAsync: signOutFn, isPending: isSigninOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      /* o replace substitui a rota, ao inves de redirecionar, isso impede 
        q o usuario clique em voltar e caia na dashboard
      */
      route.replace('/sign-in')
    },
  })

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedStore ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedStore?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">
              <Building className="mr-2 size-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className="cursor-pointer text-rose-500 dark:text-rose-400"
            disabled={isSigninOut}
          >
            <button
              className="w-full"
              onClick={() => {
                signOutFn()
              }}
            >
              <LogOut className="mr-2 size-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog handleCloseModalDialog={handleCloseModalDialog} />
    </Dialog>
  )
}
