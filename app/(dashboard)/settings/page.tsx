"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, User, Link, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  const [affiliateId, setAffiliateId] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <PageHeader title="Configuracoes" />

      <div className="space-y-6 max-w-2xl">
        {/* Profile Section */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-primary-500" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase">
              Perfil
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="mt-1 bg-slate-800 border-slate-700 text-white"
                disabled
                value="usuario@demo.com"
              />
              <p className="text-xs text-muted-foreground mt-1">
                O email nao pode ser alterado
              </p>
            </div>
          </div>
        </div>

        {/* Affiliate Section */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Link size={18} className="text-primary-500" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase">
              Shopee Affiliate
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="affiliateId" className="text-slate-300">Affiliate ID</Label>
              <Input
                id="affiliateId"
                placeholder="Seu ID de afiliado Shopee"
                className="mt-1 bg-slate-800 border-slate-700 text-white"
                value={affiliateId}
                onChange={(e) => setAffiliateId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Encontre seu ID no painel de afiliados da Shopee
              </p>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-primary-500" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase">
              Notificacoes
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Alertas de oportunidade</p>
              <p className="text-xs text-muted-foreground">
                Receba notificacoes quando novos produtos com score alto forem encontrados
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? "bg-primary-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-primary-500" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase">
              Sistema
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versao</span>
              <span className="text-slate-300 font-mono">0.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-green-400 font-mono">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plano</span>
              <span className="text-primary-500 font-mono">Free</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full bg-primary-500 hover:bg-primary-600"
        >
          <Save size={16} className="mr-2" />
          {saved ? "Salvo!" : "Salvar Configuracoes"}
        </Button>
      </div>
    </>
  )
}
