import { fetchConfig } from '@/lib'

export const GET = async (): Promise<Response> => await fetchConfig()
  .then(response => Response.json(response))
  .catch(error => Response.json(error))
