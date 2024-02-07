import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import chevronLeft from '../../assets/icons/chevron/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron/chevron-right.svg'
import calender from '../../assets/icons/calendar.svg'
import { useState } from 'react'
import DateSlideTab from './DateSlideTab'
import DayDatePicker from '../datePicker/dayDatePIcker'
import { dateDataType } from '../datePicker/dayDatePIcker'

export default function DayDateTab() {
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const [dateData, setDateData] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })
  const [isClickedDatePicker, setIsClickedDatePicker] = useState<boolean>(false)

  const lastDateOfCurrnetMonthData = new Date(
    dateData.year,
    dateData.month + 1,
    0
  )
  const lastDateOfLastMonthData = new Date(dateData.year, dateData.month, 0)

  const clickDatePicker = () => {
    setIsClickedDatePicker(prev => !prev)
  }

  const moveForwardDay = () => {
    let lastDateOfCurrentMonth = lastDateOfCurrnetMonthData.getDate()

    if (dateData.date === lastDateOfCurrentMonth) {
      if (dateData.month === 11) {
        setDateData({
          ...dateData,
          year: dateData.year + 1,
          month: 0,
          date: 1
        })
      } else {
        setDateData({
          ...dateData,
          month: dateData.month + 1,
          date: 1
        })
      }
    } else {
      setDateData({
        ...dateData,
        date: dateData.date + 1
      })
    }
  }

  const moveBackDay = () => {
    let lastDateOfLastMonth = lastDateOfLastMonthData.getDate()

    if (dateData.date === 1) {
      if (dateData.month === 0) {
        setDateData({
          ...dateData,
          year: dateData.year - 1,
          month: 11,
          date: 31
        })
      } else {
        setDateData({
          ...dateData,
          month: dateData.month - 1,
          date: lastDateOfLastMonth
        })
      }
    } else {
      setDateData({
        ...dateData,
        date: dateData.date - 1
      })
    }
  }

  const setDateDataFromChild = (data: dateDataType) => {
    setDateData({
      ...dateData,
      year: data.year,
      month: data.month,
      date: data.date
    })
    setIsClickedDatePicker(false)
  }
  return (
    <>
      <div className="mt-[80px] w-full flex xl:mx-auto xl:max-w-[1016px] lg:max-w-[936px]">
        <div className="relative mx-auto flex gap-[138px] items-center w-full  h-[52px]  md:w-full ">
          <div
            className={`flex mx-auto ${
              width > 950 ? 'w-[420px]' : 'w-[312px]'
            }  h-full p-1.5 border rounded-md border-gray-100 bg-[#F8FAFD]`}
          >
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveBackDay}
            >
              <Image src={chevronLeft} width={24} height={24} alt=" " />
            </div>
            <div
              className="w-full px-3 py-2 flex justify-center gap-2 items-center gray-900-semibold text-base font-['Pretendard'] hover:text-primary-600 cursor-pointer"
              onClick={clickDatePicker}
            >
              <Image
                src={calender}
                width={18}
                height={18}
                alt=" "
                className="hover:fill-primary-600"
              />
              {dateData.year}년 {dateData.month + 1}월 {dateData.date}일
            </div>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center cursor-pointer"
              onClick={moveForwardDay}
            >
              <Image src={chevronRight} width={24} height={24} alt=" " />
            </div>
          </div>
          <DateSlideTab />
          {isClickedDatePicker && (
            <div className="absolute w-[283px] z-10 right-0 left-0 mx-auto top-[60px]">
              <DayDatePicker
                changeParentsDateData={setDateDataFromChild}
                parentsDateData={dateData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
