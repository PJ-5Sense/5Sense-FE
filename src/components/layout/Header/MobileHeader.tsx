'use client'
import { Drawer } from 'flowbite-react/components/Drawer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { CenterInfo } from '@/app/(service)/layout'
import AcademyInfo from '../CenterInfo/AcademyInfo'
import TodaySchedule from '../CenterInfo/TodaySchedule'

import IconNotice from '@/icons/icon/main/Notification.svg'
import IconLogout from '@/icons/icon/main/logout.svg'
import MenuIcon from 'public/assets/icons/menu.svg'
import Logo from 'public/assets/logo/Logo.png'

interface IProps {
  centerInfo: CenterInfo | undefined
  isExistCenter: boolean | undefined
}

export default function MobileHeader({ centerInfo, isExistCenter }: IProps) {
  const router = useRouter()

  const [activeDrawer, setActiveDrawer] = useState(false)

  const handleDrawer = () => {
    setActiveDrawer(!activeDrawer)
  }
  return (
    <div className="lg:hidden block w-full pt-8 pb-10 box-border md:px-12">
      <div className="flex justify-between items-center">
        <div className="rightBox flex items-center gap-5">
          <MenuIcon className="cursor-pointer" onClick={handleDrawer} />
          <div className="logoBox flex gap-[10px] cursor-pointer" onClick={() => router.push('/home')}>
            <Image src={Logo} alt="logo" width={52} height={52} />
            <span className="text-slate-50 text-xl font-bold leading-[52px]">5Sense</span>
          </div>
        </div>
        <div className="iconBox lg:absolute lg:top-[37px] lg:right-6 flex items-center gap-6 cursor-pointer">
          <IconNotice />
          <IconLogout
            width={28}
            height={28}
            onClick={() => {
              typeof window !== undefined && localStorage.clear()
              router.push('/login')
            }}
          />
        </div>
      </div>
      <Drawer open={activeDrawer} onClose={handleDrawer}>
        <Drawer.Header />
        <Drawer.Items>
          <div className="w-full flex flex-col gap-10 ">
            <AcademyInfo centerInfo={centerInfo} isExistCenter={isExistCenter} drawer onClose={handleDrawer} />
            <div className="w-[480px] h-px bg-gray-200" />
            <TodaySchedule />
          </div>
        </Drawer.Items>
      </Drawer>
    </div>
  )
}
