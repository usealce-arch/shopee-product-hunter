'use client';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">📊 Dashboard</h1>
          <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Affiliate ID</h3>
            <input
              type="text"
              placeholder="Cole seu Affiliate ID da Shopee"
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
            <button className="mt-3 w-full px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 text-sm font-medium">
              Salvar
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Categorias</h3>
            <select className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-orange-500">
              <option>Todos</option>
              <option>Eletrônicos</option>
              <option>Moda</option>
              <option>Casa</option>
            </select>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Filtro de Preço</h3>
            <input
              type="range"
              min="0"
              max="1000"
              className="w-full"
            />
            <p className="text-slate-300 text-sm mt-2">Até R$ 1.000</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
          <p className="text-slate-400 mb-4">
            Funcionalidade de scraping será ativada após conectar seu Affiliate ID
          </p>
          <p className="text-slate-500 text-sm">
            Aqui irão aparecer os produtos mais rentáveis da Shopee baseado em:
          </p>
          <ul className="mt-4 text-slate-400 text-sm space-y-2">
            <li>✓ Comissão de afiliado</li>
            <li>✓ Rating do produto</li>
            <li>✓ Número de vendas</li>
            <li>✓ Preço competitivo</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
