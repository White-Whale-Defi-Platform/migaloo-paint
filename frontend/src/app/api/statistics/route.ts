import { fetchStatistics } from '@/lib'

export const GET = async (): Promise<Response> => await fetchStatistics()
  .then(response => Response.json(response))
  .catch(error => Response.json(error))
