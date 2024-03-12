'use client'
import { getDailyRevenueInPeriod } from '@/api/metrics/get-daily-revenue-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import colors from 'tailwindcss/colors'
import { DateRangePicker } from '../date-range-picker'
import { DateRange } from 'react-day-picker'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  // converte a receita q vem em centavos antes de enviar pro grafico
  const charData = useMemo(() => {
    return dailyRevenueInPeriod?.map((charItem) => {
      return {
        date: charItem.date,
        receipt: charItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            Receita no período
          </CardTitle>
          <CardDescription className="text-base font-semibold">
            Receita diária no período
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {charData && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={charData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <Tooltip />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                dataKey="receipt"
                strokeWidth={2}
                stroke={colors.violet['500']}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}