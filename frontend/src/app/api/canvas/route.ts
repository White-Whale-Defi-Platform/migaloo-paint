import { fetchCanvas } from '@/lib'

export const GET = async (): Promise<Response> => await fetchCanvas()
  .then(response => Response.json(response))
  .catch(error => Response.json(error))
