import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScorePill } from "@/components/ScorePill"

type SearchRecord = {
  id: string
  date: string
  category: string
  productCount: number
  topScore: number
}

export function SearchHistoryTable({ data }: { data: SearchRecord[] }) {
  if (!data.length) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border text-center">
        <p className="text-muted-foreground text-sm">Nenhuma busca registrada</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <h3 className="text-sm font-medium text-muted-foreground uppercase p-4 sm:p-6 pb-3">
        Histórico de Buscas
      </h3>
      <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-900 hover:bg-slate-900">
            <TableHead className="text-xs uppercase text-muted-foreground">Data</TableHead>
            <TableHead className="text-xs uppercase text-muted-foreground">Categoria</TableHead>
            <TableHead className="text-xs uppercase text-muted-foreground">Produtos</TableHead>
            <TableHead className="text-xs uppercase text-muted-foreground">Top Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="text-slate-300 text-sm">{record.date}</TableCell>
              <TableCell className="text-slate-300 text-sm">{record.category}</TableCell>
              <TableCell className="font-mono text-slate-300">{record.productCount}</TableCell>
              <TableCell><ScorePill score={record.topScore} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}
