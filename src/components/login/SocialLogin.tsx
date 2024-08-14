import Image from 'next/image'
import KakaoIcon from 'public/assets/logo/kakaoLogo.svg'
import NaverIcon from 'public/assets/logo/naverLogo.svg'
import GoogleIcon from 'public/assets/logo/googleLogo.svg'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

export default function SocialLoginBtn() {
  function generateState() {
    let result = ''
    let basis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let counter = 0
    while (counter < basis.length) {
      result += basis.charAt(Math.floor(Math.random() * basis.length))
      counter++
    }
    return result
  }
  const state = generateState()
  const KAKAO_AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL + state
  const KAKAO_BETA_AUTH_URL = process.env.NEXT_PUBLIC_BETA_KAKAO_AUTH_URL + state
  const NAVER_AUTH_URL = process.env.NEXT_PUBLIC_NAVER_AUTH_URL + state
  const NAVER_BETA_AUTH_URL = process.env.NEXT_PUBLIC_BETA_NAVER_AUTH_URL + state
  const GOOGLE_AUTH_URL = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL + state
  const GOOGLE_BETA_AUTH_URL = process.env.NEXT_PUBLIC_BETA_GOOGLE_AUTH_URL + state

  const isBrower = typeof window !== 'undefined'

  const loginBtnData: {
    title: string
    logo: any
    bgColor: any
    borderColor: string
    textColor: string
    alt: string
    login: any
  }[] = [
    {
      title: '카카오 계정으로 로그인',
      logo: KakaoIcon,
      bgColor: 'bg-[#FFE812]',
      borderColor: 'none',
      textColor: 'text-[#381F1F]',
      alt: 'kakao',
      login: async function kakaoLogin() {
        if (isBrower && window.location.port === '3000') {
          window.location.href = KAKAO_AUTH_URL
        } else {
          window.location.href = KAKAO_BETA_AUTH_URL
        }
      }
    },
    {
      title: '네이버 계정으로 로그인',
      logo: NaverIcon,
      bgColor: 'bg-[#FFF]',
      borderColor: 'border-[#2BB500]',
      textColor: 'text-[#2BB500]',
      alt: 'naver',
      login: function naverLogin() {
        if (isBrower && window.location.port === '3000') {
          window.location.href = NAVER_AUTH_URL
        } else {
          window.location.href = NAVER_BETA_AUTH_URL
        }
      }
    },
    {
      title: '구글 계정으로 로그인',
      logo: GoogleIcon,
      bgColor: 'bg-[#FFF]',
      borderColor: 'border-gray-500',
      textColor: 'text-[#374151]',
      alt: 'google',
      login: function googleLogin() {
        if (isBrower && window.location.port === '3000') {
          window.location.href = GOOGLE_AUTH_URL
        } else {
          window.location.href = GOOGLE_BETA_AUTH_URL
        }
      }
    }
  ]

  return (
    <div className="w-full mt-14 flex flex-col gap-3.5">
      <Script
        type="text/javascript"
        src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js"
        charSet="utf-8"
      ></Script>
      <Script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></Script>
      {loginBtnData.map((data, i) => {
        const Logo = data.logo
        return (
          <div
            className={`flex relative items-center justify-center w-full h-[52px] rounded-md ${data.bgColor} border ${data.borderColor} cursor-pointer`}
            key={i}
            onClick={data.login}
          >
            {data.alt === 'google' ? (
              <Logo className="absolute left-2 p-[15px]" width={48} height={48} />
            ) : (
              <Logo className="absolute left-2" src={data.logo} width={48} height={48} />
            )}
            <div className={`font-semibold text-base leading-none h-4 ${data.textColor}`}>{data.title}</div>
          </div>
        )
      })}
    </div>
  )
}
