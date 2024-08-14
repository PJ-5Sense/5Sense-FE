import { formatDate } from '@/utils'

import TrashIcon from '@/icons/icon/trash.svg'

interface IProps {
  className: string
  sessionDate: string
  startTime: string
  endTime: string
  roomName: string
  restOfSessions: number
  totalSessions: number
  onDelete: () => void
}

export function AddSessionLessonCheck(props: IProps) {
  return (
    <div className="relative w-full px-4 py-3.5 flex flex-col rounded-lg border border-1 border-gray-200 bg-gray-50 ">
      <button type="button" className="absolute top-[15px] right-4 flex items-center gap-1.5 ">
        <TrashIcon className="text-gray-400" width={16} height={16} />
        <div className="gray-500-normal text-[13px]" onClick={props.onDelete}>
          삭제하기
        </div>
      </button>

      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex items-center flex-col gap-px">
          <div className="w-full text-secondary-600 text-xs font-bold">회차반</div>
          <div className="w-full gray-900-semibold text-[15px]">{props.className}</div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 잔여회차</div>
            <div className="w-full gray-500-medium text-sm">
              <span className="gray-800-semibold">
                {props.restOfSessions === 0 ? props.totalSessions - 1 : props.restOfSessions - 1}
              </span>{' '}
              / {props.totalSessions} 회
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 일자</div>
            <div className="w-full gray-500-medium text-sm">{formatDate(props.sessionDate)}</div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 시간</div>
            <div className="w-full gray-500-medium text-sm">
              {props.startTime} - {props.endTime}
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="w-[80px] gray-500-medium text-sm">• 강의실</div>
            <div className="w-full gray-500-medium text-sm">{props.roomName}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
