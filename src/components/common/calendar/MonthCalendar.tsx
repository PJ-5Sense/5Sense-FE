'use client'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useWindowSize } from '@/hooks/useWindowSize'
import DateSlideTab from '@/components/main/DateSlideTab'
import MonthDatePicker from './datePicker/monthDatePicker'
import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'
import { MonthCalendarDateState } from '@/lib/state/calendar/MonthCalendarDateState'

import ChevronLeft from '@/icons/icon/datePicker/chevronLeft.svg'
import ChevronRight from '@/icons/icon/datePicker/chevronRight.svg'
import CalendarIcon from '@/icons/icon/datePicker/calendar.svg'

export default function MonthCalendar() {
  const { width, height } = useWindowSize()
  const dateData = useRecoilValue(MonthCalendarDateState)
  const setDateData = useSetRecoilState(MonthCalendarDateState)

  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)

  const onClickDatePickerHandler = () => {
    setIsClickedDatePicker(prev => !prev)
  }

  function moveForwardMonth() {
    setIsClickedDatePicker(false)
    if (dateData.month === 11) {
      setDateData({
        ...dateData,
        year: dateData.year + 1,
        month: 0
      })
    } else {
      setDateData({
        ...dateData,
        month: dateData.month + 1
      })
    }
  }

  function moveBackMonth() {
    setIsClickedDatePicker(false)
    if (dateData.month === 0) {
      setDateData({
        ...dateData,
        year: dateData.year - 1,
        month: 11
      })
    } else {
      setDateData({
        ...dateData,
        month: dateData.month - 1
      })
    }
  }

  const handleChangeDateDataFromChild = (data: dateDataType, type: string) => {
    if (type === 'check') {
      setDateData({
        ...dateData,
        year: data.year,
        month: data.month
      })
      setIsClickedDatePicker(false)
    } else {
      setDateData({
        ...dateData,
        year: data.year,
        month: data.month
      })
    }
  }

  return (
    <>
      <div className="w-full flex justify-center xl:mx-auto xl:max-w-[1016px] lg:max-w-[936px]">
        <div className="relative flex gap-[138px] items-center w-full  h-[52px]  md:w-full ">
          <div
            className={`flex mx-auto ${
              width > 950 ? 'w-[420px]' : 'w-[312px]'
            } h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD]`}
          >
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveBackMonth}
            >
              <ChevronLeft />
            </div>
            <div
              className="w-full px-3 py-2 flex justify-center gap-2 items-center gray-900-semibold text-base  hover:text-primary-600 cursor-pointer"
              onClick={onClickDatePickerHandler}
            >
              <CalendarIcon className="text-gray-500" />
              {dateData.year}년 {dateData.month + 1}월
            </div>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardMonth}
            >
              <ChevronRight />
            </div>
          </div>
          <DateSlideTab />
          {isClickedDatePicker && (
            <div className="absolute w-[284px] z-10 right-0 left-0 mx-auto top-[60px]">
              <MonthDatePicker changeParentsDateData={handleChangeDateDataFromChild} parentsDateData={dateData} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
