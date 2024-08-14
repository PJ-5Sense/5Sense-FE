'use client'
import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'
import { modalState } from '@/lib/state/modal'
import instance from '@/lib/api/axios'
import DayCalendar from '@/components/common/calendar/DayCalendar'
import RoomDataFormatter from '@/components/room/roomDataFormatter'
import ContentHeader from '@/components/common/ContentHeader'
import RoomList from '@/components/room/roomList'
import RoomSchedule from '@/components/room/RoomSchedule'

export default function RoomPage() {
  const currentDate = new Date()
  const calendarDate = useRecoilValue(DayCalendarDateState)
  const setCalendarDate = useSetRecoilState(DayCalendarDateState)
  const router = useRouter()
  const [indexOfRoomList, setIndexOfRoomList] = useState<number>(0)
  const [room, setRoom] = useState<any>([])
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const onChangeRoomList = (num: number) => {
    setIndexOfRoomList(num)
  }

  const getRoomData = () => {
    instance('/api/lesson-rooms/daily', {
      params: {
        date: new Date(calendarDate.year, calendarDate.month, calendarDate.date).toISOString()
      }
    }).then(res => {
      const list = res.data.data
      const formatData = RoomDataFormatter(list)
      setRoom(formatData)
    })
  }

  const onDeleteRoom = (roomId: number) => {
    if (confirm('해당 룸을 삭제하시겠습니까?')) {
      instance.delete(`/api/lesson-rooms/${roomId}`).then(res => {
        getRoomData()
      })
    } else {
      return
    }
  }

  useEffect(() => {
    getRoomData()

    return () => {
      if (!window.location.href.includes('room')) {
        setCalendarDate({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth(),
          date: currentDate.getDate()
        })
      }
    }
  }, [calendarDate])

  /* useEffect(() => {
    return () => {
      if (!window.location.href.includes('room')) {
        setCalendarDate({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth(),
          date: currentDate.getDate()
        })
      }
    }
  }, []) */

  return (
    <div>
      <ContentHeader title="강의실 관리" btnName="강의실 추가" onClick={() => router.push('room/register')} />
      {/* 캘린더 */}
      <DayCalendar page="room" />
      {/* 룸 리스트 */}
      <RoomList
        roomData={room}
        onChangeRoomList={onChangeRoomList}
        indexOfRoomList={indexOfRoomList}
        onDeleteRoom={onDeleteRoom}
      />
      {/* 룸 시간표 */}
      <RoomSchedule roomScheduleData={room} indexOfRoomList={indexOfRoomList} />
    </div>
  )
}
