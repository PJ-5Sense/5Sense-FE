'use client'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import DateSlideTab from '@/components/main/DateSlideTab'
import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'
import DayDatePicker from '@/components/common/calendar/datePicker/dayDatePIcker'
import { calendarDateState } from '@/lib/state/calendarDateState'

import ChevronLeft from '@/icons/icon/chevronLefyt.svg'
import ChevronRight from '@/icons/icon/chevronRight.svg'
import CalendarIcon from '@/icons/icon/calendar.svg'

export default function Calendar({ page }: { page: string }) {
  const calendarDate = useRecoilValue(calendarDateState)
  const setCalendarDate = useSetRecoilState(calendarDateState)

  const currentDate = new Date()
  const [dateData, setDateData] = useState<dateDataType>(calendarDate)
  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)

  const lastDateOfCurrnetMonthData = new Date(calendarDate.year, calendarDate.month + 1, 0)
  const lastDateOfLastMonthData = new Date(calendarDate.year, calendarDate.month, 0)

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
    console.log(lastDateOfLastMonth)
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
      <div className="relative mx-auto flex gap-[138px] items-center w-full  h-[52px]  md:w-full ">
        <div className={`flex mx-auto w-[420px] h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD]`}>
          <div
            className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
            onClick={moveBackDay}
          >
            <ChevronLeft />
          </div>
          <div
            className={`w-full px-3 py-2 flex justify-center gap-2 items-center ${
              isClickedDatePicker ? 'text-primary-600' : 'text-gray-900'
            } font-semibold text-base  hover:text-primary-600 cursor-pointer`}
            onClick={onClickDatePickerHandler}
          >
            <CalendarIcon />
            {calendarDate.year}년 {calendarDate.month + 1}월 {calendarDate.date}일
          </div>
          <div
            className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
            onClick={moveForwardDay}
          >
            <ChevronRight />
          </div>
        </div>
        {page === 'main' && <DateSlideTab />}
        {isClickedDatePicker && (
          <div className="absolute w-[283px] z-10 right-0 left-0 mx-auto top-[60px]">
            <DayDatePicker parentsDateData={calendarDate} onClose={onCloseDatePicker} />
          </div>
        )}
      </div>
    </div>
  )
}
