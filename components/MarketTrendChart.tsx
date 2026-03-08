"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type TrendData = {
  week: string
  avgScore: number
}

export function MarketTrendChart({ data }: { data: TrendData[] }) {
  if (!data.length) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border text-center">
        <p className="text-muted-foreground text-sm">Sem dados de tendência</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
        Tendências do Mercado
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
          />
          <Line
            type="monotone"
            dataKey="avgScore"
            stroke="#EE4D2D"
            strokeWidth={2}
            dot={{ fill: "#EE4D2D", r: 4 }}
            name="Score Médio"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
