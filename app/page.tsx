'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🛍️ Shopee Product Hunter</h1>
          <p className="text-slate-400">Encontre os melhores produtos pra vender como afiliado</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-xl">
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full block px-6 py-3 rounded font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors text-center"
            >
              ✓ Login
            </Link>

            <Link
              href="/signup"
              className="w-full block px-6 py-3 rounded font-semibold border border-orange-500 text-orange-500 hover:bg-orange-500/10 transition-colors text-center"
            >
              + Criar Conta
            </Link>
          </div>

          <div className="mt-6 p-4 bg-slate-700/50 rounded border border-slate-600">
            <p className="text-sm text-slate-300">
              <strong>Demo:</strong> Essa é uma versão SaaS. Cada usuário gerencia seus próprios dados e Affiliate ID da Shopee.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Powered by Shopee API + Supabase</p>
        </div>
      </div>
    </main>
  );
}
