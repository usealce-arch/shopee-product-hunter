'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não correspondem');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implementar Supabase Auth
      console.log('Signup com:', { email, password });
      alert('Supabase auth será configurado na próxima etapa!');
    } catch (err) {
      setError('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-slate-400">Comece a encontrar produtos rentáveis</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-xl">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={isLoading}
                className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirmar Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 disabled:opacity-50"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 rounded font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Criando...' : 'Criar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Já tem conta?{' '}
              <Link href="/login" className="text-orange-500 hover:text-orange-400">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-slate-400 hover:text-slate-300">
            ← Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}
