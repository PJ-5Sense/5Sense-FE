'use client'
import { useSearchParams } from 'next/navigation'

import AuthLogin from '@/components/login/AuthLogin'

export default function GoogleCallbak() {
  const searchParams = useSearchParams()

  const code = searchParams.get('code') as string
  const state = searchParams.get('state')as string

 return <AuthLogin social='google' code={code} state={state} />
}
