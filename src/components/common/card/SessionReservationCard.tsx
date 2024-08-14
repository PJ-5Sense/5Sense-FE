import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import instance from '@/lib/api/axios'
import { calculateEndTime, formatDate } from '@/utils'
import { AddSessionState } from '@/lib/state/addSessionState'

export default function SessionReservationCard({ roomId }: { roomId: string }) {
  const setAddSessionState = useSetRecoilState(AddSessionState)
  const [classData, setClassData] = useState({
    category: '',
    className: '',
    instructorName: '',
    lessonTime: 0
  })

  const [reservationData, setReservationData] = useState({
    roomId: '',
    roomName: '',
    classId: '',
    studentId: 0,
    reservationdDate: '',
    reservationTime: ''
  })

  useEffect(() => {
    const classId = localStorage.getItem('classId') as string
    const reservationDate = localStorage.getItem('reservationDate') as string
    const reservationTime = localStorage.getItem('reservationTime') as string

    instance('/api/lesson-rooms/daily', {
      params: {
        date: new Date().toISOString()
      }
    }).then(res => {
      const roomData = res.data.data
      const targetRoom = roomData.filter((data: { id: number }) => data.id === Number(roomId))
      console.log(targetRoom)
      setReservationData(prev => ({
        ...prev,
        roomId: roomId,
        roomName: targetRoom[0].name
      }))
    })

    instance(`/api/session-lessons/${classId}/details`).then(res => {
      const classDetail = res.data.data
      setClassData(prev => ({
        ...prev,
        category: classDetail.category.subName === null ? classDetail.category.name : classDetail.category.subName,
        className: classDetail.name,
        instructorName: classDetail.teacher.name,
        lessonTime: classDetail.lessonTime
      }))
      setReservationData(prev => ({
        ...prev,
        classId: classId,
        reservationdDate: reservationDate,
        reservationTime: reservationTime
      }))
      setAddSessionState(prev => ({
        ...prev,
        lessonId: Number(classId),
        sessionDate: new Date(
          Number(reservationDate.split('.')[0]),
          Number(reservationDate.split('.')[1]) - 1,
          Number(reservationDate.split('.')[2])
        ).toISOString(),
        startTime: reservationTime,
        endTime: calculateEndTime(reservationTime, classDetail.lessonTime),
        roomId: Number(roomId)
      }))
    })

    return () => {
      localStorage.removeItem('classId')
      localStorage.removeItem('reservationDate')
      localStorage.removeItem('reservationTime')
    }
  }, [])

  return (
    <div className="w-full px-6 py-8 border border-gray-200 rounded-xl bg-white">
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-center items-center w-[72px] h-7 px-2.5 py-2 rounded bg-secondary-100">
          <span className="text-secondary-600 font-semibold text-[12px]">{classData.category}</span>
        </div>
        <span className="gray-900-bold text-[20px]">{classData.className}</span>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-6 flex gap-8 items-center">
            <span className="w-[120px] gray-500-medium text-[16px]">• 강사</span>
            <span className="gray-800-normal text-[16px]">{classData.instructorName}</span>
          </div>
          <div className="w-full h-6 flex gap-8 items-center">
            <span className="w-[120px] gray-500-medium text-[16px]">• 날짜</span>
            <span className="gray-800-normal text-[16px]">
              {reservationData.reservationdDate !== '' && formatDate(reservationData.reservationdDate)}
            </span>
          </div>
          <div className="w-full h-6 flex gap-8 items-center">
            <span className="w-[120px] gray-500-medium text-[16px]">• 시간</span>
            <span className="gray-800-normal text-[16px]">
              {reservationData.reservationTime} -{' '}
              {calculateEndTime(reservationData.reservationTime, classData.lessonTime)}
            </span>
          </div>
          <div className="w-full h-6 flex gap-8 items-center">
            <span className="w-[120px] gray-500-medium text-[16px]">• 룸</span>
            <span className="gray-800-normal text-[16px]">{reservationData.roomName}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
