'use client'
import { useState, useRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'
import { centerInfoState } from '@/lib/state/centerInfoState'
import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'

interface IProps {
  roomScheduleData: { id: number; name: string; capacity: number; workTime: any }[][]
  indexOfRoomList: number
}

export default function RoomSchedule({ roomScheduleData, indexOfRoomList }: IProps) {
  const centerInfo = useRecoilValue(centerInfoState)
  const calendarDate = useRecoilValue(DayCalendarDateState)
  const router = useRouter()

  const createTimeList = () => {
    const openTime: string = centerInfo.open
    const closeTime: string = centerInfo.close

    let timeList = [{ time: openTime }]
    let time: string = openTime

    while (time !== closeTime) {
      let hour: number = Number(time.split(':')[0])
      let min: string = time.split(':')[1]
      if (Number(min) + 30 === 60) {
        hour = hour + 1
        min = '00'
      } else {
        min = '30'
      }

      time = String(hour).length === 1 ? '0' + String(hour) + ':' + min : String(hour) + ':' + min
      timeList.push({ time: time })
    }

    return timeList
  }

  const timeList = createTimeList()

  const getScheduleHeight = (lessonTime: number) => {
    if (lessonTime === 30 || lessonTime === null) {
      return '2xl:h-[162px] lg:h-[183px] h-[180px]'
    } else if (lessonTime === 60) {
      return '2xl:h-[324px] lg:h-[366px] h-[360px]'
    } else if (lessonTime === 90) {
      return '2xl:h-[486px] lg:h-[549px] h-[540px]'
    } else if (lessonTime === 120) {
      return '2xl:h-[648px] lg:h-[732px] h-[720px]'
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 pt-8 pb-[80px]">
      {/* 기간반, 회차반 */}
      <div className="w-full h-4 flex justify-end">
        <div className="w-[164px] h-4 flex gap-6">
          <div className="w-[70px] h-full flex gap-2 items-center justify-end">
            <span className="w-[16px] h-[16px] border rounded bg-[#FF7749]"></span>
            <span className="text-orange-500 text-[13px] font-bold">회차반</span>
          </div>
          <div className="w-[70px] h-full flex gap-2 items-center justify-end">
            <span className="w-[16px] h-[16px] border rounded bg-primary-500"></span>
            <span className="text-primary-500 text-[13px] font-bold">기간반</span>
          </div>
        </div>
      </div>
      {/* 룸 예약표 */}
      <div className="w-full flex gap-6">
        {/* 시간 */}
        <div className="flex flex-col">
          {timeList.length !== 0 &&
            timeList.map((data, i) => {
              return (
                <div
                  key={i}
                  className="w-[60px] 2xl:h-[162px] lg:h-[183px] h-[180px] text-right gray-800-semibold text-base"
                >
                  {data.time}
                </div>
              )
            })}
        </div>
        {/* 수업 일정 */}
        <div className="w-full grid grid-cols-4">
          {roomScheduleData.length !== 0 &&
            roomScheduleData[indexOfRoomList].map((data: any, i: number) => {
              const roomId = data.id,
                roomName = data.name
              return (
                <div key={i} className="w-full flex flex-col">
                  {data.workTime &&
                    data.workTime.map((data: any, i: number) => {
                      return (
                        <div
                          key={i}
                          className={`w-full ${getScheduleHeight(
                            data.lessonTime
                          )} p-1.5 border border-1 border-gray-200 flex items-center justify-center`}
                        >
                          {data.id !== null ? (
                            /* 해당 시간에 예약된 클래스가 있는 경우 */
                            <div
                              className={`relative w-full h-full p-1.5 ${
                                data.type === 'duration'
                                  ? 'bg-primary-50 border-primary-200'
                                  : 'bg-secondary-50 border-secondary-200'
                              } border rounded border-1 `}
                            >
                              <div className="w-full h-full flex flex-col gap-1.5">
                                <div
                                  className={`w-full p-1.5 flex gap-1.5 ${
                                    data.type === 'duration' ? 'bg-primary-100' : 'bg-secondary-100'
                                  } items-center`}
                                >
                                  <div
                                    className={`${
                                      data.type === 'duration' ? 'text-primary-600' : 'text-secondary-600'
                                    } text-sm font-bold`}
                                  >
                                    {data.time}
                                  </div>
                                  <div
                                    className={`${
                                      data.type === 'duration' ? 'text-primary-600' : 'text-secondary-400'
                                    } text-xs font-semibold`}
                                  >
                                    {data.lessonTime}분
                                  </div>
                                </div>
                                <div className="w-full h-full flex flex-col gap-2">
                                  <div
                                    className={`w-full ${
                                      data.type === 'duration' ? 'text-primary-400' : 'text-secondary-400'
                                    } text-sm font-bold`}
                                  >
                                    {data.name}
                                  </div>
                                  <div className="w-full flex flex-col">
                                    <div
                                      className={`w-full text-left ${
                                        data.type === 'duration' ? 'text-primary-600' : 'text-secondary-600'
                                      } text-xs font-medium`}
                                    >
                                      담당 강사 : {data.teacher}
                                    </div>
                                    {data.type === 'session' && (
                                      <div className="w-full text-left text-secondary-600 text-xs font-medium">
                                        예약 현황 : {data.studentCount}/{data.capacity}
                                      </div>
                                    )}
                                  </div>
                                  {data.type === 'session' && (
                                    <button
                                      className={`absolute right-1.5 bottom-1.5 lg:w-[75px] lg:h-[39px] w-[68px] h-[36px] flex items-center px-3 py-2 ${
                                        data.isOpenForBooking
                                          ? 'bg-white border border-1 border-gray-200 text-gray-800 hover:text-primary-600'
                                          : 'bg-gray-400 text-white'
                                      } rounded-lg
                                    font-semibold lg:text-sm text-xs text-center`}
                                      onClick={() => {
                                        if (data.isOpenForBooking) {
                                          router.push(`/room/reservation/booked/${roomId}`)
                                          localStorage.setItem('className', data.name)
                                          localStorage.setItem('reservationTime', data.time)
                                          localStorage.setItem(
                                            'reservationDate',
                                            `${calendarDate.year}.${calendarDate.month + 1}.${calendarDate.date}`
                                          )
                                          localStorage.setItem('classId', data.id)
                                          localStorage.setItem('lessonTime', data.lessonTime)
                                        }
                                      }}
                                    >
                                      예약하기
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* 해당 시간에 예약된 클래스가 없는 경우 */
                            <button
                              className="lg:w-[75px] lg:h-[39px] w-[68px] h-[36px] flex items-center px-3 py-2 border rounded-lg border-1 border-gray-200
                             gray-800-semibold lg:text-sm text-xs hover:text-primary-600"
                              onClick={() => {
                                router.push(`/room/reservation/unbooked/${roomId}`)
                                localStorage.setItem('reservationTime', data.time)
                                localStorage.setItem(
                                  'reservationDate',
                                  `${calendarDate.year}.${calendarDate.month + 1}.${calendarDate.date}`
                                )
                              }}
                            >
                              예약하기
                            </button>
                          )}
                        </div>
                      )
                    })}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
