import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import { formatStartTime } from '@/utils'
import instance from '@/lib/api/axios'
import { durationClassName } from '@/lib/state/durationClassName'

import TrashIcon from '@/icons/icon/trash.svg'
import ModifyIcon from '@/icons/icon/modify.svg'

interface IProps {
  edit?: boolean
  onClick?: () => void
}

export default function DurationScheduleCheck({ edit, onClick }: IProps) {
  const params = useParams()
  const date = new Date()
  console.log(params)
  const setDurationSchedule = useSetRecoilState(durationClassScheduleState)
  const [name, setName] = useState<{ class: string; room: string }>({
    class: '',
    room: ''
  })

  const durationSchedules = useRecoilValue(durationClassScheduleState)
  const className = useRecoilValue(durationClassName)
  const deleteDurationSchedule = (index: number) => {
    setDurationSchedule(durationSchedules.filter((schedule, i) => index !== i))
  }

  console.log(durationSchedules)

  useEffect(() => {
    if (params.id !== undefined && durationSchedules.length !== 0) {
      instance(`/api/duration-lessons/${params.id}/details`).then(res => {
        const data = res.data.data
        let isUpdatedDurationSchedule: boolean
        if ('room' in durationSchedules[0]) {
          isUpdatedDurationSchedule = true
        } else {
          isUpdatedDurationSchedule = false
        }
        const selectedRoomId = isUpdatedDurationSchedule ? durationSchedules[0].room.id : durationSchedules[0].roomId
        setName(prev => ({
          ...prev,
          name: data.name
        }))

        /* 룸 정보 */
        instance('/api/lesson-rooms/daily', {
          params: {
            date: new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString()
          }
        }).then(res => {
          const room = res.data.data.filter((data: { id: number }) => data.id === Number(selectedRoomId))
          console.log(room)
          setName(prev => ({
            ...prev,
            room: room[0].name
          }))
        })
      })
    } else if (durationSchedules.length !== 0) {
      instance('/api/lesson-rooms/daily', {
        params: {
          date: new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString()
        }
      }).then(res => {
        const room = res.data.data.filter((data: { id: number }) => data.id === Number(durationSchedules[0].roomId))
        console.log(room)
        setName(prev => ({
          ...prev,
          room: room[0].name
        }))
      })
    }
  }, [durationSchedules])

  console.log(className)

  return (
    <>
      {durationSchedules.length !== 0 && (
        <div className="w-full flex flex-col gap-4">
          {durationSchedules.map((data, i) => {
            const startDate = new Date(data.startDate)
            const endDate = new Date(data.endDate)
            return (
              <div
                key={i}
                className="relative w-full flex flex-col px-4 py-3.5 border border-1 border-gray-200 rounded-lg bg-gray-50"
              >
                {edit && onClick ? (
                  <button
                    type="button"
                    onClick={onClick}
                    className="absolute top-[15px] px-3 py-2 bg-white rounded border border-gray-200 right-4 flex items-center gap-1.5"
                  >
                    <ModifyIcon className="text-primary-600" width={16} height={16} />
                    <div className="gray-500-normal text-[13px]">수정하기</div>
                  </button>
                ) : (
                  <button type="button" className="absolute top-[15px] right-4 flex items-center gap-1.5">
                    <TrashIcon className="text-gray-400" width={16} height={16} />
                    <div className="gray-500-normal text-[13px]" onClick={() => deleteDurationSchedule(i)}>
                      삭제하기
                    </div>
                  </button>
                )}

                <div className="w=full text-primary-600 text-xs font-bold">기간반</div>
                <div className="w-full flex flex-col gap-1.5">
                  <div className="w-full gray-900-semibold text-[15px]">{edit ? name.class : className}</div>
                  <div className="w-full flex flex-col gap-1/2">
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 기간</div>
                      <div className="w-full gray-800-normal text-sm">
                        {`${startDate.getFullYear()}.${
                          startDate.getMonth() + 1
                        }.${startDate.getDate()} - ${endDate.getFullYear()}.${
                          endDate.getMonth() + 1
                        }.${endDate.getDate()}`}
                      </div>
                    </div>
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 시간</div>
                      <div className="w-full gray-800-normal text-sm">
                        {formatStartTime(data.startTime)} - {formatStartTime(data.endTime)}
                      </div>
                    </div>
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 요일</div>
                      <div className="w-full gray-800-normal text-sm">{data.repeatDate} 반복</div>
                    </div>
                    <div className="w-full flex gap-2">
                      <div className="w-[70px] gray-500-medium text-sm">• 강의실</div>
                      <div className="w-full gray-800-normal text-sm">{name.room}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
