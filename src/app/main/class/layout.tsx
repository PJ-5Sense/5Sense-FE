export default function LectureDetailLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-[1536px] pt-[60px] pb-[40px] p-12">
      <div className="w-full h-[130px]">
        <span className="Title text-black text-3xl font-bold font-['Pretendard'] leading-[30px]">
          클래스 관리
        </span>
      </div>
      <div>{children}</div>
    </div>
  )
}
