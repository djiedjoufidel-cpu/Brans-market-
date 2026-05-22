export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19" fill="#007FFF" stroke="white" strokeWidth="2"/>
        <path d="M20 8 L24 16 L32 16 L26 21 L28 29 L20 24 L12 29 L14 21 L8 16 L16 16 Z" fill="white"/>
        <circle cx="20" cy="20" r="3" fill="#007FFF"/>
        <path d="M12 28 Q20 26 28 28" stroke="white" strokeWidth="1.5" fill="none"/>
      </svg>
      <div className="leading-tight">
        <span className="text-2xl font-bold text-white">Brans</span>
        <span className="text-2xl font-bold text-[#007FFF]">Market</span>
        <p className="text-[10px] text-gray-300 -mt-1">Made in 🇨🇲</p>
      </div>
    </div>
  )
}
