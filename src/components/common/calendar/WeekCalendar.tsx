'use client'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useWindowSize } from '@/hooks/useWindowSize'
import DateSlideTab from '@/components/main/DateSlideTab'
import WeekDatePicker from '@/components/common/calendar/datePicker/weekDatePicker'
import GetWeekList from './getWeekList'
import { WeekCalendarDateState } from '@/lib/state/calendar/WeekCalendarDateState'
import { modalState } from '@/lib/state/modal'

import ChevronLeft from '@/icons/icon/datePicker/chevronLeft.svg'
import ChevronRight from '@/icons/icon/datePicker/chevronRight.svg'
import CalendarIcon from '@/icons/icon/datePicker/calendar.svg'

export default function WeekCalendar() {
  const weekData = useRecoilValue(WeekCalendarDateState)
  const setWeekData = useSetRecoilState(WeekCalendarDateState)
  const dateTabData = GetWeekList(weekData.year, weekData.month)

  const weekLength = {
    currentMonth: GetWeekList(weekData.year, weekData.month).length,
    lastMonth: GetWeekList(weekData.year, weekData.month - 1).length
  }
  const { width, height } = useWindowSize()
  const currentDateData = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate()
  }
  const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)
  const [isClickedArrow, setIsClickedArrow] = useState<boolean>(false)
  const [clickArrowCount, setClickArrowCount] = useState(0)

  const onClickDatePickerHandler = () => {
    setIsClickedDatePicker(prev => !prev)
  }

  const moveForwardWeek = () => {
    const lastWeekOfMonth = weekLength.currentMonth
    setClickArrowCount(clickArrowCount => (clickArrowCount += 1))
    if (weekData.week === lastWeekOfMonth) {
      if (weekData.month === 11) {
        setWeekData(prev => ({
          ...prev,
          year: weekData.year + 1,
          month: 0,
          week: 1
        }))
      } else {
        setWeekData(prev => ({
          ...prev,
          month: weekData.month + 1,
          week: 1
        }))
      }
    } else {
      setWeekData(prev => ({
        ...prev,
        week: prev.week + 1
      }))
    }
    setIsClickedArrow(true)
    setIsClickedDatePicker(false)
  }

  const moveBackWeek = () => {
    setClickArrowCount(clickArrowCount => (clickArrowCount += 1))
    if (weekData.week === 1) {
      if (weekData.month === 0) {
        setWeekData(prev => ({
          ...prev,
          year: weekData.year - 1,
          month: 11,
          week: weekLength.lastMonth
        }))
      } else {
        setWeekData(prev => ({
          ...prev,
          month: weekData.month - 1,
          week: weekLength.lastMonth
        }))
      }
    } else {
      setWeekData(prev => ({
        ...prev,
        week: prev.week - 1
      }))
    }
    setIsClickedArrow(true)
    setIsClickedDatePicker(false)
  }

  const handleChangeIsClickedDatePicker = () => {
    setIsClickedDatePicker(false)
  }

  return (
    <>
      <div className="w-full flex xl:mx-auto xl:max-w-[1016px] lg:max-w-[936px]">
        <div className="relative mx-auto flex gap-[138px] items-center w-full  h-[52px]  md:w-full ">
          <div
            className={`flex mx-auto ${
              width > 950 ? 'w-[420px]' : 'w-[312px]'
            }  h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD]`}
          >
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveBackWeek}
            >
              <ChevronLeft />
            </div>
            <div
              className="w-full px-3 py-2 flex justify-center gap-2 items-center gray-900-semibold text-base  cursor-pointer hover:text-primary-600"
              onClick={onClickDatePickerHandler}
            >
              <CalendarIcon className="text-gray-500" />
              {weekData.year}년 {weekData.month + 1}월 {weekData.week}주차
            </div>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardWeek}
            >
              <ChevronRight />
            </div>
          </div>
          <DateSlideTab />
          {/* 주 단위 달력 */}
          {isClickedDatePicker && (
            <div className="absolute w-[284px] z-10 right-0 left-0 mx-auto top-[60px]">
              <WeekDatePicker handleChangeIsClickedDatePicker={handleChangeIsClickedDatePicker} />
            </div>
          )}
        </div>
      </div>
      {/* 요일 탭 */}
      <div className="w-full flex max-w-[1016px] mx-auto justify-end pt-[32px]">
        <div className="w-[50px] xl:mr-5 lg:mr-4 md:mr-[14px] mr-3.5"></div>
        <div className="w-full grid grid-cols-7 gap-[7px]">
          {dateTabData[weekData.week - 1]?.date.map((data: any, i: number) => {
            return (
              <div
                key={i}
                id={data.date}
                className={`xl:max-w-[129px] lg:max-w-[119px] h-full px-3 py-2 flex flex-col border rounded-lg bg-white
                ${
                  currentDateData.year === weekData.year &&
                  currentDateData.month === weekData.month &&
                  currentDateData.date === Number(data.date)
                    ? 'text-primary-600 border-primary-600'
                    : 'text-gray-400 border-gray-200'
                }`}
              >
                <div className={`text-center text-sm font-medium `}>{dayName[i]}</div>
                <div className={`text-center text-xl font-bold`}>{data.date}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
