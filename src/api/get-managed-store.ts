import { api } from '@/lib/axios'

export interface GetManagedStoreResponse {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedStore() {
  const response = await api.get<GetManagedStoreResponse>('/managed-restaurant')
  return response.data
}
