'use client'
import { affiliates } from '../../lib/affiliates'
import Price from '../../components/Price'
import { useState } from 'react'

export default function AffiliatePage() {
  const [code, setCode] = useState('fidel')
  const affiliate = affiliates.find(a => a.code === code)

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Programme d'Affiliation</h1>
        <p>Gagnez jusqu'à 15% sur chaque vente que vous générez</p>
      </div>

      {/* SELECTEUR AFFILIÉ - TEMP POUR TEST */}
      <div className="mb-6">
        <select
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded"
        >
          {affiliates.map(a => (
            <option key={a.id} value={a.code}>{a.name}</option>
          ))}
        </select>
      </div>

      {affiliate && (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Solde disponible</p>
              <p className="text-2xl font-bold text-green-600">
                <Price value={affiliate.balance} />
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Ventes générées</p>
              <p className="text-2xl font-bold">
                <Price value={affiliate.totalSales} />
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Commission</p>
              <p className="text-2xl font-bold text-blue-600">{affiliate.commission}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Clics</p>
              <p className="text-2xl font-bold">{affiliate.clicks.toLocaleString('fr-FR')}</p>
            </div>
          </div>

          {/* LIEN AFFILIÉ */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="font-bold mb-3">Ton lien d'affiliation</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={affiliate.link}
                readOnly
                className="flex-1 border p-2 rounded bg-gray-50"
              />
              <button
                onClick={() => navigator.clipboard.writeText(affiliate.link)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Copier
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Partage ce lien. Tu gagnes <b>{affiliate.commission}%</b> sur chaque achat.
            </p>
          </div>

          {/* TYPES D'AFFILIÉS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow border-2 border-purple-200">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-bold mb-2">Influenceurs</h4>
              <p className="text-sm text-gray-600 mb-3">15% de commission</p>
              <p className="text-xs">Partage sur Instagram, TikTok, YouTube</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-blue-200">
              <div className="text-4xl mb-3">🏪</div>
              <h4 className="font-bold mb-2">Revendeurs</h4>
              <p className="text-sm text-gray-600 mb-3">8% de commission</p>
              <p className="text-xs">Revends à tes clients avec marge</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-green-200">
              <div className="text-4xl mb-3">🤝</div>
              <h4 className="font-bold mb-2">Apporteurs d'affaires</h4>
              <p className="text-sm text-gray-600 mb-3">10% de commission</p>
              <p className="text-xs">Recommande des clients B2B</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
