import { api } from '@/lib/axios'

export interface GetDayOrdersResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersResponse>(
    '/metrics/day-orders-amount',
  )

  return response.data
}
