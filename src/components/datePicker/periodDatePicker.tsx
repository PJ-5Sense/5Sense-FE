'use client'
import Image from 'next/image'

import { useEffect, useState } from 'react'
import { dateDataType } from './dayDatePicker'
import { useGetCalendarData } from '@/hooks/useGetCalendarData'

import allowLeft from 'public/assets/icons/allow_left.svg'
import allowRight from 'public/assets/icons/allow_right.svg'

interface clickedDateType {
  year: undefined | number
  month: undefined | number
  date: undefined | number
}

export default function PeriodDatePicker() {
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

  useEffect(() => {})
  const firstDateList = useGetCalendarData(firstDateData)
  const secondDateList = useGetCalendarData(secondDateData)
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
    /* props.changeParentsDateData({
      year: dateData.year,
      month: dateData.month,
      date: Number(clickedDate)
    }) */
    console.log(firstClickedData.year, firstClickedData.month, firstClickedData.date[0])
    console.log(secondClickedData.year, secondClickedData.month, secondClickedData.date[0])
  }

  const calculateRange = (data: number[], date: number) => {
    const max = Math.max(...data)
    const min = Math.min(...data)

    if (min < date && date < max) {
      return true
    }
  }
  console.log('firstClickedData', firstClickedData)
  console.log('secondClickedData', secondClickedData)
  return (
    <div className="w-[592px] p-4 flex gap-6">
      {/* 첫 번째 달력 */}
      <div className="flex flex-col bg-white gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
        <div className="w-full flex justify-between">
          <Image
            src={allowLeft}
            width={20}
            height={20}
            alt="allowLeft"
            className="cursor-pointer"
            onClick={() => {
              onClickMonthBackHandler(firstDateData, 'first')
              onClickMonthBackHandler(secondDateData, 'second')
            }}
          />
          <div className="w-full text-center gray-900-bold text-xs font-['Pretendard']">
            {firstDateData.year}년 {firstDateData.month + 1}월
          </div>
          {/* <Image
            src={allowRight}
            width={20}
            height={20}
            alt="allowRight"
            className="cursor-pointer"
            onClick={onClickMonthForwardHandler}
          /> */}
        </div>
        {/* 달력 */}
        <div className="w-[252px] h-[238px]">
          <div className="w-full h-[34px] grid grid-cols-7">
            {dateName.map((date, i) => {
              return (
                <div key={i} className="px-1 py-2 ">
                  <div className="text-xs text-center font-semibold text-gray-500 font-['Pretendard']">{date}</div>
                </div>
              )
            })}
          </div>
          {firstDateList.map((data, i) => {
            return (
              <div key={i} className="w-full h-[34px] grid grid-cols-7">
                {data.map((dateData: any, i: number) => {
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
                        'bg-primary-700 border rounded-lg'
                      }
                      /* 두번째 달력 -> 첫번째 달력에 위치해 있을 때 배경 색칠 */
                      ${
                        dateData.clickable &&
                        secondClickedData.year === firstDateData.year &&
                        secondClickedData.month === firstDateData.month &&
                        secondClickedData.date.includes(dateData.date) &&
                        'bg-primary-700 border rounded-lg'
                      }
                      
                      /* 같은 월에서 기간 선택 */
                      ${
                        firstClickedData.date.length === 2 &&
                        calculateRange(firstClickedData.date, dateData.date) &&
                        'bg-red-100'
                      }
                      /* 두번째 달력 -> 첫번쨰 달력에 위치 -> 클릭된 날짜보다 작은 날짜들 배경 색칠 */
                      ${
                        firstClickedData.year !== undefined &&
                        secondClickedData.year !== undefined &&
                        firstDateData.year === secondClickedData.year &&
                        firstDateData.month === secondClickedData.month &&
                        dateData.clickable &&
                        dateData.date < secondClickedData.date[0] &&
                        'bg-red-100'
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
                        'bg-red-100'
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
                        'bg-red-100'
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
                        'bg-red-100'
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
                        /* 첫번쨰 달력에서만 클릭 */
                        if (secondClickedData.date.length === 0) {
                          if (firstClickedData.date.length === 0) {
                            setFirstClickedData(prev => ({
                              ...prev,
                              year: firstDateData.year,
                              month: firstDateData.month,
                              date: [dateData.date]
                            }))
                          }
                          if (firstClickedData.date.length === 1) {
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
                        if (secondClickedData.date.length === 2) {
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
                        if (secondClickedData.date.length === 1) {
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
      <div className="flex flex-col bg-white gap-2 w-[283px] p-4 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0, 0, 0, 0.10)] shadow">
        <div className="w-full flex justify-between">
          {/* <Image
            src={allowLeft}
            width={20}
            height={20}
            alt="allowLeft"
            className="cursor-pointer"
            onClick={onClickMonthBackHandler}
          /> */}
          <div className="w-full text-center gray-900-bold text-xs font-['Pretendard']">
            {secondDateData.year}년 {secondDateData.month + 1}월
          </div>
          <Image
            src={allowRight}
            width={20}
            height={20}
            alt="allowRight"
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
                  <div className="text-xs text-center font-semibold text-gray-500 font-['Pretendard']">{date}</div>
                </div>
              )
            })}
          </div>
          {secondDateList.map((data, i) => {
            return (
              <div key={i} className="w-full h-[34px] grid grid-cols-7">
                {data.map((dateData: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className={`px-1 py-2 cursor-pointer 
                      /* 클릭된 날짜만 배경 칠하기 */
                      ${
                        dateData.clickable &&
                        secondClickedData.year === secondDateData.year &&
                        secondClickedData.month === secondDateData.month &&
                        secondClickedData.date.includes(dateData.date) &&
                        'bg-primary-700 border rounded-lg'
                      }
                      /* 첫번째 달력 -> 두번째 달력에 위치해 있을 때 배경 색칠 */
                      ${
                        dateData.clickable &&
                        firstClickedData.year === secondDateData.year &&
                        firstClickedData.month === secondDateData.month &&
                        firstClickedData.date.includes(dateData.date) &&
                        'bg-primary-700 border rounded-lg'
                      }
                      /* 같은 월에서 기간 선택 */
                      ${
                        secondClickedData.date.length === 2 &&
                        calculateRange(secondClickedData.date, dateData.date) &&
                        'bg-red-100'
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
                        'bg-red-100'
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
                        'bg-red-100'
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
                        'bg-red-100'
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
                        'bg-red-100'
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
                        /* 두번째 달력에서만 클릭 */
                        /* if (firstClickedData.date.length === 0) {
                          if (secondClickedData.date.length === 0) {
                            setSecondClickedData(prev => ({
                              ...prev,
                              year: secondDateData.year,
                              month: secondDateData.month,
                              date: [dateData.date]
                            }))
                          }
                          if (secondClickedData.date.length === 1) {
                            setSecondClickedData(prev => ({
                              ...prev,
                              date: [...prev.date, dateData.date]
                            }))
                          }
                          if (secondClickedData.date.length === 2) {
                            setSecondClickedData(prev => ({
                              ...prev,
                              year: secondDateData.year,
                              month: secondDateData.month,
                              date: [dateData.date]
                            }))
                          }
                        } */
                        /* 첫번째 달력에서 기간 선택 -> 두번째 달력 클릭 */
                        if (firstClickedData.date.length === 2) {
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
                            setSecondClickedData(prev => ({
                              ...prev,
                              year: secondDateData.year,
                              month: secondDateData.month,
                              date: [dateData.date]
                            }))
                          }
                        }
                      }}
                    >
                      <div
                        className={`text-xs text-center 
                      ${
                        (dateData.clickable &&
                          secondClickedData.year === secondDateData.year &&
                          secondClickedData.month === secondDateData.month &&
                          secondClickedData.date.includes(dateData.date)) ||
                        (firstClickedData.year === secondDateData.year &&
                          firstClickedData.month === secondDateData.month &&
                          firstClickedData.date.includes(dateData.date))
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
            className="w-full h-full px-3 py-2 flex justify-center text-sm font-semibold btn-purple"
            onClick={onClickCheckHandler}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  )
}
