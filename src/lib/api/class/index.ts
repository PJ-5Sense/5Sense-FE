import instance from '../axios'

export const postDurationLessons = async (requestData: any) => {
  try {
    const res = await instance.post(`/api/duration-lessons`, requestData)
    return res.data
  } catch (error: any) {
    return error.response
  }
}

export const postSessionLessons = async (requestData: any) => {
  try {
    const res = await instance.post(`/api/session-lessons`, requestData)
    return res.data
  } catch (error: any) {
    return error.response
  }
}

export const patchDurationLessons = async (requestData: any) => {
  const lessonId = Number(requestData.id)
  return instance.patch(`/api/duration-lessons/${lessonId}/close`)
}

export const patchSesstionLessons = async (requestData: any) => {
  const lessonId = Number(requestData.id)
  return instance.patch(`/api/session-lessons/${lessonId}/close`)
}

export const getDurationLessons = async (requestData: any) => {
  console.log('ruquestData', requestData)
  const lessonId = Number(requestData)
  return instance.get(`/api/duration-lessons/${lessonId}/details`)
}

export const getSesstionLessons = async (requestData: any) => {
  const lessonId = Number(requestData)
  return instance.get(`/api/session-lessons/${lessonId}/details`)
}

export const putDurationLessons = async (id: string, requestData: any) => {
  try {
    const res = await instance.put(`/api/duration-lessons/${id}`, requestData)
    return res.data
  } catch (error: any) {
    return error.response
  }
}

export const putSesstionLessons = async (id: string, requestData: any) => {
  try {
    const res = await instance.put(`/api/session-lessons/${id}`, requestData)
    return res.data
  } catch (error: any) {
    return error.response
  }
}
