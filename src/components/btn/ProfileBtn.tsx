'use client'

export default function ProfileBtn() {
  const onProfileHandler = () => {
    console.log('hello')
  }
  return (
    <button
      onClick={onProfileHandler}
      className="w-[140px] md:w-[200px] h-[45px] px-4 py-3 bg-slate-50 bg-opacity-20 rounded-md justify-center items-center inline-flex"
    >
      <span className=" text-center text-white text-sm font-bold font-['Pretendard'] leading-[21px]">
        내 프로필 관리
      </span>
    </button>
  )
}
