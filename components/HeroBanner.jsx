'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function HeroBanner() {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      navigation
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="h-[250px] md:h-[500px]"
    >
      <SwiperSlide>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-full flex items-center justify-center text-white">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4">Promo Grossiste</h1>
            <p className="text-lg md:text-xl mb-6">Jusqu'à -50% sur le stock</p>
            <button className="btn-amazon">Voir les offres</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-gradient-to-r from-[#FF9900] to-red-600 h-full flex items-center justify-center text-white">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4">Nouveautés 2026</h1>
            <p className="text-lg md:text-xl mb-6">Découvrez nos produits</p>
            <button className="bg-white text-black font-bold py-2 px-6 rounded-md hover:bg-gray-200">Shopper</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-gradient-to-r from-green-600 to-teal-600 h-full flex items-center justify-center text-white">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4">Livraison Rapide</h1>
            <p className="text-lg md:text-xl mb-6">Partout à Yaoundé en 24h</p>
            <button className="btn-amazon">Commander</button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
