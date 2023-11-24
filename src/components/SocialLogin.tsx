import '../app/globals.css'
import Image from 'next/image'
import kakaoLogo from '../assets/logo/kakaoLogo.svg'
import naverLogo from '../assets/logo/naverLogo.svg'
import googleLogo from '../assets/logo/googleLogo.svg'
import appleLogo from '../assets/logo/appleLogo.svg'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

export default function SocialLoginBtn({ socialLogo }: any) {
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
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&state=${state}`
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${state}&redirect_uri=${NAVER_REDIRECT_URI}`
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
  const GOOGLE_AUTH_URL =
    `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=code&state=${state}&` +
    `redirect_uri=${GOOGLE_REDIRECT_URI}` +
    `&client_id=${GOOGLE_CLIENT_ID}`

  const router = useRouter()
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
      logo: kakaoLogo,
      bgColor: 'bg-[#FFE812]',
      borderColor: 'border-[#FFE812]',
      textColor: 'text-[#374151]',
      alt: 'kakao',
      login: async function kakaoLogin() {
        window.location.href = KAKAO_AUTH_URL
        //router.push('/loading');
      }
    },
    {
      title: '네이버 계정으로 로그인',
      logo: naverLogo,
      bgColor: 'bg-[#FFF]',
      borderColor: 'border-[#2BB500]',
      textColor: 'text-[#2BB500]',
      alt: 'naver',
      login: function naverLogin() {
        window.location.href = NAVER_AUTH_URL
        //router.push('/loading');
      }
    },
    {
      title: '구글 계정으로 로그인',
      logo: googleLogo,
      bgColor: 'bg-[#FFF]',
      borderColor: 'border-[#6B7280]',
      textColor: 'text-[#374151]',
      alt: 'google',
      login: function googleLogin() {
        window.location.href = GOOGLE_AUTH_URL
        //router.push('/loading');
      }
    }
  ]

  return (
    <>
      <Script
        type="text/javascript"
        src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js"
        charSet="utf-8"
      ></Script>
      <Script
        type="text/javascript"
        src="http://code.jquery.com/jquery-1.11.3.min.js"
      ></Script>
      {loginBtnData.map((data, i) => {
        return (
          <div
            className={`flex w-[430px] h-[52px] rounded-md ${data.bgColor} border ${data.borderColor}`}
            key={i}
            onClick={data.login}
          >
            {data.alt === 'google' ? (
              <Image
                className="p-[15px]"
                src={data.logo}
                width={48}
                height={48}
                alt={data.alt}
              />
            ) : (
              <Image src={data.logo} width={48} height={48} alt={data.alt} />
            )}
            <div
              className={`font-semibold w-[190px] h-[16px] leading-4 mt-[18px] mx-auto ${data.textColor}`}
            >
              {data.title}
            </div>
          </div>
        )
      })}
    </>
  )
}
