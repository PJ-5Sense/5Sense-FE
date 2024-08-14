'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { CenterInfo } from '@/app/(service)/layout'
import { changePhoneNumberToString } from '@/utils'
import DefaultProfile from './DefualtProfile'

interface IProps {
  centerInfo: CenterInfo | undefined
  isExistCenter: boolean | undefined
  drawer?: boolean
  onClose?: any
}

export default function AcademyInfo({ centerInfo, isExistCenter, drawer, onClose }: IProps) {
  const router = useRouter()
  if (isExistCenter == undefined) {
    return
  }

  return isExistCenter && centerInfo ? (
    <div className="w-full flex flex-col items-center gap-7">
      <div className="w-full flex flex-col items-center gap-4">
        <div className={`w-[90px] h-[90px] rounded-full`}>
          <Image
            className="bg-[#D3C4F9] w-[90px] h-[90px] rounded-full"
            src={centerInfo.profile}
            alt="profile"
            width={90}
            height={90}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <p
            className={`${centerInfo.name.length >= 15 ? 'text-[18px]' : 'text-[21px]'}  font-bold ${drawer ? 'text-[#1F2A37' : 'text-white'} `}
          >
            {centerInfo.name}
          </p>
          <p className={` h-[14px] text-sm font-medium ${drawer ? 'text-[#4B5563]' : 'text-white'} `}>
            {changePhoneNumberToString(centerInfo.mainPhone)}
          </p>
          <p className={` h-3 text-xs font-medium ${drawer ? 'text-[#4B5563]' : 'text-white'} `}>
            {centerInfo.address}
          </p>
        </div>
      </div>
      <button
        className={`${
          drawer ? 'bg-primary-600' : 'bg-slate-50 bg-opacity-20'
        } max-w-[200px] w-full px-4 py-3  rounded-md text-center text-sm font-bold leading-[21px] cursor-pointer text-white`}
        onClick={() => {
          router.push('/centerInfo')
          if (onClose) {
            onClose()
          }
        }}
      >
        내 프로필 관리
      </button>
    </div>
  ) : (
    <DefaultProfile />
  )
}
