import Image from 'next/image'
import ProfileBtn from '../btn/ProfileBtn'
import mainlogo from '@/assets/logo/mainlogo.svg'
import profile from '@/assets/images/profile.png'

export default function Header() {
  return (
    <div className="wrapper w-full h-[601px] md:h-[469px] relative flex bg-gradient-to-b from-indigo-500 to-violet-500">
      <header className="headerContainer w-full md:w-[336px] absolute left-6 top-8 md:top-12">
        <div className="logoContent w-full flex justify-between mb-[34px] md:mb-20">
          <div className="LogoBox flex flex-row items-center gap-[6px]">
            <Image src={mainlogo} width={52} height={52} alt="mainlogo"></Image>
            <span className="Sense text-slate-50 text-xl font-bold font-['Poppins']">
              5sense
            </span>
          </div>
          <div className="IconBox">
            <div>hi</div>
          </div>
        </div>
        <div className="infoContent flex md:flex-col items-center w-[720px] h-[88px] md:w-[288px] md:h-[251px]">
          <Image
            src={profile}
            width={88}
            height={88}
            alt="profile"
            className="image w-[88px] h-[88px] rounded-full"
          />
          <div className="infoDetail flex flex-col items-center gap-[8px] mb-7">
            <h3 className="Text text-center text-white text-[21px] font-bold font-['Pretendard'] leading-loose">
              매직기구필라테스
            </h3>
            <span className="Text text-center text-indigo-50 text-sm font-medium font-['Pretendard'] leading-[14px]">
              031-706-1281
            </span>
            <span className="Text w-72 text-center text-indigo-50 text-xs font-medium font-['Pretendard'] leading-3">
              경기 성남시 분당구 판교로256번길 19
            </span>
          </div>

          <ProfileBtn />
        </div>
      </header>
    </div>
  )
}
// 보라색이 wrapper
// 로고랑 아이콘 header
// 학원 정보 content

//시맨틱
// div
// header 로고랑 아이콘
// contents 학원 내용
