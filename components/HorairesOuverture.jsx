'use client'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HorairesOuverture({ horaires = null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [nextOpen, setNextOpen] = useState('')

  // Horaires par défaut BransMarket
  const horairesDefault = horaires || {
    lundi: { ouvert: '08:00', ferme: '18:00', pause: '12:00-13:00' },
    mardi: { ouvert: '08:00', ferme: '18:00', pause: '12:00-13:00' },
    mercredi: { ouvert: '08:00', ferme: '18:00', pause: '12:00-13:00' },
    jeudi: { ouvert: '08:00', ferme: '18:00', pause: '12:00-13:00' },
    vendredi: { ouvert: '08:00', ferme: '18:00', pause: '12:00-13:00' },
    samedi: { ouvert: '09:00', ferme: '15:00', pause: null },
    dimanche: { ouvert: null, ferme: null, pause: null }
  }

  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

  useEffect(() => {
    const checkOpen = () => {
      const now = new Date()
      const jourActuel = jours[now.getDay()]
      const heureActuelle = now.getHours() * 60 + now.getMinutes()
      const horaireJour = horairesDefault[jourActuel]

      if (!horaireJour.ouvert) {
        setIsOpen(false)
        setNextOpen('Lundi 08:00')
        return
      }

      const [hOuvert, mOuvert] = horaireJour.ouvert.split(':').map(Number)
      const [hFerme, mFerme] = horaireJour.ferme.split(':').map(Number)
      const minOuvert = hOuvert * 60 + mOuvert
      const minFerme = hFerme * 60 + mFerme

      let ouvert = heureActuelle >= minOuvert && heureActuelle < minFerme

      // Vérifier pause midi
      if (horaireJour.pause && ouvert) {
        const [pauseStart, pauseEnd] = horaireJour.pause.split('-')
        const [hPauseStart, mPauseStart] = pauseStart.split(':').map(Number)
        const [hPauseEnd, mPauseEnd] = pauseEnd.split(':').map(Number)
        const minPauseStart = hPauseStart * 60 + mPauseStart
        const minPauseEnd = hPauseEnd * 60 + mPauseEnd
        if (heureActuelle >= minPauseStart && heureActuelle < minPauseEnd) {
          ouvert = false
        }
      }

      setIsOpen(ouvert)
      setNextOpen(ouvert? `Ferme à ${horaireJour.ferme}` : `Ouvre à ${horaireJour.ouvert}`)
    }

    checkOpen()
    const interval = setInterval(checkOpen, 60000) // Check chaque minute
    return () => clearInterval(interval)
  }, [])

  const getJourActuel = () => jours[new Date().getDay()]

  return (
    <div className="bg-white p-4 rounded-md border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <Clock size={20} className="text-[#FF9900]"/>
          Horaires d'ouverture
        </h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
          isOpen? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isOpen? <CheckCircle size={16}/> : <XCircle size={16}/>}
          {isOpen? 'Ouvert' : 'Fermé'}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{nextOpen}</p>

      <div className="space-y-2 text-sm">
        {jours.slice(1).concat(jours[0]).map(jour => {
          const horaire = horairesDefault[jour]
          const estAujourdhui = jour === getJourActuel()
          return (
            <div
              key={jour}
              className={`flex justify-between py-1 ${estAujourdhui? 'font-bold text-[#FF9900]' : 'text-gray-700'}`}
            >
              <span className="capitalize">{jour}</span>
              <span>
                {horaire.ouvert
                ? `${horaire.ouvert} - ${horaire.ferme}${horaire.pause? ` (Pause ${horaire.pause})` : ''}`
                  : 'Fermé'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
