import { api } from '@/lib/axios'

export interface RegisterStoreBody {
  storeName: string
  managerName: string
  email: string
  phone: string
}

export async function registerStore({
  storeName: restaurantName,
  managerName,
  email,
  phone,
}: RegisterStoreBody) {
  await api.post('/restaurants', {
    restaurantName,
    managerName,
    email,
    phone,
  })
}
