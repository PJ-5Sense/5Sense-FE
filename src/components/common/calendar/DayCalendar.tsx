'use client'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import DateSlideTab from '@/components/main/DateSlideTab'
import DayDatePicker from '@/components/common/calendar/datePicker/dayDatePIcker'
import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'
import { useWindowSize } from '@/hooks/useWindowSize'

import ChevronLeft from '@/icons/icon/datePicker/chevronLeft.svg'
import ChevronRight from '@/icons/icon/datePicker/chevronRight.svg'
import CalendarIcon from '@/icons/icon/datePicker/calendar.svg'

export default function Calendar({ page }: { page: string }) {
  const { width, height } = useWindowSize()
  const calendarDate = useRecoilValue(DayCalendarDateState)
  const setCalendarDate = useSetRecoilState(DayCalendarDateState)

  const lastDateOfCurrnetMonthData = new Date(calendarDate.year, calendarDate.month + 1, 0)
  const lastDateOfLastMonthData = new Date(calendarDate.year, calendarDate.month, 0)

  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)

  const onClickDatePickerHandler = () => {
    setIsClickedDatePicker(prev => !prev)
  }

  const moveForwardDay = () => {
    setIsClickedDatePicker(false)
    let lastDateOfCurrentMonth = lastDateOfCurrnetMonthData.getDate()

    if (calendarDate.date === lastDateOfCurrentMonth) {
      if (calendarDate.month === 11) {
        setCalendarDate(prev => ({
          ...calendarDate,
          year: calendarDate.year + 1,
          month: 0,
          date: 1
        }))
      } else {
        setCalendarDate(calendarDate => ({
          ...calendarDate,
          month: calendarDate.month + 1,
          date: 1
        }))
      }
    } else {
      setCalendarDate(calendarDate => ({
        ...calendarDate,
        date: calendarDate.date + 1
      }))
    }
  }

  const moveBackDay = () => {
    setIsClickedDatePicker(false)
    let lastDateOfLastMonth = lastDateOfLastMonthData.getDate()
    if (calendarDate.date === 1) {
      if (calendarDate.month === 0) {
        setCalendarDate(calendarDate => ({
          ...calendarDate,
          year: calendarDate.year - 1,
          month: 11,
          date: 31
        }))
      } else {
        setCalendarDate(calendarDate => ({
          ...calendarDate,
          month: calendarDate.month - 1,
          date: lastDateOfLastMonth
        }))
      }
    } else {
      setCalendarDate(calendarDate => ({
        ...calendarDate,
        date: calendarDate.date - 1
      }))
    }
  }

  const onCloseDatePicker = () => {
    setIsClickedDatePicker(false)
  }

  return (
    <div className="w-full flex xl:mx-auto xl:max-w-[1016px] lg:max-w-[936px]">
      <div className="relative mx-auto flex gap-[138px] w-full  h-[52px]  md:w-full ">
        <div
          className={`flex mx-auto ${
            width > 950 ? 'w-[420px]' : 'w-[312px]'
          } h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD]`}
        >
          <div
            className="h-10 w-10 border p-2 rounded border-gray-200 bg-white flex items-center cursor-pointer"
            onClick={moveBackDay}
          >
            <ChevronLeft />
          </div>
          <div
            className={`w-full px-3 py-2 flex justify-center gap-2 items-center ${
              isClickedDatePicker ? 'text-primary-600' : 'text-gray-900'
            } hover:text-primary-600 cursor-pointer`}
            onClick={onClickDatePickerHandler}
          >
            <CalendarIcon className="text-gray-500" />
            <span className="h-6 flex items-center font-semibold text-[16px]">
              {calendarDate.year}년 {calendarDate.month + 1}월 {calendarDate.date}일
            </span>
          </div>
          <div
            className="h-10 w-10 border p-2 rounded border-gray-200 bg-white flex items-center cursor-pointer"
            onClick={moveForwardDay}
          >
            <ChevronRight />
          </div>
        </div>
        {page === 'main' && <DateSlideTab />}
        {isClickedDatePicker && (
          <div className="absolute w-[284px] z-10 right-0 left-0 mx-auto top-[60px]">
            <DayDatePicker parentsDateData={calendarDate} onClose={onCloseDatePicker} />
          </div>
        )}
      </div>
    </div>
  )
}
