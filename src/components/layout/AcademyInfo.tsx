'use client'
import Image from 'next/image'
import profile from '@/assets/images/profile.png'

export default function AcademyInfo() {
  const onProfileHandler = () => {
    console.log('hello')
  }
  return (
    <div className="infoContent w-[248px] flex flex-col items-center gap-7">
      <div className="flex flex-col items-center gap-4">
        <Image src={profile} alt="profile" />
        <div className="infoDetail flex flex-col items-center gap-2">
          <p className=" text-white text-[21px] font-bold font-['Pretendard']">
            매직기구필라테스
          </p>
          <p className=" text-indigo-50 h-[14px] text-sm font-medium font-['Pretendard']">
            031-706-1281
          </p>
          <p className=" text-indigo-50 h-3 text-xs font-medium font-['Pretendard']">
            경기 성남시 분당구 판교로256번길 19
          </p>
        </div>
      </div>
      <button
        onClick={onProfileHandler}
        className="w-[200px] h-[45px] px-4 py-3 box-border bg-slate-50 bg-opacity-20 rounded-md justify-center items-center"
      >
        <span className="text-center text-white text-sm font-bold font-['Pretendard'] leading-[21px]">
          내 프로필 관리
        </span>
      </button>
    </div>
  )
}
