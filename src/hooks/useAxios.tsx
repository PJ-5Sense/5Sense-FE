import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios'

const accessToken: string | null = localStorage.getItem('accessToken') as string
const accessTokenExp: string | null = localStorage.getItem(
  'accessTokenExp'
) as string
const refreshToken: string | null = localStorage.getItem(
  'refreshToken'
) as string
const current: Date = new Date()
const checkToken = () => {
  const tokenExp = Date.parse(accessTokenExp) / 60000
  const currentDate = Date.parse(current.toISOString()) / 60000

  return tokenExp - currentDate
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IP_ADDRESS,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  async config => {
    if (accessToken) {
      if (checkToken() < 5) {
        try {
          const res = await axios.post(
            process.env.NEXT_PUBLIC_IP_ADDRESS + '/auth/reissue',
            {},
            {
              headers: {
                authorization: `Bearer ${refreshToken}`
              }
            }
          )
          console.log(res)
          localStorage.setItem('accessToken', res.data.data.accessToken)
          localStorage.setItem('accessTokenExp', res.data.data.accessTokenExp)
        } catch (error) {
          console.log(error)
        }
      }
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    console.log('requsetError')
    alert(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { url } = response.config
    if (url === '/centers') {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_IP_ADDRESS + '/auth/reissue',
          {},
          {
            headers: {
              authorization: `Bearer ${refreshToken}`
            }
          }
        )
        console.log(res)
        localStorage.setItem('accessToken', res.data.data.accessToken)
        localStorage.setItem('accessTokenExp', res.data.data.accessTokenExp)
      } catch (error) {
        console.log(error)
      }
    }
    console.log(response)
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response
  },
  error => {
    if (error?.response) {
      console.log(error.response)
      alert(error.response.data.message)
    }
    return Promise.reject(error)
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    //return Promise.reject(error)
  }
)

export default instance
