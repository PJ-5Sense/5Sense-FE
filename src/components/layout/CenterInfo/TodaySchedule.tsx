'use client'
import { useState, useEffect } from 'react'

import instance from '@/lib/api/axios'
import { dateDataType } from '../../common/calendar/datePicker/dayDatePIcker'
import { calculateEndTime, formatStartTime } from '@/utils'

// 메인에서 스케줄 받아오고 저장해서 모달에서도 햄버거 버튼때도 사용해야함
export default function TodaySchedule() {
  const Today = new Date()
  const formattedToday: dateDataType = {
    year: Today.getFullYear(),
    month: Today.getMonth() + 1,
    date: Today.getDate()
  }
  const [todayLessonData, setTodayLessonData] = useState<{ startTime: string; lessonTime: number; name: string }[][]>(
    []
  )
  const [pageData, setPageData] = useState<{ wholePage: number; currentPage: number }>({
    wholePage: 0,
    currentPage: 1
  })

  useEffect(() => {
    instance(`/api/lessons/${formattedToday.year}/${formattedToday.month}`).then(res => {
      const data = res.data.data[formattedToday.date - 1]
      if (data.length !== 0) {
        /* 클래스 startTime 순으로 정렬 */
        const sortedData = data.sort(
          (a: any, b: any) => Number(a.startTime.split(':')[0]) - Number(b.startTime.split(':')[0])
        )
        const formatData = []
        formatData.push(sortedData[0])
        /* 중복되는 클래스 데이터 제거 */
        for (var i = 1; i < sortedData.length; i++) {
          const target = sortedData[i - 1]
          if (sortedData[i].startTime !== target.startTime || sortedData[i].id !== target.id) {
            formatData.push(sortedData[i])
          }
        }
        const divisionFormatData = []
        /*  */
        for (var i = 0; i < formatData.length; i += 5) {
          divisionFormatData.push(formatData.slice(i, i + 5))
        }
        setTodayLessonData(divisionFormatData)
        setPageData(prev => ({
          ...prev,
          wholePage: Math.ceil(formatData.length / 5)
        }))
      }
    })
  }, [])

  return (
    <div className="flex flex-col w-full lg:w-[248px] gap-3">
      <div className="today flex w-fit h-[29px] items-center box-border px-2 py-1 gap-[6px] bg-primary-100 rounded">
        <span className="bold-500 text-sm leading-[21px]">TODAY</span>
        <span className="medium-500 text-sm leading-[21px]">
          {formattedToday.year}/{formattedToday.month}/{formattedToday.date}
        </span>
      </div>
      {todayLessonData.length !== 0 && (
        <>
          <div className="w-full flex flex-col gap-1.5">
            {todayLessonData.length !== 0 &&
              todayLessonData[pageData.currentPage - 1].map((data, i) => (
                <div key={i} className="flex flex-col">
                  <div className="before:inline-block before:w-[6px] before:h-[6px] before:rounded-full before:bg-primary-500 before:mr-2">
                    <span className="text-gray-500 text-xs font-semibold   leading-[18px]">
                      {formatStartTime(data.startTime)}
                    </span>
                    <span className="text-gray-500 text-xs font-semibold   leading-[18px] before:content-['-'] before:px-1">
                      {calculateEndTime(data.startTime, data.lessonTime)}
                    </span>
                  </div>
                  <div className="pl-4 mr-0 text-['#1F2A37'] text-[13px] font-semibold   leading-tight">
                    {data.name}
                  </div>
                </div>
              ))}
          </div>
          {pageData.wholePage === 0 && (
            <div className="relative w-full top-1 text-center text-gray-700 text-xs font-medium   leading-3">
              <span
                className="absolute left-2.5 cursor-pointer"
                onClick={() => {
                  if (pageData.currentPage === 1) {
                    return
                  } else {
                    setPageData(prev => ({
                      ...prev,
                      currentPage: prev.currentPage - 1
                    }))
                  }
                }}
              >
                &lt;
              </span>
              {pageData.currentPage} / {pageData.wholePage}
              <span
                className="absolute right-2.5 cursor-pointer"
                onClick={() => {
                  if (pageData.currentPage === todayLessonData.length) {
                    return
                  } else {
                    setPageData(prev => ({
                      ...prev,
                      currentPage: prev.currentPage + 1
                    }))
                  }
                }}
              >
                &gt;
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
