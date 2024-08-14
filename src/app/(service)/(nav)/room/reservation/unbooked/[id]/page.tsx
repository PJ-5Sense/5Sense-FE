'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useRef } from 'react'

import DropDown from '@/components/common/DropDown'
import RoomReservation from '@/components/room/RoomReservation'
import instance from '@/lib/api/axios'
import SearchStudents from '@/components/common/searchPerson/SearchStudents'
import { classType } from '@/components/modal/StudentAddClassModal'
import RoomReservationCheck from '@/components/check/RoomReservationCheck'
import ContentHeader from '@/components/common/ContentHeader'
import { centerInfoState } from '@/lib/state/centerInfoState'
import { formatReservationDate, calculateRervationTime } from '@/utils'

import AlertIcon from 'public/assets/icons/alert-circle.svg'
import CalendarIcon from '@/icons/icon/datePicker/calendar.svg'
import UserIcon from 'public/assets/icons/user.svg'
import ChevronLeftIcon from '@/icons/icon/room/chevronLeft.svg'
import ChevronRightIcon from '@/icons/icon/room/chevronRight.svg'

interface IProps {
  query: {
    name?: string
  }
}

export default function UnbookedRoomReservatoin({ params }: { params: { id: string } }) {
  const roomId = params.id
  const router = useRouter()
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const centerInfo = useRecoilValue(centerInfoState)
  const timeList = calculateRervationTime(centerInfo.open, centerInfo.close)
  const [dropDownProps, setDropDownProps] = useState({
    title: '클래스를 선택해주세요',
    list: [],
    type: 'class'
  })

  const [selectedClass, setSelectedClass] = useState<{ id: number; lessonTime: number }>({
    id: 0,
    lessonTime: 0
  })
  const [studentId, setStudentId] = useState(0)
  const [roomData, setRoomdata] = useState<any>([])
  const [clickedRoomData, setClickedRoomData] = useState<{
    roomId: number
    clickedTime: number
    room: string
  }>({
    roomId: 0,
    clickedTime: 0,
    room: ''
  })
  const [reservationData, setReservationData] = useState({
    reservationDate: '',
    roomId: '',
    roomName: '',
    startTime: ''
  })
  const [isBooking, setIsBooking] = useState<boolean>(false)
  const [isFirstRender, setIsFirstRender] = useState<boolean>(false)
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

  const handleChangeStudentId = (id: string) => {
    setStudentId(Number(id))
  }

  const handleChangeParentsDropdownData = (data: classType) => {
    setSelectedClass(prev => ({
      ...prev,
      id: data.id,
      lessonTime: Number(data.lessonTime)
    }))

    const startTime = {
      hour: Number(reservationData.startTime.split(':')[0]),
      min: reservationData.startTime.split(':')[1]
    }
    let indexOfStartTime = openTimeList.indexOf(startTime.hour.toString())
    if (startTime.min === '30') {
      indexOfStartTime = (indexOfStartTime + 1) * 2 - 1
    } else {
      indexOfStartTime = (indexOfStartTime + 1) * 2 - 2
    }

    setIsFirstRender(true)
    setClickedRoomData(prev => ({
      ...prev,
      roomId: Number(reservationData.roomId),
      room: reservationData.roomName,
      clickedTime: indexOfStartTime
    }))
  }

  const getRoomData = (classId: number, lessonTime: number) => {
    const reservationDate = localStorage.getItem('reservationDate') as string
    const date = reservationDate.split('.')
    instance('/api/lesson-rooms/daily', {
      params: {
        date: new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2])).toISOString()
      }
    }).then(res => {
      const list = res.data.data.filter((data: { id: number }) => data.id === Number(roomId))
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
      setRoomdata(list)
      /* 선택된 클래스와 해당 예약 시간대에 예약 가능 여부 */
      const startTime = {
        hour: Number(reservationData.startTime.split(':')[0]),
        min: reservationData.startTime.split(':')[1]
      }
      let indexOfStartTime = openTimeList.indexOf(startTime.hour.toString())
      console.log(indexOfStartTime)
      if (startTime.min === '30') {
        indexOfStartTime = indexOfStartTime * 2 + 1
      } else {
        indexOfStartTime = indexOfStartTime * 2
      }
      const indexOfEndTime = indexOfStartTime + lessonTime / 30
      const isBookingCheckList = []
      for (var i = indexOfStartTime; i < indexOfEndTime; i++) {
        isBookingCheckList.push(list[0].workTime[i].isOpenForBooking)
      }
      /* 예약 가능 여부 판단 */
      if (isBookingCheckList.includes(false)) {
        setIsBooking(false)
      } else {
        setIsBooking(true)
      }
      setClickedRoomData(prev => ({
        ...prev,
        roomId: Number(reservationData.roomId),
        room: reservationData.roomName,
        clickedTime: indexOfStartTime
      }))
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

  useEffect(() => {
    /* parmas 통해서 roomData 가져오기 */
    instance('/api/lesson-rooms/daily', {
      params: {
        date: new Date().toISOString()
      }
    }).then(res => {
      const roomData = res.data.data
      const targetRoom = roomData.filter((data: { id: number }) => data.id === Number(roomId))
      setReservationData(prev => ({
        ...prev,
        roomId: roomId,
        roomName: targetRoom[0].name,
        reservationDate: localStorage.getItem('reservationDate') as string,
        startTime: localStorage.getItem('reservationTime') as string
      }))
      getRoomData(0, 0)
    })

    /* 회차반 리스트 가죠오기 */
    instance(`/api/session-lessons`, {
      params: {
        isCheckRegistrationsCount: true
      }
    }).then(res => {
      const classData = res.data.data
      setDropDownProps(prev => ({
        ...prev,
        list: classData
      }))
    })
  }, [])

  /* 선택된 클래스 변경시 */
  useEffect(() => {
    if (selectedClass.id !== 0) {
      getRoomData(selectedClass.id, selectedClass.lessonTime)
    }
  }, [selectedClass])

  /* 각 룸의 다른 시간대 선택한 경우 */
  useEffect(() => {
    if (roomData.length !== 0) {
      const indexOfTime = {
        start: clickedRoomData.clickedTime,
        end: clickedRoomData.clickedTime + selectedClass.lessonTime / 30
      }
      const isBookingCheckList = []
      for (var i = indexOfTime.start; i < indexOfTime.end; i++) {
        isBookingCheckList.push(roomData[0].workTime[i].isOpenForBooking)
      }
      /* 예약 가능 여부 판단 */
      if (isBookingCheckList.includes(false)) {
        setIsBooking(false)
      } else {
        setIsBooking(true)
      }
    }
  }, [clickedRoomData])

  console.log(clickedRoomData)

  return (
    <div className="w-full flex flex-col items-center">
      <ContentHeader title="예약하기" back onClick={() => router.push('/room')} />
      <div className="w-[640px] flex flex-col items-center gap-10">
        {/* 예약 정보 */}
        <div className="w-full flex flex-col gap-10">
          <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-1 border-gray-200">
            <div className="gray-900-bold text-[20px]">예약 정보</div>
            {/*  날짜 정보 */}
            <div className="w-full h-[52px] flex border border-gray-100 rounded-md bg-primary-50 items-center justify-center">
              <div className="h-6 flex gap-2">
                <CalendarIcon className="text-gray-500" />
                <span className="gray-900-semibold text-[16px]">
                  {reservationData.reservationDate !== '' && formatReservationDate(reservationData.reservationDate)}
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-6">
              {/* 클래스 선택 */}
              <div className="w-full flex flex-col gap-2">
                <div className="gray-800-semibold text-[16px]">클래스 선택</div>
                <DropDown {...dropDownProps} handleChangeParentsClassDropdownData={handleChangeParentsDropdownData} />
                <div className="w-full flex gap-1.5 items-center">
                  <AlertIcon width={18} height={18} alt="AlertCircle" />
                  <div className="w-full gray-500-normal text-sm">
                    기간반은 [클래스 관리 - 클래스 등록]에서 강의실을 등록하고있습니다.
                  </div>
                </div>
              </div>
              {/* 수강생 찾기 */}
              {selectedClass.id !== 0 && (
                <SearchStudents handleChangeStudentId={handleChangeStudentId} classId={selectedClass.id} />
              )}
            </div>
          </div>
        </div>
        {/* 예약 시간 확정 */}
        <div className="w-full flex flex-col gap-6 pt-8 pb-6 px-6 border rounded-xl border-1 border-gray-200">
          <div className="gray-900-bold font-[20px]">예약시간 확정</div>
          <div className="w-full flex justify-end">
            <div className="flex gap-4">
              <div className="flex gap-2 h-4 items-center">
                <span className="w-4 h-4 rounded border border-gray-200 bg-white" />
                <span className="gray-600-medium text-[13px]">예약가능</span>
              </div>
              <div className="flex gap-2 h-4 items-center">
                <span className="w-4 h-4 rounded border border-gray-200 bg-gray-100" />
                <span className="gray-600-medium text-[13px]">예약불가</span>
              </div>
            </div>
          </div>
          {roomData.length !== 0 &&
            roomData.map((data: { id: number; name: string; capacity: number; workTime: any }, i: number) => {
              const roomId = data.id
              const room = data.name
              const timeRange: number = selectedClass.lessonTime / 30
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

        <button
          className={`w-full h-[52px] ${isBooking ? 'btn-purple' : 'btn-gray'} `}
          onClick={() => {
            const date = reservationData.reservationDate.split('.')
            instance
              .post('/api/session-lesson-schedules', {
                lessonId: selectedClass.id,
                studentId: studentId,
                sessionDate: date && new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2])).toISOString(),
                startTime: timeList[clickedRoomData.clickedTime],
                endTime: timeList[clickedRoomData.clickedTime + selectedClass.lessonTime / 30],
                roomId: Number(reservationData.roomId)
              })
              .then(res => {
                router.push('/room')
              })
              .catch(res => {
                console.log(res.response)
                const statusCode = res.response.status
                if (statusCode === 409) {
                  alert('선택한 수강생이 이미 예약되어있습니다.')
                }
              })
          }}
        >
          예약하기
        </button>
      </div>
    </div>
  )
}
