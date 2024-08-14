'use client'
import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { GetCalendarData } from '../getCalendarData'
import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'

import AllowRight from '@/icons/icon/datePicker/allowRight.svg'
import AllowLeft from '@/icons/icon/datePicker/allowLeft.svg'

export interface dateDataType {
  year: number
  month: number
  date: number
}

interface IProps {
  parentsDateData: dateDataType
  changeParentsDateData?: (data: dateDataType, type?: string) => void
  type?: string
  onClose: () => void
}

export default function DayDatePicker(props: IProps) {
  const calendarDate = useRecoilValue(DayCalendarDateState)
  const setCalendarDate = useSetRecoilState(DayCalendarDateState)
  const dateName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [dateData, setDateData] = useState<dateDataType>(props.parentsDateData)
  const [clickedDate, setClickedDate] = useState<string>(`${dateData.date}`)

  let dateList
  dateList = GetCalendarData(dateData, props.type)

  const onClickDateHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickedDate(e.currentTarget.id)
  }

  const onClickMonthForwardHandler = () => {
    if (dateData.year === 2025 && dateData.month === 11) {
      return
    }
    if (dateData.month === 11) {
      setDateData((preDateData: dateDataType) => ({
        ...preDateData,
        year: preDateData.year + 1,
        month: 0
      }))
    } else {
      setDateData((preDateData: dateDataType) => ({
        ...preDateData,
        month: preDateData.month + 1
      }))
    }
  }

  const onClickMonthBackHandler = () => {
    if (dateData.year === 2021 && dateData.month === 0) {
      return
    }
    if (dateData.month === 0) {
      setDateData((preDateData: dateDataType) => ({
        ...preDateData,
        year: preDateData.year - 1,
        month: 11
      }))
    } else {
      setDateData((preDateData: dateDataType) => ({
        ...preDateData,
        month: preDateData.month - 1
      }))
    }
  }

  const onClickCancelHandler = () => {
    setClickedDate('')
  }

  const onClickCheckHandler = () => {
    setCalendarDate(prev => ({
      ...prev,
      year: dateData.year,
      month: dateData.month,
      date: Number(clickedDate)
    }))
    props.onClose()
  }

  return (
    <div className="w-full flex flex-col bg-white gap-2 p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
      <div className="w-full flex justify-between items-center">
        <AllowLeft className="cursor-pointer" onClick={onClickMonthBackHandler} />
        <div className="w-[126px] text-center gray-900-bold text-xs ">
          {dateData.year}년 {dateData.month + 1}월
        </div>
        <AllowRight className="cursor-pointer" onClick={onClickMonthForwardHandler} />
      </div>
      {/* 달력 */}
      <div className="w-[252px]">
        <div className="w-full h-[34px] grid grid-cols-7">
          {dateName.map((date, i) => {
            return (
              <div key={i} className="px-1 py-2 ">
                <div className="text-xs text-center font-semibold text-gray-500 ">{date}</div>
              </div>
            )
          })}
        </div>
        {dateList.map((data, i) => {
          return (
            <div key={i} className="w-full h-[34px] grid grid-cols-7">
              {data.map((dateData: any, i: number) => {
                return (
                  <div
                    key={i}
                    id={dateData.date !== undefined && dateData.date.toString()}
                    className={`px-1 py-2 cursor-pointer ${
                      dateData.date !== undefined && clickedDate === dateData.date.toString() && dateData.clickable
                        ? 'bg-primary-700 border rounded-lg'
                        : ''
                    }`}
                    onClick={e => {
                      dateData.clickable && onClickDateHandler(e)
                    }}
                  >
                    <div
                      className={`text-xs text-center ${
                        dateData.date !== undefined && clickedDate === dateData.date.toString() && dateData.clickable
                          ? 'text-white font-bold'
                          : `${dateData.textColor}`
                      } `}
                    >
                      {dateData.date}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="w-full flex h-[37px] justify-between">
        <button
          className="w-[121px] h-full px-3 py-2 flex justify-center btn-white text-sm gray-800-semibold"
          onClick={onClickCancelHandler}
        >
          취소
        </button>
        <button
          className="w-[121px] h-full px-3 py-2 text-sm btn-purple"
          onClick={() => {
            console.log(calendarDate)
            onClickCheckHandler()
            if (props.changeParentsDateData) {
              const data = {
                year: dateData.year,
                month: dateData.month,
                date: Number(clickedDate)
              }
              props.changeParentsDateData(data, 'session')
            }
          }}
        >
          확인
        </button>
      </div>
    </div>
  )
}
