'use client'
import { useSearchParams } from 'next/navigation'

import AuthLogin from '@/components/login/AuthLogin'

interface data {
  code: string | null
  state: string | null
}

export default function KakaoCallback() {
  const searchParams = useSearchParams()

  const code = searchParams.get('code') as string
  const state = searchParams.get('state') as string

  return <AuthLogin social='kakao' code={code} state={state} />
}
