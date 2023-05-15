import _axios from 'axios'

const axios = _axios.create({
  baseURL: import.meta.env.VITE_INVENTORY_CMS_URL
})

export type GetUserItemsResponse =
  | {
      code: 'ok'
      items: {
        count: number
        item: {
          id: number
          name: string
          description: string
          imgUrl?: string
          meta?: string
        }
      }[]
    }
  | { code: 'error' }
export async function getUserItems(
  userId: string
): Promise<GetUserItemsResponse> {
  try {
    const res = await axios.get(`/inventory/${userId}`)
    return {
      code: 'ok',
      items: res.data
    }
  } catch (e) {
    return { code: 'error' }
  }
}
