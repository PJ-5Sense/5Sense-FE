import instance from '../axios'

export const getCenterInfo = async () => {
  try {
    const res = await instance('/api/centers/my')
    return res.data
  } catch (error: any) {
    return error.response
  }
}
