import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import calender from '../../assets/icons/calendar.svg'
import { useState, useEffect } from 'react'
import DateSlideTab from './DateSlideTab'

export default function WeekDateTab() {
  const [dayData, setDayData] = useState<any>([
    {
      day: '일요일',
      date: 0
    },
    {
      day: '월요일',
      date: 0
    },
    {
      day: '화요일',
      date: 0
    },
    {
      day: '수요일',
      date: 0
    },
    {
      day: '목요일',
      date: 0
    },
    {
      day: '금요일',
      date: 0
    },
    {
      day: '토요일',
      date: 0
    }
  ])
  const { width, height } = useWindowSize()
  const currentDate = new Date()
  const dateData: { year: number; month: number; date: number } = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    date: currentDate.getDate()
  }
  //console.log('dateData', dateData)

  let [week, setWeek] = useState<any>()

  //console.log(currentDate.getDay())
  useEffect(() => {
    function calculateWeekNum() {
      let calculateEarlyMonthVar: number
      if (dateData.month == 1) {
        calculateEarlyMonthVar = 0
      } else {
        calculateEarlyMonthVar = dateData.month - 1
      }
      let calculateEndMonthVar: number = dateData.month

      const currentMonthFirstDateDate = new Date(
        dateData.year,
        calculateEarlyMonthVar,
        1
      )
      const currentMonthLastDateData = new Date(
        dateData.year,
        calculateEndMonthVar,
        0
      )

      let date = []
      for (var i = 1; i <= currentMonthLastDateData.getDate(); i++) {
        date.push(i)
      }
      const firstWeekLength = 7 - currentMonthFirstDateDate.getDay()
      const calculateVar =
        (currentMonthLastDateData.getDate() - firstWeekLength) / 7
      /* if (Number.isInteger(calculateVar)) {
          console.log(Math.floor(calculateVar))
        } else {
          console.log(Math.ceil(calculateVar))
        } */
      let weekData = []
      weekData.push(date.slice(0, firstWeekLength))
      for (
        var i = firstWeekLength;
        i < currentMonthLastDateData.getDate();
        i += 7
      ) {
        weekData.push(date.slice(i, i + 7))
      }

      return weekData
    }
    let weekData = calculateWeekNum()
    //console.log(weekData)
    let weekAndDateData: any = []
    for (var i = 0; i < weekData.length; i++) {
      let array: { week: string; data: { day: string; date: number }[] } = {
        week: `${i + 1}`,
        data: []
      }
      for (var j = 0; j < weekData[i].length; j++) {
        array.data.push({
          day: '일요일',
          date: weekData[i][j]
        })
      }
      weekAndDateData.push(array)
    }
    console.log(weekAndDateData)
    /* function checkWeekNum(date: number): any {
      for (var i = 0; i < weekData.length; i++) {
        if (weekData[i].includes(date)) {
          return [weekData[i], Number(i + 1)]
        }
      }
    }
    let currentWeekData = checkWeekNum(dateData.date)
    //console.log(currentWeekData[0])
    setWeek(currentWeekData[1])
    let newDayData = []
    for (var i = 0; i < currentWeekData[0].length; i++) {
      newDayData.push({
        day: dayData[i].day,
        date: currentWeekData[0][i]
      })
    } */

    function checkWeekNum(date: number): any {
      for (var i = 0; i < weekData.length; i++) {
        if (weekData[i].includes(date)) {
          return Number(i + 1)
        }
      }
    }
    let week = checkWeekNum(dateData.date)
    setWeek(week)
    setDayData(weekAndDateData)
    //console.log('newDayData', newDayData)
  }, [])

  function moveForwardWeek() {
    setWeek(week + 1)
  }

  function moveBackWeek() {
    setWeek(week - 1)
  }
  console.log(dayData[1].data)
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
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center"
              onClick={moveBackWeek}
            >
              <Image src={chevronLeft} width={24} height={24} alt=" " />
            </div>
            <div className="w-full px-3 py-2 flex justify-center gap-2 items-center">
              <Image src={calender} width={18} height={18} alt=" " />
              <span className="text-gray-900 text-base font-semibold font-['Pretendard'] leading-normal">
                {dateData.year}년 {dateData.month}월 {week}주차
              </span>
            </div>
            <div
              className="h-full w-10 border p-1 rounded border-gray-200 bg-white flex items-center"
              onClick={moveForwardWeek}
            >
              <Image src={chevronRight} width={24} height={24} alt=" " />
            </div>
          </div>
          <DateSlideTab />
        </div>
      </div>
      {/* 요일 선택 탭 */}
      <div className="w-full flex max-w-[1016px] mx-auto justify-end pt-[32px]">
        <div className="w-[51px] xl:mr-5 lg:mr-4"></div>
        <div className="w-full grid grid-cols-7 gap-[7px]">
          {dayData[week - 1].data.map((date, i) => {
            if (date.date == dateData.date) {
              return (
                <div
                  key={i}
                  className="xl:max-w-[129px] lg:max-w-[119px] h-full px-3 py-2 flex flex-col  border rounded-lg border-primary-600 bg-white"
                >
                  <div className="text-primary-600 text-center text-sm font-medium   leading-[21px]">
                    {date.day}
                  </div>
                  <div className="text-primary-600 text-center text-xl font-bold   leading-[30px]">
                    {date.date}
                  </div>
                </div>
              )
            } else {
              return (
                <div
                  key={i}
                  className="xl:max-w-[129px] lg:max-w-[119px] h-full px-3 py-2 flex flex-col  border rounded-lg border-gray-200 bg-white"
                >
                  <div className="text-gray-400 text-center text-sm font-medium   leading-[21px]">
                    {date.day}
                  </div>
                  <div className="text-gray-400 text-center text-xl font-bold   leading-[30px]">
                    {date.date}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}
