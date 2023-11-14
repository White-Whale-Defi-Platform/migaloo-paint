export const formatHash = (hash: string) => "..." + hash.slice(hash.length - 4, hash.length)
export const formatAddress = (address: string) => "..." + address.slice(address.length - 4, address.length)
export const formatBalance = (balance: number) => (balance / 1_000_000).toFixed(2)
