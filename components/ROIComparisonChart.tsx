"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

type ComparisonData = {
  date: string
  estimated: number
  actual: number
}

export function ROIComparisonChart({ data }: { data: ComparisonData[] }) {
  if (!data.length) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border text-center">
        <p className="text-muted-foreground text-sm">Nenhum dado de comparação ainda</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
        ROI: Previsão vs Real
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
          />
          <Legend />
          <Bar dataKey="estimated" name="Previsto" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="actual" name="Real" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
