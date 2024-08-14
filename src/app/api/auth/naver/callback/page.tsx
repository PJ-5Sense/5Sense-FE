'use client'
import { useSearchParams } from 'next/navigation'

import AuthLogin from '@/components/login/AuthLogin'

export default function NaverCallback() {
  const searchParams = useSearchParams()

  const code = searchParams.get('code') as string
  const state = searchParams.get('state') as string

  return <AuthLogin social='naver' code={code} state={state} />  
}
