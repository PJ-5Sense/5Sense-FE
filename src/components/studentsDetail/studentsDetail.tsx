import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { changePhoneNumberToString } from '@/utils'
import StudentsDuration from './card/studentsDuartion'
import StudentsSession from './card/studentsSession'
import instance from '@/lib/api/axios'

interface IProps {
  studentData: {
    id: string
    name: string
    phone: string
    particulars: string
    lessons: any
  }
}

export interface durationLessonsType {
  name: string
  paymentStatus: string
  schedules: {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    repeatDate: string
    room: string
  }[]
}

export interface sessionLessonsType {
  name: string
  id?: number
  paymentStatus: string
  schedules: {
    sessionDate: string
    restOfSessions: number
    room: string
    startTime: string
    endTime: string
  }[]
}

export default function StudentsDetail({ studentData }: IProps) {
  const router = useRouter()
  const [studentsLessonData, setStudentLessonData] = useState<{
    durationLessons: durationLessonsType[]
    sessionLessons: sessionLessonsType[]
  }>({
    durationLessons: [],
    sessionLessons: []
  })

  useEffect(() => {
    instance(`/api/students/${studentData.id}`).then(res => {
      const data = res.data.data
      setStudentLessonData(prev => ({
        ...prev,
        durationLessons: data.durationLessons,
        sessionLessons: data.sessionLessons
      }))
    })
  }, [])

  console.log(studentsLessonData)

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      {/* 수강생 이름 & 번호 & 특이사항 */}
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-2">
          <div className="gray-900-bold text-[26px]">{studentData.name}</div>
          <div className="gray-800-medium text-base">{changePhoneNumberToString(studentData.phone)}</div>
        </div>
        <div className="w-full gray-500-normal text-[14px]">{studentData.particulars}</div>
      </div>

      {/* 클래스 목록 */}
      <div className="w-full p-6 flex flex-col gap-4 border border-1 border-gray-200 rounded-lg shadow-[0_5px_15px_0_rgba(0,0,0,0.02)]">
        <span className="gray-800-bold text-base">클래스 목록</span>
        <div className="w-full flex flex-col gap-4 max-h-[700px] overflow-auto">
          {studentsLessonData.durationLessons.length !== 0 &&
            studentsLessonData.durationLessons.map((data, i) => {
              return (
                <StudentsDuration
                  key={i}
                  type="detail"
                  className={data.name}
                  paymentStatus={data.paymentStatus}
                  schedules={data.schedules[0]}
                />
              )
            })}
          {studentsLessonData.sessionLessons.length !== 0 &&
            studentsLessonData.sessionLessons.map((data, i) => {
              return (
                <StudentsSession
                  key={i}
                  type="detail"
                  className={data.name}
                  paymentStatus={data.paymentStatus}
                  restOfSessions={data.schedules[0].restOfSessions}
                  totalLessons={data.schedules[0].restOfSessions + data.schedules.length}
                />
              )
            })}
        </div>
      </div>
      {/* 수정 버튼 */}
      <div className="absolute bottom-0 w-full px-6 py-[18px]">
        <button className="w-full h-[52px] btn-purple" onClick={() => [router.push(`/student/edit/${studentData.id}`)]}>
          <span className="text-white text-[16px] font-semibold">수정하기</span>
        </button>
      </div>
    </div>
  )
}
