import { Metadata } from 'next'
import { MonthRevenueCard } from './components/month-revenue-card'
import { MonthOrdersAmountCard } from './components/mont-orders-amount-card'
import { DayOrderAmountCard } from './components/day-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from './components/month-canceled-orders-amount-card'
import { RevenueChart } from './components/revenue-chart'
import { PopularProductsChart } from './components/popular-products-chart'

export const metadata: Metadata = {
  title: 'Dashboard',
}
export default function Dashboard() {
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrderAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-10 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </div>
  )
}
