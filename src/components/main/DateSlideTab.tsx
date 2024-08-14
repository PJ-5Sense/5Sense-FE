import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { dateSideTab } from '@/app/recoilContextProvider'

export default function DateSlideTab() {
  const router = useRouter()
  const currentPath = usePathname()

  let [slideTab, setSlideTab] = useRecoilState(dateSideTab)

  useEffect(() => {
    let path = currentPath.split('/')[2]
    if (path === 'day' || path === undefined) {
      setSlideTab('translate-x-0')
    } else if (path === 'week') {
      setSlideTab('translate-x-[48px]')
    } else if (path === 'month') {
      setSlideTab('translate-x-[96px]')
    }
  }, [currentPath])

  return (
    <>
      <div className="absolute right-0 flex items-center w-[160px] h-[44px] p-1 outline outline-1 rounded-full outline-gray-200">
        <div
          className={`absolute z-0 w-14 h-9 border border-1 border-primary-400 bg-primary-600 rounded-full transition-transform ${slideTab}`}
        ></div>
        <div
          className={` z-10 px-3 py-1.5 rounded-full gray-500-medium text-base text-center  cursor-pointer
              ${slideTab == 'translate-x-0' ? 'w-14' : 'w-12'}
              ${slideTab === 'translate-x-0' ? 'text-white' : 'text-gray-500'} `}
          onClick={() => {
            setSlideTab('translate-x-0')
            router.push('/home/day')
          }}
        >
          <div className="flex justify-center">일</div>
        </div>
        <div
          className={`z-10 px-3 py-1.5 rounded-full gray-500-medium text-base text-center  cursor-pointer
              ${slideTab === 'translate-x-[48px]' ? 'w-14' : 'w-12'}
              ${slideTab === 'translate-x-[48px]' ? 'text-white' : 'text-gray-500'} `}
          onClick={() => {
            setSlideTab('translate-x-[48px]')
            router.push('/home/week')
          }}
        >
          <div className="flex justify-center">주</div>
        </div>
        <div
          className={`z-10 px-3 py-1.5 rounded-full gray-500-medium text-base text-center  cursor-pointer
              ${slideTab === 'translate-x-[96px]' ? 'w-14' : 'w-12'}
              ${slideTab === 'translate-x-[96px]' ? 'text-white' : 'text-gray-500'} `}
          onClick={() => {
            setSlideTab('translate-x-[96px]')
            router.push('/home/month')
          }}
        >
          <div className="flex justify-center">월</div>
        </div>
      </div>
    </>
  )
}
