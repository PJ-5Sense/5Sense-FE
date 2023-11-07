import Navbar from '@/components/Navbar'
import ProfileBtn from '@/components/btn/ProfileBtn'
import Image from 'next/image'
import mainlogo from '@/assets/logo/mainlogo.svg'
import profile from '@/assets/images/profile.png'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="w-full max-w-screen-3xl min-w-screen-md bg-primary max-h-screen-h-3xl">
      <div className="w-[1920px] h-[469px] relative flex flex-row bg-gradient-to-b from-indigo-500 to-violet-500">
        <section className="Info w-[40.67px] h-[40.67px] left-[24px] top-[48px] absolute">
          <div className="Logo flex flex-row items-center gap-[6px]">
            <Image src={mainlogo} width={52} height={52} alt="mainlogo"></Image>
            <span className="Sense text-slate-50 text-xl font-bold font-['Poppins']">
              5sense
            </span>
          </div>
          <div className="UserInfo flex flex-col items-center w-[288px] h-[251px] mt-20">
            <Image
              src={profile}
              width={88}
              height={88}
              alt="profile"
              className="Profile1 w-[88px] h-[88px] rounded-full"
            />
            <div className="content flex flex-col items-center gap-[8px] mb-7">
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
        </section>
        <section className="flex flex-col left-[336px] top-[72px] absolute">
          <Navbar />
          <div className="realtive w-[1536px] h-[990px] bg-white rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}
