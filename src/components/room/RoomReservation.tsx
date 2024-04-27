'use client'
import { ClassType, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import LessonTimeModal from '../modal/RoundLessonTimeModal'
import { durationScheduleState } from '@/lib/state/classDurationSchedule'
import { lessonTimeState } from '@/lib/state/lessonTime'
import { modalState } from '@/lib/state/modal'
import CalendarIcon from '../../../public/assets/icons/calendar'
import ClockIcon from '../../../public/assets/icons/clock'
import RoomReservationCheck from '../check/RoomReservationCheck'
import Modal from '../common/modal'
import DayDatePicker, { dateDataType } from '../datePicker/dayDatePIcker'
import PeriodDatePicker from '../datePicker/periodDatePicker'
import PeriodLessonTimeModal from '../modal/PeriodLessonTimeModal'
import { centerInfoState } from '@/lib/state/centerInfoState'
import { classType } from '../modal/StudentAddClassModal'
import instance from '@/lib/api/axios'

import ChevronLeftIcon from 'public/assets/icons/chevron/chevron-left.svg'
import ChevronRightIcon from 'public/assets/icons/chevron/chevron-right.svg'
import SearchIcon from 'public/assets/icons/search_white.svg'
import UserIcon from 'public/assets/icons/user.svg'

interface RoomDataType {
  id: number
  name: string
  personNum: number
  list: {
    openTimeList: string[]
    roomClickList: string[]
  }
}

interface IProps {
  class?: classType
  studentId?: string
  classType: string
  viewType: string
  onClick?: () => void
  lessonTime?: string
  paymentStatus: string
}

export default function RoomReservation(props: IProps) {
  console.log(props)
  const router = useRouter()
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)
  const durationSchedules = useRecoilValue(durationScheduleState)
  const setDurationSchedule = useSetRecoilState(durationScheduleState)
  const setLessonTimeState = useSetRecoilState(lessonTimeState)
  const centerInfo = useRecoilValue(centerInfoState)

  const currentDate = new Date()
  const [dateData, setDateData] = useState<dateDataType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  })
  const [dateValue, setDateValue] = useState<string>('날짜')
  const [lessonTime, setLessonTime] = useState<string>('시간')
  const [isClickedTab, setIsClickedTab] = useState<{ date: boolean; time: boolean }>({
    date: false,
    time: false
  })
  const [isClickedSearch, setIsClickedSearch] = useState<boolean>(false)
  const [clickedRoomData, setClickedRoomData] = useState<{
    roomId: undefined | number
    clickedTime: undefined | number
    room: string
  }>({
    roomId: undefined,
    clickedTime: undefined,
    room: ''
  })
  const [reservationData, setReservationData] = useState<{
    className: string
    studentName?: string
    date: string
    lessonTime: string
    room: string
  }>({
    className: '',
    studentName: '',
    date: '',
    lessonTime: '',
    room: ''
  })
  const [roomData, setRoomData] = useState<any>([])

  const handleChangeDateDataFromChild = (data: dateDataType | any, type?: string) => {
    if (type === 'session') {
      setDateData({
        ...dateData,
        year: data.year,
        month: data.month,
        date: data.date
      })
      setDateValue(`${data.year}.${data.month + 1}.${data.date}`)
    }

    if (type === 'duration') {
      console.log(data)
      if (data.length === 1) {
        setDateValue(
          `${data[0].year}.${data[0].month + 1}.${data[0].date[0]}~${data[0].year}.${data[0].month + 1}.${
            data[0].date[1]
          }`
        )
      } else {
        setDateValue(
          `${data[0].year}.${data[0].month + 1}.${data[0].date[0]}~${data[1].year}.${data[1].month + 1}.${
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

  const openTimeList: string[] = []

  if (centerInfo.name !== '') {
    const time = {
      open: Number(centerInfo.open.split(':')[0]),
      close: Number(centerInfo.close.split(':')[0])
    }
    for (var i = time.open; i < time.close; i++) {
      openTimeList.push(`${i}`)
    }
  }

  const getRoomData = () => {
    console.log(props.class)
    instance('/lesson-rooms/daily', {
      params: {
        date: new Date(dateData.year, dateData.month, dateData.date).toISOString()
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
        /* 예약 불가인 룸 처리 */
        const bookingFalseList = []
        for (var k = 0; k < test.length; k++) {
          if (test[k].lesonTime !== null && !test[k].isOpenForBooking) {
            const range = Number(test[k].lessonTime) / 30 - 1
            for (var n = k + 1; n <= k + range; n++) {
              bookingFalseList.push(n)
            }
          }
        }
        if (bookingFalseList.length !== 0) {
          for (var l = 0; l < bookingFalseList.length; l++) {
            test[bookingFalseList[l]].isOpenForBooking = false
          }
        }
        /* 선택한 클래스와 룸에 예약된 클래스가 달라서 예약 불가 처리를 하는 경우 */
      }

      setRoomData(list)
    })
  }

  const reservation = (startTime: string, endTime: string) => {
    if (props.classType === 'session' && props.class) {
      instance
        .post('/session-lesson-registrations', {
          studentId: Number(props.studentId),
          lessonId: Number(props.class.id),
          paymentStatus: props.paymentStatus
        })
        .then(res => {
          if (props.class) {
            instance
              .post('/session-lesson-schedules', {
                lessonId: Number(props.class.id),
                studentId: Number(props.studentId),
                sessionDate: new Date(dateData.year, dateData.month, dateData.date).toISOString(),
                startTime: startTime,
                endTime: endTime,
                roomId: Number(clickedRoomData.roomId)
              })
              .then(res => {
                router.push('/student')
              })
          }
        })
    }
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

  const calculateTime = (min: number) => {
    if (min === 0.5) {
      return '30'
    } else {
      return '00'
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

    return `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()} - ${endDate.getFullYear()}.${
      endDate.getMonth() + 1
    }.${endDate.getDate()}`
  }

  const calculateLessonTimeOfRoom = (timeRange: number) => {
    const index = Number(clickedRoomData.clickedTime)
    let startTime = {
      hour: openTimeList[Number(Math.ceil((index + 1) / 2 - 1))],
      min: (index + 1) % 2 === 0 ? '30' : '00'
    }

    let endTime = {
      hour:
        (index + timeRange) % 2 === 0
          ? openTimeList[(index + timeRange) / 2] === undefined
            ? Number(openTimeList[(index + timeRange) / 2 - 1]) + 1
            : openTimeList[(index + timeRange) / 2]
          : openTimeList[Math.ceil((index + timeRange) / 2) - 1],
      min: (index + timeRange) % 2 === 0 ? '00' : '30'
    }

    return {
      startTime: `${startTime.hour}:${startTime.min}`,
      endTime: `${endTime.hour}:${endTime.min}`
    }
  }
  useEffect(() => {
    if (props.lessonTime && props.lessonTime !== '') {
      setLessonTime(props.lessonTime)
    }
  }, [props.lessonTime])

  console.log(reservationData)

  return (
    <>
      <div className="relative w-full flex flex-col gap-4">
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
              if ((dateValue !== '날짜' && lessonTime !== '시간') || durationSchedules.length >= 1) {
                setIsClickedSearch(true)
                if (props.classType === 'session') {
                  getRoomData()
                }
              } else {
                return
              }
            }}
          >
            <SearchIcon width={20} height={20} />
          </div>
        </div>
        <div className="absolute z-10 left-0 top-[120px]">
          {props.classType === 'session' && isClickedTab.date && (
            <DayDatePicker
              parentsDateData={dateData}
              changeParentsDateData={handleChangeDateDataFromChild}
              type="addClass"
            />
          )}
          {props.classType === 'duration' && isClickedTab.date && (
            <PeriodDatePicker changeParentDateData={handleChangeDateDataFromChild} />
          )}
        </div>
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
                const timeRange: number | undefined = lessonTime === '시간' ? undefined : Number(lessonTime) / 30
                /* : lessonTime.length <= 3
                    ? Number(lessonTime) / 30
                    : calculatePeriodClassLessonTime() / 30 */
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
                          if (props.classType === 'session' && timeRange) {
                            const lessonTime = calculateLessonTimeOfRoom(timeRange)
                            const day = calculateDay(new Date(dateData.year, dateData.month, dateData.date).getDay())

                            setReservationData(prev => ({
                              ...prev,
                              className: props.class !== undefined ? props.class.name : '',
                              studentName: props.studentId,
                              date: dateValue + `(${day})`,
                              lessonTime: lessonTime.startTime + '-' + lessonTime.endTime,
                              room: clickedRoomData.room
                            }))
                            reservation(lessonTime.startTime, lessonTime.endTime)
                            /* 예약 확인 모달 보여주기 위함 */
                            if (props.viewType === 'page') {
                              setModal(true)
                            } else if (props.viewType === 'modal') {
                              /* 예약 정보 전송 */
                              console.log(dateValue, lessonTime)
                              const data = {
                                date: ''
                              }
                            }
                          } else if (props.classType === 'duration') {
                            if (timeRange !== undefined && durationSchedules.length === 0) {
                              const startDateData = dateValue.split('~')[0].split('.')
                              const endDateData = dateValue.split('~')[1].split('.')
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
                                  startTime: calculateLessonTimeOfRoom(timeRange).startTime,
                                  endTime: calculateLessonTimeOfRoom(timeRange).endTime,
                                  repeatDate: lessonTime.split(',')[0].replace(' 반복', '').replace(/\s+/g, ','),
                                  roomId: 1,
                                  lessonTime: calculatePeriodClassLessonTime()
                                }
                              ])
                            } else if (timeRange !== undefined && durationSchedules.length >= 1) {
                              setDurationSchedule(prev => [
                                ...prev,
                                {
                                  startDate: durationSchedules[0].startDate,
                                  endDate: durationSchedules[0].endDate,
                                  startTime: calculateLessonTimeOfRoom(timeRange).startTime,
                                  endTime: calculateLessonTimeOfRoom(timeRange).endTime,
                                  repeatDate: lessonTime.split(',')[0].replace(' 반복', '').replace(/\s+/g, ','),
                                  roomId: 1,
                                  lessonTime: calculatePeriodClassLessonTime()
                                }
                              ])
                            }
                          }
                          if (props.onClick) {
                            /* 모달 닫는 함수 */
                            props.onClick()
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
                      <ChevronLeftIcon className="z-10" width={16} height={16} />
                    </button>
                    <button
                      className="absolute z-10 -right-3 top-[60px] flex items-center justify-center w-6 h-6 border border-1 border-gray-200 bg-primary-50 rounded-full"
                      onClick={() => {
                        scrollRight(i)
                      }}
                    >
                      <ChevronRightIcon className="z-10" width={16} height={16} />
                    </button>
                    <div
                      ref={el => (refs.current[i] = el)}
                      className="w-full grid grid-flow-col overflow-y-auto scrollbar-hide"
                    >
                      <div className="w-full flex flex-col">
                        <div className="w-full flex">
                          {openTimeList.length !== 0 &&
                            openTimeList.map((time, i: number) => {
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
                                  if (timeRange === undefined) {
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
      {/* {props.viewType === 'page' && modal && (
        <Modal small>
          <RoomReservationCheck reservationData={reservationData} />
        </Modal>
      )} */}
    </>
  )
}
