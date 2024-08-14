'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from 'flowbite-react'

import AcademyInfo from '@/components/layout/CenterInfo/AcademyInfo'
import Navbar from '@/components/layout/Navbar'
import TodaySchedule from '@/components/layout/CenterInfo/TodaySchedule'
import Footer from '@/components/layout/Footer'
import MobileHeader from '@/components/layout/Header/MobileHeader'
import PcHeader from '@/components/layout/Header/PcHeader'
import { getCenterInfo } from '@/lib/api/center'
import NotFoundPage from '@/components/common/NotFoundPage'

import PlusIcon from '@/icons/icon/plus.svg'
import { centerInfoState } from '@/lib/state/centerInfoState'

export interface CenterInfo {
  name: string
  address: string
  mainPhone: string
  profile: string
  open: string
  close: string
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const centerInfo = useRecoilValue(centerInfoState)
  const setCenterInfo = useSetRecoilState(centerInfoState)

  const [isExistCenter, setIsExistCenter] = useState<boolean>()

  const getCenterInfoData = async () => {
    const result = await getCenterInfo()
    if (result.message == 'Successfully getting center information') {
      setIsExistCenter(true)
      setCenterInfo(() => ({ ...result.data }))
    }
    if (result.data.message == 'Center information must be registered to be available') {
      setIsExistCenter(false)
    }
  }

  const renderContents = () => {
    if (isExistCenter === undefined) {
      return <div className="relative flex-1 lg:h-[832px] h-[658px] bg-white rounded-2xl lg:bottom-[22px] bottom-4" />
    }
    if (isExistCenter) {
      return <div className="relative flex-1 w-full bg-white rounded-2xl lg:bottom-[22px] bottom-4">{children}</div>
    }
    return (
      <NotFoundPage
        title="아직 My센터를 등록하지 않으셨군요!"
        subTitle="지금 바로 등록해 다양한 서비스를 이용해보세요!"
        button={
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              router.push('/mycenter/register')
            }}
            className="mt-8"
          >
            <PlusIcon className="mr-2" />
            My센터 등록
          </Button>
        }
      />
    )
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    getCenterInfoData()
    if (accessToken === null) {
      router.push('/login')
      return
    }
  }, [])

  return (
    <div className={`w-screen h-screen`}>
      <div className={`w-full h-full`}>
        <MobileHeader centerInfo={centerInfo} isExistCenter={isExistCenter} />
        <PcHeader />
        <div className="w-full h-full flex lg:pl-0 2xl:pr-12 xl:pr-8 lg:pr-4 md:px-12 px-6">
          <div className="w-full box-content mt-[180px] max-w-[248px] xl:px-6 lg:px-4 lg:block hidden">
            <AcademyInfo centerInfo={centerInfo} isExistCenter={isExistCenter} />
            <div className="w-full h-16"></div>
            {isExistCenter !== undefined && <TodaySchedule />}
          </div>
          <div className="flex-1 flex flex-col lg:pt-[66px]">
            <Navbar />
            {renderContents()}
            <Footer />
          </div>
        </div>
      </div>
      {/* static은 레이어 계층에 들어가지 않기때문에 purplebox에 인덱스값을 -로 설정함*/}
      <div className="purplebox absolute top-0 left-0 w-screen h-[601px] lg:h-[469px] bg-gradient-to-b from-[#6F53DB] to-[#875EDC] z-[-10]" />
    </div>
  )
}
