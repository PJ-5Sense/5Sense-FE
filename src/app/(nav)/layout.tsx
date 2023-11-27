import Navbar from '@/components/layout/Navbar'
import Image from 'next/image'
import mainLogo from '@/assets/logo/mainLogo.png'
import logout from '@/assets/icons/logout.svg'
import noticeActive from '@/assets/icons/notice-active.svg'
import menu from '@/assets/icons/menu.svg'
import profile from '@/assets/images/profile.png'
import AcademyInfo from '@/components/layout/AcademyInfo'
import { useState } from 'react'
import LogoLink from '@/components/LogoLink'
import SideModal from '@/components/SideModal'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="wrapper relative min-w-[768px] max-w-[2560px]">
      {/* purplebox를 위한 relative */}
      <div className="w-full h-full px-6 2md:px-12 box-border lg:pl-0 lg:pr-4 xl:pr-8 2xl:pr-12">

        {/* 상위 relative가 없기때문에 body를 부모로 잡음 */}

        <div className="header w-full h-[124px] flex justify-between items-center lg:flex-none lg:h-[66px]">
          <div className="rightBox flex gap-5 lg:flex-none lg:relative lg:top-12 lg:left-6">
            <LogoLink
              className="menu lg:hidden cursor-pointer"
              src={menu}
              alt="메뉴"
            />
            <div className="logoBox flex gap-[10px]">
              <Image src={mainLogo} alt="로고" />
              <span className=" text-slate-50 text-xl font-bold leading-[52px]">
                5Sense
              </span>
            </div>
          </div>
          <div className="iconBox lg:absolute lg:top-[37px] lg:right-6 flex items-center gap-[27px]">
            <Image src={logout} alt="로그아웃" />
            <Image src={noticeActive} alt="활성알림" />
          </div>
        </div>
        <div className="content w-full h-full lg:flex">
          <div className="academyInfo hidden lg:side-info">
            <AcademyInfo />
          </div>
          <div className="service flex-grow 3xl:flex-grow-0 3xl:basis-[1576px] lg:translate-y-[-16px]">
            <Navbar />
            <div className="relative w-full 2xl:min-h-[1271px] xl:min-h-[854px] lg:min-h-[705px] md:min-h-[1098px] min-h-[752px] bg-white rounded-2xl">
              {children}
            </div>
            <div className="footer relative bottom-0 h-25 box-border">
              <span className="text-gray-300 text-xl font-bold font-['Poppins'] mr-[56px]">
                5sense
              </span>
              <span className="text-gray-300 text-sm font-medium font-['Pretendard'] leading-[14px]">
                Copyright ⓒ2023 5sense inc, ltd. All rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <SideModal /> */}
      {/* static은 레이어 계층에 들어가지 않기때문에 purplebox에 인덱스값을 -로 설정함*/}
      <div className="purplebox absolute top-0 left-0 w-full h-[601px] lg:h-[469px] bg-gradient-to-b from-[#6F53DB] to-[#875EDC] z-[-10]" />
    </div>
  )
}
