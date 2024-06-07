'use client'
import Image from 'next/image'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import AcademyInfo from '@/components/layout/AcademyInfo'
import Navbar from '@/components/common/Navbar'
import TodaySchedule from '@/components/layout/TodaySchedule'
import { modalState } from '@/lib/state/modal'
import Hambuger from '@/components/layout/Hambuger'
import Modal from '@/components/common/modal'

import LogoutIcon from 'public/assets/icons/logout.svg'
import MenuIcon from 'public/assets/icons/menu.svg'
import NoticeActiveIcon from 'public/assets/icons/notice-active.svg'
import mainLogo from 'public/assets/logo/Logo.png'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const footer = [
    { id: 1, name: '개인정보처리방침' },
    { id: 2, name: '이용약관' },
    { id: 3, name: '팀소개' }
  ]
  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)
  const [isClickedMenu, setIsClickedMenu] = useState<boolean>(false)

  const onClose = () => {
    setModal(false)
    setIsClickedMenu(false)
  }

  return (
    <div className={`min-w-[768px] max-w-[2560px]`}>
      <div className={`w-full h-full px-6 2md:px-12 box-border lg:pl-0 lg:pr-4 xl:pr-8 2xl:pr-12`}>
        {/* 상위 relative가 없기때문에 body를 부모로 잡음 */}
        <div className="header w-full h-[124px] flex justify-between items-center lg:flex-none lg:h-[66px]">
          <div className="rightBox flex items-center gap-5 lg:flex-none lg:relative lg:top-12 lg:left-6">
            <MenuIcon
              className="menu lg:hidden cursor-pointer"
              onClick={() => {
                setModal(true)
                setIsClickedMenu(true)
              }}
            />
            <div className="logoBox flex gap-[10px]">
              <Image src={mainLogo} alt="로고" />
              <span className=" text-slate-50 text-xl font-bold leading-[52px]">5Sense</span>
            </div>
          </div>
          <div className="iconBox lg:absolute lg:top-[37px] lg:right-6 flex items-center gap-[27px]">
            {/* <NoticeActiveIcon className="w-[30px] h-[30px] text-primary-200" />
            <LogoutIcon
              className="w-7 h-7 text-primary-200 cursor-pointer"
              onClick={() => {
                typeof window !== undefined && localStorage.clear()
                router.push('/login')
              }}
            /> */}
          </div>
        </div>
        <div className="content w-full h-full lg:flex">
          <div className="academyInfo hidden lg:side-info">
            <AcademyInfo color="text-white" btnColor="bg-slate-50 bg-opacity-20" />
            <TodaySchedule />
          </div>
          <div className="service w-full flex-grow 3xl:flex-grow-0 3xl:basis-[1576px] lg:translate-y-[-16px]">
            <Navbar />
            <div className="relative w-full flex flex-shrink min-h-[864px] lg:min-h-[854px] bg-white rounded-2xl">
              {children}
            </div>
            <div className="footer flex w-full h-[52px] mt-12 justify-between">
              <div className="right flex items-center gap-[56px]">
                <span className="text-gray-300 text-xl font-bold font-['Poppins']">5sense</span>
                <span className="text-gray-300 text-sm font-medium leading-[14px]">
                  Copyright ⓒ2023 5sense inc, ltd. All rights reserved
                </span>
              </div>
              <div className="left flex items-center">
                {footer.map((item, idx) => (
                  <span
                    key={item.id}
                    className="text-gray-300 text-xs font-medium leading-[14px] after:inline-block after:w-px after:h-2.5 after:bg-gray-300 after:mx-4 last:after:content-none"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SideModal /> */}
      {/* {isClickedMenu && (
        <Modal>
          <Hambuger onClose={onClose} />
        </Modal>
      )} */}
      {/* static은 레이어 계층에 들어가지 않기때문에 purplebox에 인덱스값을 -로 설정함*/}
      <div className="purplebox absolute top-0 left-0 md:w-screen min-w-[768px] h-[601px] lg:h-[469px] bg-gradient-to-b from-[#6F53DB] to-[#875EDC] z-[-10]" />
    </div>
  )
}