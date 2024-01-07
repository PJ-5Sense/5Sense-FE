'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchApi } from '@/hooks/useApi'

export default function GoogleCallbak() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const postCodeAndState = () => {
    fetchApi(`/auth/google/login`, 'POST', {
      code: code,
      state: state
    }).then(result => {
      localStorage.setItem('accessToken', result.data.accessToken)
      localStorage.setItem('refreshToken', result.data.refreshToken)
      localStorage.setItem('accessTokenExp', result.data.accessTokenExp)
      localStorage.setItem('hasCenter', result.data.hasCenter)

      if (result.data.hasCenter) {
        router.push('/home')
      } else {
        router.push('/myCenter')
      }
    })
  }

  useEffect(() => {
    postCodeAndState()
  }, [])
}