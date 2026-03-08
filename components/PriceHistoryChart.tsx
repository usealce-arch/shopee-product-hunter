"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

type HistoryPoint = {
  date: string
  price: number
  sales: number
}

export function PriceHistoryChart({ data }: { data: HistoryPoint[] }) {
  if (!data.length) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border text-center">
        <p className="text-muted-foreground text-sm">Sem dados de histórico disponíveis</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
        Histórico 30 dias
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            yAxisId="price"
            orientation="left"
            stroke="#EE4D2D"
            fontSize={12}
            tickLine={false}
            tickFormatter={(v) => `R$${v}`}
          />
          <YAxis
            yAxisId="sales"
            orientation="right"
            stroke="#22C55E"
            fontSize={12}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
          />
          <Legend />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="price"
            stroke="#EE4D2D"
            name="Preço (R$)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="sales"
            type="monotone"
            dataKey="sales"
            stroke="#22C55E"
            name="Vendas"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
