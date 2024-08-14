import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import instance from '@/lib/api/axios'

interface IProps {
  social: string
  code: string
  state: string
}

export default function AuthLogin({ social, code, state }: IProps) {
  const router = useRouter()

  const checkSocial = () => {
    const checkList: { [key: string]: string } = {
      naver: '네이버로 로그인중입니다...',
      kakao: '카카오로 로그인중입니다...',
      google: '구글로 로그인중입니다...'
    }

    return checkList[social]
  }

  const login = () => {
    instance
      .post(`/api/auth/${social}/login`, {
        code: code,
        state: state
      })
      .then(res => {
        localStorage.setItem('accessToken', res.data.data.accessToken)
        localStorage.setItem('refreshToken', res.data.data.refreshToken)
        localStorage.setItem('accessTokenExp', res.data.data.accessTokenExp)
        localStorage.setItem('hasCenter', res.data.data.hasCenter)
        localStorage.setItem('isNew', res.data.data.isNew)
        localStorage.setItem('social', res.data.data.type)
        if (!res.data.data.isNew) {
          router.push('/home')
        } else {
          router.push('/mycenter/agreement')
        }
      })
      .catch(error => {
        alert('error')
      })
  }

  useEffect(() => {
    login()
  }, [])

  /* 나중에 로딩 디자인 나오면 수정 예정 */
  return <div>{checkSocial()}</div>
}
