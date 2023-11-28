export default function WriteBox() {
  return (
    <div className="w-full max-w-[1480px] 2xl:max-w-[1480px] xl:max-w-[1016px] lg:max-w-[936px] h-[220px] p-6 rounded-xl border border-gray-200 ">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="text-gray-600 text-base font-semibold font-['Pretendard'] leading-normal">
          센터 메모
        </div>
        <textarea
          className="w-full h-full p-0 border-none focus:ring-0"
          placeholder="메모를 적어보세요."
        />
      </div>
    </div>
  )
}
