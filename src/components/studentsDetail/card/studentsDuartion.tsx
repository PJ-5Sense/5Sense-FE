import { formatStartTime, formatLessonDate } from '@/utils'

interface IProps {
  className: string
  paymentStatus: string
  schedules: {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    room: string
    repeatDate: string
  }
  type: string
  onDelete?: () => void
}

export default function StudentsDuration(durationLessons: IProps) {
  console.log(durationLessons)
  return (
    <div className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 ">
      <div className="w-full flex flex-col gap-1.5">
        <div className="w-full flex items-center flex-col gap-px">
          <div className="w-full text-primary-600 text-xs font-bold">기간반</div>
          <div className="w-full gray-900-semibold text-[15px]">{durationLessons.className}</div>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 기간</div>
            <div className="w-full gray-800-normal text-sm">
              {formatLessonDate(durationLessons.schedules.startDate)} -
              {formatLessonDate(durationLessons.schedules.endDate)}
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 시간</div>
            <div className="w-full gray-800-normal text-sm">
              {formatStartTime(durationLessons.schedules.startTime)} -
              {formatStartTime(durationLessons.schedules.endTime)}
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 요일</div>
            <div className="w-full gray-800-normal text-sm">{durationLessons.schedules.repeatDate} 반복</div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 강의실</div>
            <div className="w-full gray-800-normal text-sm">{durationLessons.schedules.room}</div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div
          className={`h-[29px] leading-[29px] px-2 py- rounded text-sm text-center ${durationLessons.paymentStatus === 'Paid' ? 'bg-primary-100 text-primary-600' : 'bg-[#FCE3E3] text-[#D93B3B]'} `}
        >
          {durationLessons.paymentStatus === 'Paid' ? '결제완료' : '미결제'}
        </div>
      </div>
    </div>
  )
}
