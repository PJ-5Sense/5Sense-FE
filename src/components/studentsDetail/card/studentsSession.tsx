import { formatLessonDate, formatStartTime } from '@/utils'

interface IProps {
  className: string
  type: string
  paymentStatus: string
  schedules?: {
    sessionDate: string
    startTime: string
    endTime: string
    room: string
  }
  restOfSessions: number
  totalLessons: number
  onDelete?: () => void
}

export default function StudentsSession(sessionLessonsData: IProps) {
  console.log(sessionLessonsData.schedules)
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 ">
        <div className="w-full flex flex-col gap-1.5">
          <div className="w-full flex items-center flex-col gap-px">
            <div className="w-full text-secondary-600 text-xs font-bold">회차반</div>
            <div className="w-full gray-900-semibold text-[15px]">{sessionLessonsData.className}</div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center gap-2">
              <div className="w-[80px] gray-500-medium text-sm">• 잔여회차</div>
              <div className="w-full gray-500-medium text-sm">
                <span className="gray-800-semibold">{sessionLessonsData.restOfSessions}</span> /{' '}
                {sessionLessonsData.totalLessons} 회
              </div>
            </div>
            {sessionLessonsData.type === 'check' && sessionLessonsData.schedules && (
              <>
                <div className="w-full flex items-center gap-2">
                  <div className="w-[80px] gray-500-medium text-sm">• 일자</div>
                  <div className="w-full gray-500-medium text-sm">
                    {formatLessonDate(sessionLessonsData.schedules?.sessionDate)}
                  </div>
                </div>
                <div className="w-full flex items-center gap-2">
                  <div className="w-[80px] gray-500-medium text-sm">• 시간</div>
                  <div className="w-full gray-500-medium text-sm">
                    {formatStartTime(sessionLessonsData.schedules.startTime)} -{' '}
                    {formatStartTime(sessionLessonsData.schedules.endTime)}
                  </div>
                </div>
                <div className="w-full flex items-center gap-2">
                  <div className="w-[80px] gray-500-medium text-sm">• 강의실</div>
                  <div className="w-full gray-500-medium text-sm">{sessionLessonsData.schedules.room}</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[65px] h-[29px] px-2 py-1 bg-primary-100 rounded text-sm text-center text-primary-600">
            {sessionLessonsData.paymentStatus === 'Paid' ? '결제완료' : '미결제'}
          </div>
        </div>
      </div>
    </div>
  )
}
