'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'
import instance from '@/lib/api/axios'
import { dateDataType } from '../common/calendar/datePicker/dayDatePIcker'
import FormatDayData from './DataFormatter/FormatDayData'

interface IProps {
  dateData: dateDataType
}

interface getClassDataType {
  id: string
  type: string
  name: string
  startTime: string
  teacher: string
  lessonTime: number
}

export default function DaySchedule({ dateData }: IProps) {
  const calendarDate = useRecoilValue(DayCalendarDateState)
  const date = new Date()
  const currentHour = date.getHours()

  const [lessonData, setLessonData] = useState<any>([])

  const checkCurrentDate = (startTime: string) => {
    if (
      date.getFullYear() === dateData.year &&
      date.getMonth() === dateData.month &&
      date.getDate() === dateData.date &&
      currentHour === Number(startTime)
    ) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    instance(`/api/lessons/${dateData.year}/${dateData.month + 1}`).then(res => {
      const data = res.data.data

      setLessonData(FormatDayData(data))
    })

    return () => {
      setLessonData([])
    }
  }, [dateData.month])

  return (
    <>
      <div className="w-full flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8">
        {/* 회차반 / 기간반 */}
        <div className="w-full h-4 flex justify-end">
          <div className="w-[136px] h-4 flex gap-5">
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
        {/* 일 시간표 */}
        <div id="classSchedule" className="relative flex flex-col gap-7 w-full max-h-[800px] p-2 overflow-y-auto">
          {lessonData.length !== 0 &&
            lessonData[calendarDate.date - 1] &&
            lessonData[calendarDate.date - 1].map((data: any, i: number) => {
              const startTime = data.startTime.split(':')[0]
              return (
                <div key={i} className="w-full flex items-start xl:gap-[60px] md:gap-12 gap-6">
                  <div className="flex w-[77px] gap-5 items-center">
                    <div
                      className={`w-[51px] text-right ${
                        checkCurrentDate(data.startTime.split(':')[0]) ? 'text-indigo-500' : 'text-black'
                      }  text-base font-semibold `}
                    >
                      {data.startTime.split(':')[0]}:{data.startTime.split(':')[1]}
                    </div>
                    <div className="w-1.5 h-1.5 bg-primary-600"></div>
                  </div>
                  <div
                    id={`ref${i}`}
                    className="w-full flex flex-col p-4 gap-7 outline outline-1 rounded-lg outline-gray-200"
                  >
                    {data.data.map((data: { teacher: string; room: string; name: string; type: string }, i: number) => {
                      return (
                        <div key={i} className="flex gap-4 h-[45px]">
                          <div
                            className={`w-[3px] h-full rounded ${
                              checkCurrentDate(startTime)
                                ? data.type === 'duration'
                                  ? 'bg-primary-600'
                                  : 'bg-orange-500'
                                : 'bg-gray-200'
                            }`}
                          ></div>
                          <div className="flex flex-col w-full h-full">
                            <div className="flex gap-[6px]">
                              <div
                                className={`${
                                  checkCurrentDate(startTime) ? 'text-gray-800' : 'text-gray-400'
                                }  text-sm font-medium`}
                              >
                                {data.teacher}
                              </div>
                              <div
                                className={`${
                                  checkCurrentDate(startTime) ? 'text-gray-800' : 'text-gray-400'
                                }  text-sm font-medium`}
                              >
                                ·
                              </div>
                              <div className={` text-gray-800 text-sm font-medium`}>{data.room}</div>
                            </div>
                            <div
                              className={`${
                                checkCurrentDate(startTime) ? 'text-gray-800' : 'text-gray-400'
                              }  text-base font-semibold  truncate`}
                            >
                              {data.name}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
