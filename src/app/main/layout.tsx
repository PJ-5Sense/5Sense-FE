import Navbar from '@/components/main/Navbar'
import Image from 'next/image'
import mainLogo from '@/assets/logo/mainLogo.png'
import logout from '@/assets/icons/logout.svg'
import noticeActive from '@/assets/icons/notice-active.svg'
import menu from '@/assets/icons/menu.svg'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="wrapper ">
      <div className="purplebox w-full min-w-[768px] h-[601px] lg:h-[469px] bg-gradient-to-b from-[#6F53DB] to-[#875EDC]"></div>
      <div className="fullbox absolute top-0 left-0 w-full min-w-[768px] max-w-[1920px] px-6 md:px-12 lg:pr-6 lg:pl-0 box-border">
        <div className="header">
          <div className="logoBox absolute top-8 lg:top-12 left-6 md:left-12 lg:left-6 flex w-[52px] items-center">
            <Image className="mr-[20px] lg:hidden" src={menu} alt="메뉴" />
            <Image className="mr-[6px]" src={mainLogo} alt="로고" />
            <span className="text-slate-50 text-xl font-bold ">5Sense</span>
          </div>
          <div className="iconBox absolute top-[43px] lg:top-[37px] right-6 md:right-12 lg:right-6 flex items-center gap-[27px]">
            <Image src={logout} alt="로그아웃" />
            <Image src={noticeActive} alt="활성알림" />
          </div>
        </div>
        <div className="content flex w-full min-w-[720px] max-w-[1872px]">
          <div className="academyInfo hidden lg:academy-info">학원정보</div>
          <div className="service relative top-[124px] lg:top-[66px] w-full">
            <Navbar />
            <div className="relative w-full 3xl:min-h-[1271px] bg-white rounded-2xl">
              {children}
            </div>
            <div className="footer relative bottom-0 pt-12 pb-[22px]">
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
    </div>
  )
}
