'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import instance from '@/lib/api/axios'
import { centerDataType } from '@/app/myCenter/rigister/page'
import { centerInfoState } from '@/lib/state/centerInfoState'
import { toLocalString } from '@/utils'

import profile from 'public/assets/images/profile.png'
import ProfileIcon from '@/icons/icon/defaultProfile.svg'
import { useEffect } from 'react'

export default function AcademyInfo(props: any) {
  const router = useRouter()

  const onProfileHandler = () => {
    router.push('/centerInfo')
  }

  const centerInfo = useRecoilValue(centerInfoState)
  const setCenterInfo = useSetRecoilState(centerInfoState)

  useEffect(() => {
    instance('/centers/my').then(res => {
      const centerData = res.data.data
      setCenterInfo(prev => ({
        ...prev,
        name: centerData.name,
        address: centerData.address,
        mainPhone: centerData.mainPhone,
        open: centerData.open,
        close: centerData.close,
        profile: centerData.profile
      }))
    })
  }, [])

  return (
    <div className="infoContent w-full flex flex-col items-center gap-7">
      <div className="relative w-full flex flex-col items-center gap-4">
        {centerInfo.name !== '' &&
          (centerInfo.profile !== null ? (
            <div className="absolute -top-5 w-[148px] h-[148px] flex justify-center items-center ">
              <img className="rounded-full w-[90px] h-[90px]" src={centerInfo.profile} />
            </div>
          ) : (
            <ProfileIcon width={150} className="absolute -top-5" />
          ))}

        {centerInfo.name !== '' && (
          <div className="absolute top-[100px] w-full infoDetail flex flex-col items-center gap-2">
            <p className={`${props.color} text-[21px] font-bold`}>{centerInfo.name}</p>
            <p className={`${props.color} h-[14px] text-sm font-medium`}>
              {centerInfo.mainPhone.slice(0, 3)}-{centerInfo.mainPhone.slice(3, 7)}-{centerInfo.mainPhone.slice(7, 11)}
            </p>
            <p className={`${props.color} h-3 text-xs font-medium `}>{centerInfo.address}</p>
          </div>
        )}
      </div>
      <button
        onClick={onProfileHandler}
        className={`mt-[160px] w-[200px] h-[45px] px-4 py-3 box-border ${props.btnColor} rounded-md justify-center items-center`}
      >
        <span className="text-center text-white text-sm font-bold leading-[21px]">내 프로필 관리</span>
      </button>
    </div>
  )
}
