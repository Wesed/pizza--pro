'use client'

import { DayOrderAmountCard } from './day-orders-amount-card'
import { MonthOrdersAmountCard } from './mont-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from './month-canceled-orders-amount-card'
import { MonthRevenueCard } from './month-revenue-card'

export function GetMetrics() {
  return (
    <>
      <MonthRevenueCard />
      <MonthOrdersAmountCard />
      <DayOrderAmountCard />
      <MonthCanceledOrdersAmountCard />
    </>
  )
}
