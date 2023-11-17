import { fetchLeaderboard } from '@/lib'

export const GET = async (): Promise<Response> => await fetchLeaderboard()
  .then(response => Response.json(response))
  .catch(error => Response.json(error))
