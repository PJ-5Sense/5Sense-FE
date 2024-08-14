'use client'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { dateDataType } from '../common/calendar/datePicker/dayDatePIcker'
import WeekDataFormatter from './DataFormatter/WeekDataFormatter'
import { WeekCalendarDateState } from '@/lib/state/calendar/WeekCalendarDateState'
import instance from '@/lib/api/axios'
import { WeekDetailClassState } from '@/lib/state/weekDetailClassState'

export default function WeekSchedule() {
  const setDetailClassState = useSetRecoilState(WeekDetailClassState)
  const weekData = useRecoilValue(WeekCalendarDateState)
  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })
  const [mouseOverId, setMouseOverId] = useState<string>('')

  const handleMouseEnter = (e: any) => {
    setMouseOverId(e.currentTarget.id)
  }

  const handelMouseLeave = (e: any) => {
    setMouseOverId('')
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const minusXValue: number = e.currentTarget.getBoundingClientRect().left
    const minusYValue: number = e.currentTarget.getBoundingClientRect().top

    setCursorPosition({
      x: e.clientX - minusXValue + 20,
      y: e.clientY - minusYValue + 20
    })
  }

  const [lessonData, setLessonData] = useState<any>([])

  useEffect(() => {
    instance(`/api/lessons/${weekData.year}/${weekData.month + 1}`).then(res => {
      const data = res.data.data
      setLessonData(WeekDataFormatter(data, weekData))
    })
  }, [weekData.month])

  return (
    <>
      {/* 회차반 / 기간반 */}
      <div className="w-full flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8">
        <div className="w-full h-4 flex justify-end">
          <div className="w-[164px] h-4 flex gap-6 ">
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
        {/* 시간표 */}
        <div className="flex flex-col w-full">
          {lessonData.length !== 0 &&
            lessonData[weekData.week - 1] &&
            lessonData[weekData.week - 1].map((data1: any, pI: number) => {
              return (
                <div key={pI} className="w-full flex xl:gap-5 lg:gap-4 md:gap-[14px] gap-3.5">
                  <div className="w-[50px] text-right gray-800-semibold text-base">
                    {data1.time.split(':')[0]}:{data1.time.split(':')[1]}
                  </div>
                  <div className={`w-full grid grid-cols-7`}>
                    {data1.classData.map((data2: any, cI: number) => {
                      return (
                        <div key={cI} className={`p-[6px] flex flex-col gap-1 outline outline-1 outline-gray-200 `}>
                          {data2.data.map((data: any, i: number) => {
                            return (
                              <div
                                id={`${pI}` + `${cI}` + i.toString()}
                                key={i}
                                className={`relative flex flex-col p-[5px] gap-2 outline outline-1 rounded ${
                                  data.type === 'duration'
                                    ? 'outline-primary-200 bg-primary-50'
                                    : 'outline-orange-200 bg-secondary-50'
                                }  cursor-pointer`}
                                onMouseMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handelMouseLeave}
                                onClick={() => {
                                  setDetailClassState(prev => ({
                                    ...prev,
                                    id: data.id,
                                    type: data.type
                                  }))
                                }}
                              >
                                {mouseOverId === `${pI}` + `${cI}` + i.toString() && (
                                  <div
                                    className={`absolute z-10 left-10 top-10 w-[180px]  p-[5px] flex flex-col gap-2 outline outline-1 ${
                                      data.type === 'duration' ? 'outline-primary-200' : 'outline-orange-200'
                                    } bg-stone-50 rounded`}
                                    style={{
                                      left: `${cursorPosition.x}px`,
                                      top: `${cursorPosition.y}px`
                                    }}
                                  >
                                    <div
                                      className={`flex flex-col gap-[2px] px-1 py-[5px] rounded ${
                                        data.type == 'duration' ? 'bg-primary-600' : 'bg-orange-500'
                                      }`}
                                    >
                                      <span className="h-4 text-white text-[13px] font-bold ">
                                        {data.startTime.split(':')[0]}:{data.startTime.split(':')[1]}
                                      </span>
                                      <span
                                        className={`w-full h-[15px] ${
                                          data.type === 'duration' ? 'text-primary-200' : 'text-orange-400'
                                        } text-xs font-semibold `}
                                      >
                                        {data.lessonTime}분
                                      </span>
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                      <span
                                        className={`w-full ${
                                          data.type === 'duration' ? 'text-primary-500' : 'text-orange-400'
                                        } text-[14px] font-bold `}
                                      >
                                        {data.name}
                                      </span>
                                      <div className="w-full flex flex-col">
                                        <span
                                          className={`w-full ${
                                            data.type === 'duration' ? 'text-primary-600' : 'text-orange-500'
                                          } text-xs font-bold `}
                                        >
                                          {data.teacher}
                                        </span>
                                        <span
                                          className={`w-full ${
                                            data.type === 'duration' ? 'text-primary-600' : 'text-orange-500'
                                          } text-xs font-bold `}
                                        >
                                          {data.studentNum}명
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div
                                  className={`flex flex-col gap-[2px] px-1 py-[5px] rounded ${
                                    data.type === 'duration' ? 'bg-primary-100' : 'bg-secondary-100'
                                  }`}
                                >
                                  <span
                                    className={`h-4 ${
                                      data.type === 'duration' ? 'text-primary-600' : 'text-secondary-600'
                                    } text-[13px] font-bold`}
                                  >
                                    {data.startTime.split(':')[0]}:{data.startTime.split(':')[1]}
                                  </span>
                                  <span
                                    className={`w-full h-[15px] ${
                                      data.type === 'duration' ? 'text-[#9B81FE]' : 'text-secondary-400'
                                    } text-xs font-semibold`}
                                  >
                                    {data.lessonTime}분
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                  <div
                                    className={`w-full max-h-[42px] overflow-hidden text-ellipsis line-clamp-2 ${
                                      data.type === 'duration' ? 'text-primary-500' : 'text-secondary-500'
                                    } text-[14px] font-bold`}
                                  >
                                    {data.name}
                                  </div>
                                  <span
                                    className={`w-full ${
                                      data.type === 'duration' ? 'text-primary-600' : 'text-secondary-400'
                                    } text-xs font-bold`}
                                  >
                                    {data.teacher}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
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
