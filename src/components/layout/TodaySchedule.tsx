// 메인에서 스케줄 받아오고 저장해서 모달에서도 햄버거 버튼때도 사용해야함
export default function TodaySchedule() {
  const data = [
    {
      start: '8:30',
      end: '9:00',
      content:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
    },
    {
      start: '8:30',
      end: '9:00',
      content:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
    },
    {
      start: '8:30',
      end: '9:00',
      content:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
    },
    {
      start: '8:30',
      end: '9:00',
      content:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
    },
    {
      start: '8:30',
      end: '9:00',
      content:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
    }
  ]
  return (
    <div className="flex flex-col w-full lg:w-[248px] gap-3">
      <div className="today flex w-fit h-[29px] items-center box-border px-2 py-1 gap-[6px] bg-primary-50 rounded">
        <span className="bold-500 text-sm leading-[21px]">TODAY</span>
        <span className="medium-500 text-sm leading-[21px]">2023/10/27</span>
      </div>
      <div className="w-full flex flex-col gap-1.5">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="before:inline-block before:w-[6px] before:h-[6px] before:rounded-full before:bg-primary-500 before:mr-2">
              <span className="text-gray-500 text-xs font-semibold font-sans leading-[18px]">
                {item.start}
              </span>
              <span className="text-gray-500 text-xs font-semibold font-sans leading-[18px] before:content-['-'] before:px-1">
                {item.end}
              </span>
            </div>
            <div className="pl-4 mr-0 text-['#1F2A37'] text-[13px] font-semibold font-sans leading-tight">
              {item.content}
            </div>
          </div>
        ))}
      </div>
      <div className="relative w-full top-1 text-center text-gray-700 text-xs font-medium font-['Pretendard'] leading-3">
        <span className="absolute left-2.5">&lt;</span>1 / 10
        <span className="absolute right-2.5">&gt;</span>
      </div>
    </div>
  )
}
