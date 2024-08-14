import { useEffect } from 'react'
import instance from '@/lib/api/axios'
import { useRouter } from 'next/navigation'

interface IProps {
  social: string
  code: string
  state: string
}

export default function Login({ social, code, state }: IProps) {
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
        console.log(res)
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
      .catch(err => {
        console.log(err)
        //alert('err')
      })
  }

  useEffect(() => {
    login()
  }, [])

  return <div>{checkSocial()}</div>
}
