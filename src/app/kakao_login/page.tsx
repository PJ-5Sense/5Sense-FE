"use client"
import { useRouter, useSearchParams } from "next/navigation"

export default function Loading() {
    
    const NEXT_PUBLIC_KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const NEXT_PUBLIC_KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    console.log(code);
    const data = new URLSearchParams();
    data.append("grant_type", "authorization_code");
    data.append("client_id", `${NEXT_PUBLIC_KAKAO_REST_API_KEY}`);
    data.append("redirect_uri", `${NEXT_PUBLIC_KAKAO_REDIRECT_URI}`);
    data.append("code", `${code}`);

    /* setTimeout(() => {
        router.push('/main');
      }, 500); */
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    }
    const token = fetch('https://kauth.kakao.com/oauth/token', options)


    return (
        <div>로그인중입니다...</div>
    )
}