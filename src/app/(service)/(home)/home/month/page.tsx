'use client'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import MonthSchedule from '@/components/main/MonthSchedule'
import MonthCalendar from '@/components/common/calendar/MonthCalendar'
import { MonthCalendarDateState } from '@/lib/state/calendar/MonthCalendarDateState'
import { Drawer, DrawerHeader, DrawerItems } from 'flowbite-react'
import { MonthDetailClassState } from '@/lib/state/monthDetailClassState'
import { formatStartTime } from '@/utils'

export default function MonthDateTab() {
  const dateData = useRecoilValue(MonthCalendarDateState)
  const [isOpen, setIsopen] = useState(false)

  const classDetails = useRecoilValue(MonthDetailClassState)
  const setClassDetails = useSetRecoilState(MonthDetailClassState)
  const handleClose = () => {
    setClassDetails({
      day: '',
      classData: []
    })
    setIsopen(false)
  }

  useEffect(() => {
    if (classDetails.classData.length !== 0) {
      setIsopen(true)

      return () => {
        setClassDetails({
          day: '',
          classData: []
        })
      }
    }
  }, [classDetails.classData])

  console.log(classDetails, isOpen)

  return (
    <>
      <MonthCalendar />
      <MonthSchedule dateData={dateData} />
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header />
        <Drawer.Items>
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-4">
              <div className="w-[91px] h-[29px] flex items-center justify-center text-[14px] primary-600-medium rounded px-2 py-1 bg-primary-100">
                {classDetails.day}
              </div>
              <div className="gray-900-bold text-[26px] h-[39px] leading-[39px]">타임라인</div>
            </div>
            <div className="w-full flex flex-col gap-6 max-h-[700px] overflow-auto">
              {classDetails.classData.map((data: any, i: number) => {
                return (
                  <div key={i} className="w-fill flex flex-col gap-2">
                    <span className="gray-800-semibold text-base">{formatStartTime(data.startTime)}</span>
                    <div className="w-full flex flex-col gap-7 border border-1 border-gray-200 rounded-lg p-4">
                      {data.data.map((classData: any, i: number) => {
                        return (
                          <div key={i} className="w-full flex gap-4">
                            <span
                              className={`w-[3px] ${classData.type === 'duration' ? 'bg-primary-600' : 'bg-secondary-600'}`}
                            />
                            <div className="flex-1 flex-col items-start">
                              <div className="flex gap-1.5">
                                <span className="h-[21px] text-[14px] gray-800-medium leading-[21px]">
                                  {classData.teacher}
                                </span>
                                <span className="h-[21px] text-[14px] gray-800-medium leading-[21px]">·</span>
                                <span className="h-[21px] text-[14px] gray-800-medium leading-[21px]">
                                  {classData.room}
                                </span>
                              </div>
                              <div className="gray-800-semibold text-[16px]">{classData.name}</div>
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
        </Drawer.Items>
      </Drawer>
    </>
  )
}
