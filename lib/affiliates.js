export const affiliates = [
  {
    id: 'fidel',
    name: 'Fidel Djiedjou',
    type: 'influenceur',
    commission: 10, // 10% sur chaque vente
    code: 'fidel',
    link: 'bransmarket.com/?ref=fidel',
    balance: 45000,
    totalSales: 450000,
    clicks: 2340
  },
  {
    id: 'marie237',
    name: 'Marie Influence',
    type: 'influenceur',
    commission: 15,
    code: 'marie237',
    link: 'bransmarket.com/?ref=marie237',
    balance: 125000,
    totalSales: 830000,
    clicks: 5100
  },
  {
    id: 'tech-deals',
    name: 'Tech Deals CM',
    type: 'revendeur',
    commission: 8,
    code: 'tech-deals',
    link: 'bransmarket.com/?ref=tech-deals',
    balance: 89000,
    totalSales: 1112000,
    clicks: 8900
  }
]

export const getAffiliateByCode = (code) => {
  return affiliates.find(a => a.code === code)
}

export const calculateCommission = (totalPrice, affiliateCode) => {
  const affiliate = getAffiliateByCode(affiliateCode)
  if (!affiliate) return 0
  return Math.round(totalPrice * affiliate.commission / 100)
}
