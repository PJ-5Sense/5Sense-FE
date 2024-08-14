'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import ContentHeader from '@/components/common/ContentHeader'

export default function ModifyPage({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  const router = useRouter()
  const linkList = [
    {
      url: '/centerInfo',
      title: '센터 정보'
    },
    {
      url: '/policy',
      title: '개인정보처리방침'
    },
    {
      url: '/accessTerms',
      title: '이용 약관'
    },
    {
      url: '/withDrawal',
      title: '회원 탈퇴'
    }
  ]

  return (
    <div className="w-full flex flex-col items-center pb-[60px]">
      <ContentHeader title="내 프로필 관리" back onClick={() => router.push('/home')} />
      <div className="w-[640px] flex pb-6">
        <div className="h-6 flex gap-4">
          {linkList.map((data, i) => {
            return (
              <div key={i} className="flex items-center gap-4">
                <div
                  className={`${
                    pathName === data.url ? 'text-indigo-500' : 'text-gray-400'
                  } text-base font-bold cursor-pointer`}
                  onClick={() => router.push(data.url)}
                >
                  {data.title}
                </div>
                {i !== 3 && <span className="w-px h-[14px] bg-gray-300" />}
              </div>
            )
          })}
        </div>
      </div>
      {/* box */}
      <div className="w-full flex justify-center">{children}</div>
    </div>
  )
}
