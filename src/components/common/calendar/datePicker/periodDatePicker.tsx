'use client'

import { useState } from 'react'
import { dateDataType } from './dayDatePIcker'
import { GetCalendarData } from '../getCalendarData'
import AllowLeftIcon from 'public/assets/icons/allow_left.svg'
import AllowRightIcon from 'public/assets/icons/allow_right.svg'

interface IProps {
  changeParentDateData: (
    data: { year: number | undefined; month: number | undefined; date: number[] }[],
    type: string
  ) => void
}

export default function PeriodDatePicker(props: IProps) {
  const currentDate = new Date()
  const dateName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const [firstDateData, setFirstDateData] = useState<dateDataType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })

  const [secondDateData, setSecondDateData] = useState<dateDataType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  })

  let firstDateList
  firstDateList = GetCalendarData(firstDateData, 'addClass')

  const secondDateList = GetCalendarData(secondDateData)
  const [firstClickedData, setFirstClickedData] = useState<{
    year: number | undefined
    month: number | undefined
    date: number[]
  }>({
    year: undefined,
    month: undefined,
    date: []
  })

  const [secondClickedData, setSecondClickedData] = useState<{
    year: number | undefined
    month: number | undefined
    date: number[]
  }>({
    year: undefined,
    month: undefined,
    date: []
  })

  const onClickMonthForwardHandler = (dateData: dateDataType, type: string) => {
    if (dateData.year === 2025 && dateData.month === 11) {
      return
    }
    if (dateData.month === 11) {
      if (type === 'first') {
        setFirstDateData((preDateData: dateDataType) => ({
          ...preDateData,
          year: preDateData.year + 1,
          month: 0
        }))
      } else if (type === 'second') {
        setSecondDateData((preDateData: dateDataType) => ({
          ...preDateData,
          year: preDateData.year + 1,
          month: 0
        }))
      }
    } else {
      if (type === 'first') {
        setFirstDateData((preDateData: dateDataType) => ({
          ...preDateData,
          month: preDateData.month + 1
        }))
      } else if (type === 'second') {
        setSecondDateData((preDateData: dateDataType) => ({
          ...preDateData,
          month: preDateData.month + 1
        }))
      }
    }
  }

  const onClickMonthBackHandler = (dateData: dateDataType, type: string) => {
    if (
      dateData.year === currentDate.getFullYear() &&
      ((type === 'first' && dateData.month === currentDate.getMonth()) ||
        (type === 'second' && dateData.month === currentDate.getMonth() + 1))
    ) {
      return
    }
    if (dateData.year === 2021 && dateData.month === 0) {
      return
    }
    if (dateData.month === 0) {
      if (type === 'first') {
        setFirstDateData((preDateData: dateDataType) => ({
          ...preDateData,
          year: preDateData.year - 1,
          month: 11
        }))
      } else if (type === 'second') {
        setSecondDateData((preDateData: dateDataType) => ({
          ...preDateData,
          year: preDateData.year - 1,
          month: 11
        }))
      }
    } else {
      if (type === 'first') {
        setFirstDateData((preDateData: dateDataType) => ({
          ...preDateData,
          month: preDateData.month - 1
        }))
      } else if (type === 'second') {
        setSecondDateData((preDateData: dateDataType) => ({
          ...preDateData,
          month: preDateData.month - 1
        }))
      }
    }
  }

  const onClickCancelHandler = () => {
    setFirstClickedData(prev => ({
      ...prev,
      year: undefined,
      month: undefined,
      date: []
    }))
    setSecondClickedData(prev => ({
      ...prev,
      year: undefined,
      month: undefined,
      date: []
    }))
  }

  const onClickCheckHandler = () => {
    if (firstClickedData.date.length === 2) {
      props.changeParentDateData([firstClickedData], 'duration')
    }
    if (firstClickedData.date.length === 1 && secondClickedData.date.length === 1) {
      props.changeParentDateData([firstClickedData, secondClickedData], 'duration')
    }
  }

  const calculateRange = (data: number[], date: number) => {
    const max = Math.max(...data)
    const min = Math.min(...data)

    if (min < date && date < max) {
      return true
    }
  }

  return (
    <div className="w-[592px] bg-white p-4 flex gap-6 rounded-lg border border-1 border-primary-600 shadow">
      {/* 첫 번째 달력 */}
      <div className="flex flex-col bg-white gap-2 w-full rounded-lg">
        <div className="w-full flex justify-between">
          {firstDateData.year === currentDate.getFullYear() && firstDateData.month === currentDate.getMonth() ? null : (
            <AllowLeftIcon
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => {
                onClickMonthBackHandler(firstDateData, 'first')
                onClickMonthBackHandler(secondDateData, 'second')
              }}
            />
          )}
          <div className="w-full h-5 text-center gray-900-bold text-xs">
            {firstDateData.year}년 {firstDateData.month + 1}월
          </div>
        </div>
        {/* 달력 */}
        <div className="w-[252px] h-[238px]">
          <div className="w-full h-[34px] grid grid-cols-7">
            {dateName.map((date, i) => {
              return (
                <div key={i} className="px-1 py-2 ">
                  <div className="text-xs text-center font-semibold text-gray-500 ">{date}</div>
                </div>
              )
            })}
          </div>
          {firstDateList.map((data, i) => {
            return (
              <div key={i} className="w-full h-[34px] grid grid-cols-7">
                {data.map((dateData: any, i: number) => {
                  let first = 0
                  let second = 0
                  const sorted = firstClickedData.date.sort()
                  first = sorted[0]
                  second = sorted[1]
                  return (
                    <div
                      key={i}
                      className={`px-1 py-2 cursor-pointer 
                      /* 클릭된 날짜만 배경 칠하기 */
                      ${
                        dateData.clickable &&
                        firstClickedData.year === firstDateData.year &&
                        firstClickedData.month === firstDateData.month &&
                        firstClickedData.date.includes(dateData.date) &&
                        (dateData.date === first
                          ? 'bg-primary-700 border rounded-l-lg'
                          : 'bg-primary-700 border rounded-r-lg')
                      }
                      /* 두번째 달력 -> 첫번째 달력에 위치해 있을 때 배경 색칠 */
                       ${
                         dateData.clickable &&
                         secondClickedData.year === firstDateData.year &&
                         secondClickedData.month === firstDateData.month &&
                         secondClickedData.date.includes(dateData.date) &&
                         'bg-primary-700 border rounded-r-lg'
                       }
                      
                      /* 같은 월에서 기간 선택 */
                      ${
                        firstClickedData.date.length === 2 &&
                        firstClickedData.year === firstDateData.year &&
                        firstClickedData.month === firstDateData.month &&
                        calculateRange(firstClickedData.date, dateData.date) &&
                        'bg-primary-50'
                      }
                      /* 두번째 달력 -> 첫번쨰 달력에 위치 -> 클릭된 날짜보다 작은 날짜들 배경 색칠 */
                      ${
                        firstClickedData.year !== undefined &&
                        secondClickedData.year !== undefined &&
                        firstDateData.year === secondClickedData.year &&
                        firstDateData.month === secondClickedData.month &&
                        dateData.clickable &&
                        dateData.date < secondClickedData.date[0] &&
                        'bg-primary-50'
                      }
                      /* 다른 월에서 기간 선택 -> 첫번째 달력 클릭 날짜보다 큰 날짜들만 색칠 */
                      ${
                        firstClickedData.year !== undefined &&
                        firstClickedData.month !== undefined &&
                        firstClickedData.date.length === 1 &&
                        secondClickedData.date.length === 1 &&
                        firstClickedData.year === firstDateData.year &&
                        firstClickedData.month === firstDateData.month &&
                        dateData.date > firstClickedData.date[0] &&
                        'bg-primary-50'
                      }
                      /* 첫번째 달력 클릭 날짜 < 현재 첫번째 달력 < 두번째 달력 클릭 날짜 */
                      ${
                        firstClickedData.date.length === 1 &&
                        secondClickedData.date.length === 1 &&
                        secondClickedData.month !== undefined &&
                        firstClickedData.month !== undefined &&
                        firstClickedData.month !== firstDateData.month &&
                        firstDateData.year === secondClickedData.year &&
                        secondClickedData.month > firstDateData.month &&
                        firstDateData.month > firstClickedData.month &&
                        dateData.clickable &&
                        'bg-primary-50'
                      }
                      /* 첫번째 달력 클릭 연도 !== 두번째 달력 클릭 연도 */
                      ${
                        dateData.clickable &&
                        firstClickedData.year !== undefined &&
                        secondClickedData.year !== undefined &&
                        firstClickedData.month !== undefined &&
                        secondClickedData.month !== undefined &&
                        secondClickedData.year > firstClickedData.year &&
                        ((firstDateData.year === firstClickedData.year &&
                          firstDateData.month > firstClickedData.month) ||
                          (firstClickedData.year < firstDateData.year &&
                            firstDateData.month < secondClickedData.month)) &&
                        'bg-primary-50'
                      }
                      `}
                      onClick={() => {
                        /* 중복된 날짜 클릭 방지 */
                        if (
                          firstClickedData.year === firstDateData.year &&
                          firstClickedData.month === firstDateData.month &&
                          firstClickedData.date.length === 1 &&
                          firstClickedData.date[0] === dateData.date
                        ) {
                          return
                        }
                        if (
                          firstClickedData.date.length === 1 &&
                          firstDateData.month !== firstClickedData.month &&
                          dateData.clickable
                        ) {
                          setFirstClickedData(prev => ({
                            ...prev,
                            year: firstDateData.year,
                            month: firstDateData.month,
                            date: [dateData.date]
                          }))
                        }
                        /* 첫번째 달력에서만 클릭 */
                        if (secondClickedData.date.length === 0 && dateData.clickable) {
                          if (firstClickedData.date.length === 0) {
                            setFirstClickedData(prev => ({
                              ...prev,
                              year: firstDateData.year,
                              month: firstDateData.month,
                              date: [dateData.date]
                            }))
                          }
                          if (
                            firstClickedData.date.length === 1 &&
                            firstClickedData.year === firstDateData.year &&
                            firstClickedData.month === firstDateData.month
                          ) {
                            setFirstClickedData(prev => ({
                              ...prev,
                              date: [...prev.date, dateData.date]
                            }))
                          }
                          if (firstClickedData.date.length === 2) {
                            setFirstClickedData(prev => ({
                              ...prev,
                              year: firstDateData.year,
                              month: firstDateData.month,
                              date: [dateData.date]
                            }))
                          }
                        }
                        /* 두번째 달력에서 기간 선택 -> 첫번째 달력 클릭 */
                        if (secondClickedData.date.length === 2 && dateData.clickable) {
                          if (firstClickedData.date.length === 0) {
                            setFirstClickedData(prev => ({
                              ...prev,
                              year: firstDateData.year,
                              month: firstDateData.month,
                              date: [dateData.date]
                            }))
                            setSecondClickedData(prev => ({
                              ...prev,
                              year: undefined,
                              month: undefined,
                              date: []
                            }))
                          }
                        }
                        /* 두번째 달력 1클릭 -> 첫번째 달력 1클릭 */
                        if (secondClickedData.date.length === 1 && dateData.clickable) {
                          if (firstClickedData.date.length === 0) {
                            setFirstClickedData(prev => ({
                              ...prev,
                              year: firstDateData.year,
                              month: firstDateData.month,
                              date: [dateData.date]
                            }))
                            setSecondClickedData(prev => ({
                              ...prev,
                              year: undefined,
                              month: undefined,
                              date: []
                            }))
                          }
                          if (firstClickedData.date.length === 1) {
                            setFirstClickedData(prev => ({
                              ...prev,
                              year: firstDateData.year,
                              month: firstDateData.month,
                              date: [dateData.date]
                            }))
                            setSecondClickedData(prev => ({
                              ...prev,
                              year: undefined,
                              month: undefined,
                              date: []
                            }))
                          }
                        }
                      }}
                    >
                      <div
                        className={`text-xs text-center  ${
                          (dateData.clickable &&
                            firstClickedData.year === firstDateData.year &&
                            firstClickedData.month === firstDateData.month &&
                            firstClickedData.date.includes(dateData.date)) ||
                          (firstDateData.year === secondClickedData.year &&
                            firstDateData.month === secondClickedData.month &&
                            secondClickedData.date.includes(dateData.date))
                            ? 'text-white'
                            : dateData.textColor
                        } 
                        `}
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
        <div className="w-full h-[37px]">
          <div
            className="w-full h-full px-3 py-2 flex justify-center btn-white text-sm gray-800-semibold"
            onClick={onClickCancelHandler}
          >
            취소
          </div>
        </div>
      </div>
      {/* 두번째 달력 */}
      <div className="flex flex-col bg-white gap-2 w-full">
        <div className="w-full flex justify-between">
          <div className="w-full h-5 text-center gray-900-bold text-xs">
            {secondDateData.year}년 {secondDateData.month + 1}월
          </div>
          <AllowRightIcon
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => {
              onClickMonthForwardHandler(firstDateData, 'first')
              onClickMonthForwardHandler(secondDateData, 'second')
            }}
          />
        </div>
        {/* 두번째 달력 */}
        <div className="w-[252px] h-[238px]">
          <div className="w-full h-[34px] grid grid-cols-7">
            {dateName.map((date, i) => {
              return (
                <div key={i} className="px-1 py-2 ">
                  <div className="text-xs text-center font-semibold text-gray-500 ">{date}</div>
                </div>
              )
            })}
          </div>
          {secondDateList.map((data, i) => {
            return (
              <div key={i} className="w-full h-[34px] grid grid-cols-7">
                {data.map((dateData: any, i: number) => {
                  let first = 0
                  let second = 0
                  const sorted = firstClickedData.date.sort()
                  first = sorted[0]
                  second = sorted[1]
                  return (
                    <div
                      key={i}
                      className={`px-1 py-2 cursor-pointer 
                      /* 클릭된 날짜만 배경 칠하기 */
                      /* ${
                        dateData.clickable &&
                        secondClickedData.year === secondDateData.year &&
                        secondClickedData.month === secondDateData.month &&
                        secondClickedData.date.includes(dateData.date) &&
                        'bg-primary-700 border rounded-r-lg'
                      } */
                      ${
                        dateData.clickable &&
                        firstClickedData.date.length === 2 &&
                        firstClickedData.year === secondDateData.year &&
                        firstClickedData.month === secondDateData.month &&
                        firstClickedData.date.includes(dateData.date) &&
                        (dateData.date === first
                          ? 'bg-primary-700 border rounded-l-lg'
                          : 'bg-primary-700 border rounded-r-lg')
                      }
                      /* 첫번째 달력 -> 두번째 달력에 위치해 있을 때 배경 색칠 */
                      
                      ${
                        dateData.clickable &&
                        firstClickedData.date.length === 1 &&
                        firstClickedData.year === secondDateData.year &&
                        firstClickedData.month === secondDateData.month &&
                        firstClickedData.date.includes(dateData.date) &&
                        'bg-primary-700 border rounded-l-lg'
                      }
                      /* 같은 월에서 기간 선택 */
                      ${
                        firstClickedData.date.length === 2 &&
                        firstClickedData.year === secondDateData.year &&
                        firstClickedData.month === secondDateData.month &&
                        calculateRange(firstClickedData.date, dateData.date) &&
                        'bg-primary-50'
                      }
                      
                      /* 첫번쩨 달력 -> 두번째 달력 -> 클릭된 날짜보다 큰 날짜들 배경 색칠 */
                      ${
                        firstClickedData.date.length === 1 &&
                        secondClickedData.date.length === 1 &&
                        firstClickedData.year !== undefined &&
                        firstClickedData.month != undefined &&
                        firstClickedData.year === secondDateData.year &&
                        firstClickedData.month === secondDateData.month &&
                        firstClickedData.date[0] < dateData.date &&
                        dateData.clickable &&
                        'bg-primary-50'
                      }
                      /* 다른 월에서 기간 선택 -> 두번째 달력 클릭 날짜보다 작은 날짜들만 색칠 */
                      ${
                        secondClickedData.year !== undefined &&
                        secondClickedData.month !== undefined &&
                        firstClickedData.date.length === 1 &&
                        secondClickedData.date.length === 1 &&
                        secondClickedData.year === secondDateData.year &&
                        secondClickedData.month === secondDateData.month &&
                        secondClickedData.date[0] > dateData.date &&
                        'bg-primary-50'
                      }
                      /* 첫번째 달력 클릭 날짜 < 두번째 달력 < 두번째 달력 클릭 날짜 */
                      ${
                        firstClickedData.date.length === 1 &&
                        secondClickedData.date.length === 1 &&
                        firstClickedData.month !== undefined &&
                        secondClickedData.month !== undefined &&
                        secondClickedData.month !== secondDateData.month &&
                        firstClickedData.year === secondDateData.year &&
                        secondDateData.month > firstClickedData.month &&
                        secondDateData.month < secondClickedData.month &&
                        dateData.clickable &&
                        'bg-primary-50'
                      }
                      /* 첫번쨰 달력 클릭 연도 !== 두번쨰 달력 클릭 연도 */
                      ${
                        dateData.clickable &&
                        firstClickedData.year !== undefined &&
                        secondClickedData.year !== undefined &&
                        secondClickedData.month !== undefined &&
                        firstClickedData.month !== undefined &&
                        firstClickedData.year < secondClickedData.year &&
                        ((secondDateData.year === secondClickedData.year &&
                          secondDateData.month < secondClickedData.month) ||
                          (secondClickedData.year > secondDateData.year &&
                            secondDateData.month > firstClickedData.month)) &&
                        'bg-primary-50'
                      }
                      `}
                      onClick={() => {
                        /* 중복된 날짜 클릭 방지 */
                        if (
                          secondClickedData.year === secondDateData.year &&
                          secondClickedData.month === secondDateData.month &&
                          secondClickedData.date.length === 1 &&
                          secondClickedData.date[0] === dateData.date
                        ) {
                          return
                        }
                        /* 첫번째 달력에서 기간 선택 -> 두번째 달력 클릭 */
                        if (firstClickedData.date.length === 2) {
                          if (
                            (firstClickedData.year === secondDateData.year &&
                              firstClickedData.month !== undefined &&
                              firstClickedData.month > secondDateData.month) ||
                            (firstClickedData.year !== undefined && firstClickedData.year < secondDateData.year)
                          ) {
                            const min = Math.min(...firstClickedData.date)
                            if (secondClickedData.date.length === 0) {
                              setFirstClickedData(prev => ({
                                ...prev,
                                date: [min]
                              }))
                              setSecondClickedData(prev => ({
                                ...prev,
                                year: secondDateData.year,
                                month: secondDateData.month,
                                date: [dateData.date]
                              }))
                            }
                          }
                        }
                        /* 첫번째 달력 1클릭 -> 두번째 달력 1클릭 */
                        if (firstClickedData.date.length === 1) {
                          if (secondClickedData.date.length === 0) {
                            setSecondClickedData(prev => ({
                              ...prev,
                              year: secondDateData.year,
                              month: secondDateData.month,
                              date: [dateData.date]
                            }))
                          }
                          if (secondClickedData.date.length === 1) {
                            if (
                              (firstClickedData.year === secondDateData.year &&
                                firstClickedData.month !== undefined &&
                                firstClickedData.month < secondDateData.month) ||
                              (firstClickedData.year !== undefined && firstClickedData.year < secondDateData.year)
                            ) {
                              setSecondClickedData(prev => ({
                                ...prev,
                                year: secondDateData.year,
                                month: secondDateData.month,
                                date: [dateData.date]
                              }))
                            }
                          }
                        }
                      }}
                    >
                      <div
                        className={`text-xs text-center 
                      ${
                        dateData.clickable &&
                        ((secondClickedData.year === secondDateData.year &&
                          secondClickedData.month === secondDateData.month &&
                          secondClickedData.date.includes(dateData.date)) ||
                          (firstClickedData.year === secondDateData.year &&
                            firstClickedData.month === secondDateData.month &&
                            firstClickedData.date.includes(dateData.date)))
                          ? 'text-white'
                          : dateData.textColor
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
        <div className="w-full h-[37px]">
          <div
            className="w-full h-full  px-3 py-2 flex justify-center btn-purple text-sm"
            onClick={onClickCheckHandler}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  )
}
