export const getCurren = async () => {
  try {
    const res = await fetch('/currencies.json')
    const data = await res.json()
    return data?.currencies || []
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return [];
  }

}
export const getliveRates = async() => {
  try {
    const res = await fetch('/live-rates.json')
    const data = await res.json()
    return data?.tiers || []
  } catch (error) {
    console.error('Error fetching tiers:', error);
    return [];
  }
}
export const getWallet = async() => {
  try {
    const res = await fetch('/wallet-balance.json')
    const data = await res.json()
    return data?.wallet || []
  } catch (error) {
    console.error('Error fetching wallet:', error);
    return [];
  }
} 