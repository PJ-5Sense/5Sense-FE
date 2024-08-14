import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import instance from '@/lib/api/axios'
import { changePhoneNumberToString } from '@/utils'
import SessionDetailCard from '../common/card/SessionDetailCard'
import DurationDetailCard from '../common/card/DurationDetailCard'

export default function DetailInstructor({ id }: { id: string }) {
  const router = useRouter()

  const [instructorData, setInstructorData] = useState({
    id: 0,
    name: '',
    phone: '',
    durationLessons: [],
    sessionLessons: []
  })

  useEffect(() => {
    instance(`/api/teachers/${id}`).then(res => {
      const data = res.data.data
      setInstructorData(prev => ({
        ...prev,
        id: data.id,
        name: data.name,
        phone: data.phone,
        durationLessons: data.durationLessons,
        sessionLessons: data.sessionLessons
      }))
    })
  }, [])

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      {/* 강사 이름 & 번호 */}
      <div className="w-full flex flex-col gap-2">
        <div className="gray-900-bold text-[26px]">{instructorData.name}</div>
        <div className="gray-800-medium text-base">{changePhoneNumberToString(instructorData.phone)}</div>
      </div>
      {/* 클래스 목록 */}
      <div className="w-full p-6 flex flex-col gap-4 border border-1 border-gray-200 rounded-lg shadow-[0_5px_15px_0_rgba(0,0,0,0.02)]">
        <span className="gray-800-bold text-base">클래스 목록</span>
        <div className="w-full flex flex-col gap-4 max-h-[700px] overflow-auto">
          {instructorData.sessionLessons.length !== 0 &&
            instructorData.sessionLessons.map((data, i) => {
              return <SessionDetailCard key={i} sessionData={data} />
            })}
          {instructorData.durationLessons.length !== 0 &&
            instructorData.durationLessons.map((data, i) => {
              return <DurationDetailCard key={i} durationData={data} />
            })}
        </div>
      </div>
      {/* 수정 버튼 */}
      <div className="absolute bottom-0 w-full px-6 py-[18px]">
        <button
          className="w-full h-[52px] rounded-lg bg-primary-600"
          onClick={() => [router.push(`/instructor/edit/${id}`)]}
        >
          <span className="text-white text-[16px] font-semibold">수정하기</span>
        </button>
      </div>
    </div>
  )
}
