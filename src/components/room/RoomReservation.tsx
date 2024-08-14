'use client'
import { ClassType, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import LessonTimeModal from '../modal/RoundLessonTimeModal'
import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import { lessonTimeState } from '@/lib/state/lessonTime'
import { dateDataType } from '../common/calendar/datePicker/dayDatePIcker'
import DayDatePicker from '../common/calendar/datePicker/dayDatePIcker'
import PeriodDatePicker from '../common/calendar/datePicker/periodDatePicker'
import PeriodLessonTimeModal from '../modal/PeriodLessonTimeModal'
import { centerInfoState } from '@/lib/state/centerInfoState'
import { classType } from '../modal/StudentAddClassModal'
import instance from '@/lib/api/axios'
import { sessionScheduleState } from '@/lib/state/studentSessionSchedule'
import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'
import { calculateRervationTime, getTimeListByHour } from '@/utils'

import ChevronLeftIcon from '@/icons/icon/room/chevronLeft.svg'
import ChevronRightIcon from '@/icons/icon/room/chevronRight.svg'
import SearchIcon from 'public/assets/icons/search_white.svg'
import UserIcon from 'public/assets/icons/user.svg'
import CalendarIcon from '@/icons/icon/datePicker/calendar.svg'
import ClockIcon from '@/icons/icon/clock.svg'

interface IProps {
  class?: classType
  classType: string
  viewType: string
  onClose: () => void
  lessonTime?: string
  paymentStatus?: string
  edit?: boolean
}

export default function RoomReservation(props: IProps) {
  console.log('test')
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const durationSchedules = useRecoilValue(durationClassScheduleState)
  const sessionSchedules = useRecoilValue(sessionScheduleState)
  const setDurationSchedule = useSetRecoilState(durationClassScheduleState)
  const setSessionSchedule = useSetRecoilState(sessionScheduleState)
  const calendarDate = useRecoilValue(DayCalendarDateState)
  const centerInfo = useRecoilValue(centerInfoState)
  const timeListByHour = getTimeListByHour(centerInfo.open, centerInfo.close)

  const [dateValue, setDateValue] = useState<string>('날짜')
  const [lessonTime, setLessonTime] = useState<string>('시간')
  const [isClickedTab, setIsClickedTab] = useState<{ date: boolean; time: boolean }>({
    date: false,
    time: false
  })
  const [isClickedSearch, setIsClickedSearch] = useState<boolean>(false)
  const [clickedRoomData, setClickedRoomData] = useState<{
    roomId: number
    clickedTime: number
    room: string
  }>({
    roomId: 0,
    clickedTime: 0,
    room: ''
  })
  const [roomData, setRoomData] = useState<any>([])
  const [restOfSessions, setRestOfSessions] = useState<number>(0)

  const handleChangeDateDataFromChild = (data: dateDataType | any, type?: string) => {
    console.log(calendarDate)
    if (type === 'session') {
      setDateValue(`${data.year}.${data.month + 1}.${data.date}`)
    }

    if (type === 'duration') {
      if (data.length === 1) {
        /* date 오름 차순으로 변경 */
        data[0].date.sort((a: number, b: number) => a - b)
        setDateValue(
          `${data[0].year}.${data[0].month + 1}.${data[0].date[0]} ~ ${data[0].year}.${data[0].month + 1}.${
            data[0].date[1]
          }`
        )
      } else {
        setDateValue(
          `${data[0].year}.${data[0].month + 1}.${data[0].date[0]} ~ ${data[1].year}.${data[1].month + 1}.${
            data[1].date[0]
          }`
        )
      }
    }

    setIsClickedTab(prev => ({
      ...prev,
      date: false
    }))
  }

  const handleChangeLessonTimeFromChild = (time: string, type: string) => {
    if (type === 'session') {
      setLessonTime(time)
    }
    if (type === 'duration') {
      time = time.replace(/,/g, ' ')
      time = time.replace(/\//g, ',')
      setLessonTime(time)
    }

    setIsClickedTab(prev => ({
      ...prev,
      time: false
    }))
  }

  const handleClickTab = (type: string) => {
    if (type === 'date') {
      setIsClickedTab(prev => ({
        ...prev,
        date: !prev.date,
        time: false
      }))
    } else {
      setIsClickedTab(prev => ({
        ...prev,
        date: false,
        time: !prev.time
      }))
    }
  }

  const getSessionRoomData = (classId: number) => {
    const date = dateValue.split('.')
    instance('/api/lesson-rooms/daily', {
      params: {
        date: new Date(calendarDate.year, calendarDate.month, calendarDate.date).toISOString()
      }
    }).then(res => {
      const list = res.data.data
      for (var i = 0; i < list.length; i++) {
        const test: any = []
        const keys = Object.keys(list[i].workTime)
        for (var j = 0; j < keys.length; j++) {
          const key = keys[j]
          let value = list[i].workTime[key]
          value.time = key
          test.push(value)
        }
        list[i].workTime = test
        /* 예약 불가인 룸 처리(애초에 예약 가능 여부가 false) -> 무조건 필요한거 */
        const absolutlyBookingFalse = []
        const relativlyBookingFalse = []
        for (var k = 0; k < test.length; k++) {
          if (test[k].lesonTime !== null && !test[k].isOpenForBooking) {
            const range = Number(test[k].lessonTime) / 30 - 1
            for (var n = k + 1; n <= k + range; n++) {
              absolutlyBookingFalse.push(n)
            }
          }
          if (test[k].lesonTime !== null && test[k].isOpenForBooking && classId !== test[k].id) {
            const range = Number(test[k].lessonTime) / 30 - 1
            for (var n = k; n <= k + range; n++) {
              relativlyBookingFalse.push(n)
            }
          }
        }
        if (absolutlyBookingFalse.length !== 0) {
          for (var l = 0; l < absolutlyBookingFalse.length; l++) {
            test[absolutlyBookingFalse[l]].isOpenForBooking = false
          }
        }
        if (relativlyBookingFalse.length !== 0) {
          for (var l = 0; l < relativlyBookingFalse.length; l++) {
            test[relativlyBookingFalse[l]].isOpenForBooking = false
          }
        }
        /* 선택한 클래스와 룸에 예약되어 있는 클래스가 다른 경우 처리 -> 룸에 에약되어있는 클래스가 있는 경우에만 처리 */
      }

      setRoomData(list)
    })
  }

  const getDurationRoomData = () => {
    const date = {
      start: dateValue.replaceAll(' ', '').split('~')[0].split('.'),
      end: dateValue.replaceAll(' ', '').split('~')[1].split('.')
    }
    const repeatDate = lessonTime.split(',')[0].replace('  반복', '').replaceAll(' ', ',')
    const startDate = new Date(Number(date.start[0]), Number(date.start[1]) - 1, Number(date.start[2])).toISOString()
    const endDate = new Date(Number(date.end[0]), Number(date.end[1]) - 1, Number(date.end[2])).toISOString()
    instance('/api/lesson-rooms/range', {
      params: {
        startDate: startDate,
        endDate: endDate,
        repeatDate: repeatDate
      }
    }).then(res => {
      console.log(res)
      const list = res.data.data
      for (var i = 0; i < list.length; i++) {
        const test: any = []
        const keys = Object.keys(list[i].workTime)
        for (var j = 0; j < keys.length; j++) {
          const key = keys[j]
          let value = list[i].workTime[key]
          value.time = key
          test.push(value)
        }
        list[i].workTime = test
        /* 예약 불가인 룸 처리(애초에 예약 가능 여부가 false) -> 무조건 필요한거 */
        const absolutlyBookingFalse = []
        const relativlyBookingFalse = []
        for (var k = 0; k < test.length; k++) {
          if (test[k].lesonTime !== null && !test[k].isOpenForBooking) {
            const range = Number(test[k].lessonTime) / 30 - 1
            for (var n = k + 1; n <= k + range; n++) {
              absolutlyBookingFalse.push(n)
            }
          }
        }
        if (absolutlyBookingFalse.length !== 0) {
          for (var l = 0; l < absolutlyBookingFalse.length; l++) {
            test[absolutlyBookingFalse[l]].isOpenForBooking = false
          }
        }
      }
      setRoomData(list)
    })
  }

  const scrollRight = (i: number) => {
    const element = refs.current[i]
    if (element) {
      element.scrollLeft += 50 // 스크롤되는 양을 조절할 값 전달
    }
  }

  const scrollLeft = (i: number) => {
    const element = refs.current[i]
    if (element) {
      element.scrollLeft -= 50 // 스크롤되는 양을 조절할 값 전달
    }
  }

  const calculateDay = (day: number) => {
    const dayList = ['일', '월', '화', '수', '목', '금', '토']
    return dayList[day]
  }

  const calculatePeriodClassLessonTime = () => {
    let time = lessonTime.split(',')[1].split('')
    return Number(time.slice(1, time.length - 1).join(''))
  }

  const selectedDate = () => {
    const startDate = new Date(durationSchedules[0].startDate)
    const endDate = new Date(durationSchedules[0].endDate)

    return `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()} ~ ${endDate.getFullYear()}.${
      endDate.getMonth() + 1
    }.${endDate.getDate()}`
  }

  const calculateLessonTimeOfRoom = (timeRange: number): { startTime: string; endTime: string } => {
    const index = Number(clickedRoomData.clickedTime)
    let startTime = {
      hour: timeListByHour[Number(Math.ceil((index + 1) / 2 - 1))],
      min: (index + 1) % 2 === 0 ? '30' : '00'
    }

    let endTime = {
      hour:
        (index + timeRange) % 2 === 0
          ? timeListByHour[(index + timeRange) / 2] === undefined
            ? Number(timeListByHour[(index + timeRange) / 2 - 1]) + 1
            : timeListByHour[(index + timeRange) / 2]
          : timeListByHour[Math.ceil((index + timeRange) / 2) - 1],
      min: (index + timeRange) % 2 === 0 ? '00' : '30'
    }

    if (startTime.hour.length === 1) {
      startTime.hour = '0' + String(startTime.hour)
    }
    if (String(endTime.hour).length === 1) {
      endTime.hour = '0' + String(endTime.hour)
    }

    return {
      startTime: `${startTime.hour}:${startTime.min}`,
      endTime: `${endTime.hour}:${endTime.min}`
    }
  }

  useEffect(() => {
    if (props.lessonTime && props.lessonTime !== '') {
      setLessonTime(props.lessonTime)
      setClickedRoomData(prev => ({
        ...prev,
        roomId: 0,
        clickedTime: 0,
        room: ''
      }))
      setDateValue('날짜')
      setRoomData([])
      setIsClickedSearch(false)

      const studentId = localStorage.getItem('studentId') as string
      if (studentId !== null) {
        instance(`/api/students/${studentId}`).then(res => {
          const sessionLessons = res.data.data.sessionLessons
          const alreadyRigisteredLessons = sessionLessons.filter(
            (data: any, i: number) => props.class && data.id === props.class.id
          )
          if (alreadyRigisteredLessons.length !== 0) {
            console.log('alreadyRigisteredLessons', alreadyRigisteredLessons)
            setRestOfSessions(alreadyRigisteredLessons[0].schedules[0].restOfSessions)
          }
        })
      }
    }
  }, [props.lessonTime])

  /* 회차반 선택 일자 변경시 룸 데이터 초기화 */
  useEffect(() => {
    return () => {
      setIsClickedSearch(false)
    }
  }, [calendarDate])

  useEffect(() => {
    if (props.edit) {
      setDateValue(selectedDate())
    }
  }, [])

  console.log(dateValue)

  return (
    <>
      <div className="relative w-full flex flex-col gap-4 mb-10">
        <div className="w-full text-left gray-900-semibold text-base">예약 가능한 강의실 찾기</div>
        <div
          className={`w-full h-[68px] flex items-center justify-between ${
            isClickedTab.date || isClickedTab.time
              ? isClickedTab.date
                ? 'pl-2.5 bg-[#F8FAFD]'
                : 'pl-6 bg-[#F8FAFD]'
              : 'pl-6'
          } pr-2.5 py-2.5 rounded-full border border-1 border-gray-300`}
        >
          {/* 날짜 */}
          <button
            className={`${
              isClickedTab.date
                ? 'w-[254.5px] py-1.5 px-[18px] h-14 border border-1 border-primary-600 rounded-full bg-white'
                : 'w-[218.5px] h-full'
            }  flex gap-2`}
            onClick={() => {
              if (durationSchedules.length === 0) {
                handleClickTab('date')
              } else {
                return
              }
            }}
          >
            <div className={`w-[18px] mt-1/2 flex items-start`}>
              <CalendarIcon width="18" height="18" color={isClickedTab.date ? '#7354E8' : '#6B7280'} />
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full text-left text-gray-700 font-medium text-sm">날짜</div>
              <div
                className={`w-full h-full text-left ${
                  isClickedTab.date ? 'gray-900-medium' : 'gray-400-medium'
                } text-[15px]`}
              >
                {durationSchedules.length === 0 ? dateValue : selectedDate()}
              </div>
            </div>
          </button>
          {!isClickedTab.date && !isClickedTab.time && <div className="w-px h-7 bg-gray-300"></div>}
          {/* 소요시간 / 요일 */}
          <button
            className={`${
              isClickedTab.time
                ? 'w-[254.5px] py-1.5 px-[18px] h-14 border border-1 border-primary-600 rounded-full bg-white'
                : 'w-[218.5px] h-full'
            } flex gap-2 `}
            onClick={() => {
              if (props.classType === 'session') {
                return
              } else {
                handleClickTab('time')
              }
            }}
          >
            <div className="w-[18px] mt-1/2 flex items-start">
              <ClockIcon width="18" height="18" color={isClickedTab.time ? '#7354E8' : '#6B7280'} />
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full text-left text-gray-700 font-medium text-sm">
                {props.classType === 'duration' ? '요일/소요시간' : '소요시간'}
              </div>
              <div
                className={`w-full h-full text-left ${
                  isClickedTab.time ? 'gray-900-medium' : 'gray-400-medium'
                } text-[15px]`}
              >
                {lessonTime === '시간' ? lessonTime : props.classType === 'session' ? lessonTime + '분' : lessonTime}
              </div>
            </div>
          </button>
          <div
            className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center cursor-pointer"
            onClick={() => {
              if (dateValue !== '날짜' && lessonTime !== '시간') {
                setIsClickedSearch(true)
                if (props.classType === 'session' && props.class) {
                  getSessionRoomData(props.class.id)
                } else if (props.classType === 'duration') {
                  getDurationRoomData()
                }
              }
            }}
          >
            <SearchIcon width={20} height={20} />
          </div>
        </div>
        {/* datePicker */}
        <div className="absolute z-10 left-0 top-[120px]">
          {props.classType === 'session' && isClickedTab.date && (
            <DayDatePicker
              changeParentsDateData={handleChangeDateDataFromChild}
              parentsDateData={calendarDate}
              type="addClass"
              onClose={() => {
                setIsClickedTab(prev => ({
                  ...prev,
                  date: false
                }))
              }}
            />
          )}
          {props.classType === 'duration' && isClickedTab.date && (
            <PeriodDatePicker changeParentDateData={handleChangeDateDataFromChild} />
          )}
        </div>
        {/* 시간, 요일 선택 모달 */}
        <div className="absolute z-10 right-10 top-[120px]">
          {props.classType === 'session' && isClickedTab.time && (
            <LessonTimeModal
              lessonTime={lessonTime}
              handleChangeLessonTimeFromChild={handleChangeLessonTimeFromChild}
            />
          )}
          {props.classType === 'duration' && isClickedTab.time && (
            <PeriodLessonTimeModal handleChangeLessonTimeFromChild={handleChangeLessonTimeFromChild} />
          )}
        </div>
      </div>
      {/* 일정 선택 문구 */}
      {!isClickedSearch && (
        <div className="w-full h-[422px] border border-1 border-gray-200 rounded-lg flex items-center">
          <div className="w-full text-center font-semibold text-base text-gray-400">
            일정을 선택해주시면 예약가능 리스트를 볼 수 있습니다.
          </div>
        </div>
      )}

      {/* 일정 선택 */}
      {isClickedSearch && (
        <div
          className={`w-full mb-[60px] p-6 flex flex-col gap-6 border border-1 border-gray-200 rounded-lg ${
            props.viewType === 'modal' ? 'max-h-[450px]' : 'max-h-[1200px]'
          } overflow-y-auto`}
        >
          {/* 룸 선택*/}
          <div className="w-full flex flex-col gap-10">
            {roomData.length !== 0 &&
              roomData.map((data: any, i: number) => {
                const roomId = data.id
                const room = data.name
                const calculatedLessonTime =
                  props.classType === 'duration'
                    ? lessonTime.split(',')[1].replace(' ', '').replace('분', '')
                    : lessonTime
                const timeRange: number | undefined =
                  lessonTime === '시간' ? undefined : Number(calculatedLessonTime) / 30

                return (
                  <div key={i} className="relative flex flex-col gap-4">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <div className="gray-900-semibold text-xl flex items-center">{data.name}</div>
                        <div className="flex items-center gap-0.5">
                          <UserIcon width={16} height={16} />
                          <div className="gray-500-normal text-sm flex items-center">{data.capacity}인</div>
                        </div>
                      </div>
                      <button
                        className="w-[73px] h-[37px] border border-1 border-primary-600 rounded-lg flex items-center justify-center text-sm text-primary-600 font-normal"
                        onClick={() => {
                          if (room !== clickedRoomData.room) {
                            return
                          }
                          /* 회차반 */
                          if (props.classType === 'session' && timeRange) {
                            const lessonTime = calculateLessonTimeOfRoom(timeRange)
                            setSessionSchedule(prev => [
                              ...prev,
                              {
                                name: props.class !== undefined ? props.class.name : '',
                                totalSessions: props.class !== undefined ? props.class.totalSessions : 0,
                                lessonId: props.class !== undefined ? Number(props.class.id) : 0,
                                sessionDate: dateValue,
                                startTime: lessonTime.startTime,
                                endTime: lessonTime.endTime,
                                roomId: Number(clickedRoomData.roomId),
                                paymentStatus: props.paymentStatus !== undefined ? props.paymentStatus : '',
                                roomName: clickedRoomData.room,
                                restOfSessions: restOfSessions
                              }
                            ])
                            /* 모달 닫기 */
                            props.onClose && props.onClose()
                          } else if (props.classType === 'duration') {
                            /* 기간반 */
                            if (timeRange !== undefined && durationSchedules.length === 0) {
                              const startDateData = dateValue.replaceAll(' ', '').split('~')[0].split('.')
                              const endDateData = dateValue.replaceAll(' ', '').split('~')[1].split('.')
                              setDurationSchedule(prev => [
                                ...prev,
                                {
                                  startDate: new Date(
                                    Number(startDateData[0]),
                                    Number(startDateData[1]) - 1,
                                    Number(startDateData[2])
                                  ).toISOString(),
                                  endDate: new Date(
                                    Number(endDateData[0]),
                                    Number(endDateData[1]) - 1,
                                    Number(endDateData[2])
                                  ).toISOString(),
                                  startTime: calculateLessonTimeOfRoom(timeRange).startTime + ':00',
                                  endTime: calculateLessonTimeOfRoom(timeRange).endTime + ':00',
                                  repeatDate: lessonTime.split(',')[0].replace('  반복', '').replaceAll(' ', ','),
                                  roomId: roomId,
                                  lessonTime: calculatePeriodClassLessonTime()
                                }
                              ])
                              /* 모달 닫기 */
                              props.onClose && props.onClose()
                            } else if (timeRange !== undefined && props.edit) {
                              const startDateData = dateValue.replaceAll(' ', '').split('~')[0].split('.')
                              const endDateData = dateValue.replaceAll(' ', '').split('~')[1].split('.')
                              setDurationSchedule(prev => [
                                {
                                  startDate: new Date(
                                    Number(startDateData[0]),
                                    Number(startDateData[1]) - 1,
                                    Number(startDateData[2])
                                  ).toISOString(),
                                  endDate: new Date(
                                    Number(endDateData[0]),
                                    Number(endDateData[1]) - 1,
                                    Number(endDateData[2])
                                  ).toISOString(),
                                  startTime: calculateLessonTimeOfRoom(timeRange).startTime + ':00',
                                  endTime: calculateLessonTimeOfRoom(timeRange).endTime + ':00',
                                  repeatDate: lessonTime.split(',')[0].replace('  반복', '').replaceAll(' ', ','),
                                  roomId: roomId,
                                  lessonTime: calculatePeriodClassLessonTime()
                                }
                              ])
                              props.onClose && props.onClose()
                            }

                            /* else if (timeRange !== undefined && durationSchedules.length >= 1) {
                              setDurationSchedule(prev => [
                                ...prev,
                                {
                                  startDate: durationSchedules[0].startDate,
                                  endDate: durationSchedules[0].endDate,
                                  startTime: calculateLessonTimeOfRoom(timeRange).startTime,
                                  endTime: calculateLessonTimeOfRoom(timeRange).endTime,
                                  repeatDate: lessonTime.split(',')[0].replace('  반복', '').replaceAll(' ', ','),
                                  roomId: roomId,
                                  lessonTime: calculatePeriodClassLessonTime()
                                }
                              ])
                            } */
                          }
                        }}
                      >
                        예약하기
                      </button>
                    </div>
                    <button
                      className="absolute z-10 -left-3 top-[60px] flex items-center justify-center w-6 h-6 border border-1 border-gray-200 bg-primary-50 rounded-full"
                      onClick={() => {
                        scrollLeft(i)
                      }}
                    >
                      <ChevronLeftIcon className="z-10" />
                    </button>
                    <button
                      className="absolute z-10 -right-3 top-[60px] flex items-center justify-center w-6 h-6 border border-1 border-gray-200 bg-primary-50 rounded-full"
                      onClick={() => {
                        scrollRight(i)
                      }}
                    >
                      <ChevronRightIcon className="z-10" />
                    </button>
                    <div
                      ref={el => {
                        refs.current[i] = el
                      }}
                      className="w-full grid grid-flow-col overflow-y-auto scrollbar-hide"
                    >
                      <div className="w-full flex flex-col">
                        <div className="w-full flex">
                          {timeListByHour.length !== 0 &&
                            timeListByHour.map((time, i: number) => {
                              return (
                                <div key={i} className={`w-[54px] flex flex-col`}>
                                  <div
                                    className={`relative w-full flex flex-col h-[42px] py-[11px] ${
                                      i === 0 ? 'border border-1' : 'border-y border-r'
                                    }  border-gray-200 flex items-center justify-center gray-800-medium text-[13px]`}
                                  >
                                    {time}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                        <div className="w-full flex">
                          {data.workTime.map((data: any, i: number) => {
                            return (
                              <button
                                key={i}
                                className={`w-[27px] ${
                                  data.isOpenForBooking
                                    ? clickedRoomData.roomId === roomId &&
                                      clickedRoomData.clickedTime !== undefined &&
                                      timeRange !== undefined &&
                                      clickedRoomData.clickedTime <= i &&
                                      i <= clickedRoomData.clickedTime + timeRange - 1
                                      ? 'bg-primary-300'
                                      : 'bg-white'
                                    : 'bg-gray-100'
                                }`}
                                onClick={() => {
                                  if (!data.isOpenForBooking) {
                                    return
                                  } else {
                                    setClickedRoomData(prev => ({
                                      ...prev,
                                      roomId: roomId,
                                      clickedTime: i,
                                      room: room
                                    }))
                                  }
                                }}
                              >
                                <div
                                  className={`w-full h-9 ${i === 0 && 'border-l'} border-r border-b  border-gray-200`}
                                />
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}
