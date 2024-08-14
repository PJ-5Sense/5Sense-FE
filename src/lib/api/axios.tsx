import axios, { AxiosError, AxiosResponse } from 'axios'

const current = new Date()
const checkToken = (accessTokenExp: string) => {
  const tokenExp = Date.parse(accessTokenExp) / 60000
  const currentDate = Date.parse(current.toISOString()) / 60000

  return tokenExp - currentDate
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IP_ADDRESS,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// typeof 연산자는 string을 반환하기 때문
const isBrower = typeof window !== 'undefined'

instance.interceptors.request.use(
  async config => {
    if (!isBrower) {
      return config
    }

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const accessTokenExp = localStorage.getItem('accessTokenExp')

    if (accessToken) {
      // 토큰 유효시간 검사
      if (accessTokenExp && checkToken(accessTokenExp) < 5) {
        try {
          let apiAddress: string
          if (window.location.port === '3000') {
            apiAddress = `${process.env.NEXT_PUBLIC_IP_ADDRESS}/api/auth/reissue`
          } else {
            apiAddress = '/api/auth/reissue'
          }
          const { data } = await axios.post(
            apiAddress,
            {},
            {
              headers: {
                authorization: `Bearer ${refreshToken}`
              }
            }
          )
          localStorage.setItem('accessToken', data.data.accessToken)
          localStorage.setItem('accessTokenExp', data.data.accessTokenExp)
          config.headers.Authorization = `Bearer ${data.data.accessToken}`
        } catch (error) {
          console.log(error)
        }
      } else {
        // 탈퇴 회원 요청
        if (config.url === '/api/auth/cancelMembership') {
          config.headers.Authorization = `Bearer ${refreshToken}`
        }
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  error => {
    console.error('requestError', error)
    alert(`Request error: ${error.message}`)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { url, method } = response.config
    /* 센터를 등록 응답을 받은 후에 다시 reissue 요청을 하고 토큰 값을 업데이트해야하기 때문에 response에 위치시킴 */
    if (url === '/centers' && method === 'post') {
      const refreshToken = localStorage.getItem('refreshToken')
      let apiAddress: string
      if (window.location.port === '3000') {
        apiAddress = `${process.env.NEXT_PUBLIC_IP_ADDRESS}/api/auth/reissue`
      } else {
        apiAddress = '/api/auth/reissue'
      }
      const { data } = await axios.post(
        apiAddress,
        {},
        {
          headers: {
            authorization: `Bearer ${refreshToken}`
          }
        }
      )
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('accessTokenExp', data.data.accessTokenExp)
    }
    return response
  },
  error => {
    const axiosError = error as AxiosError
    if (axiosError?.response) {
      console.error(axiosError.response)
      return Promise.reject(axiosError)
    }
  }
)

export default instance
