'use client'

import instance from '@/hooks/useAxios'
import { idState, teachermodalState } from '@/state/modal'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

type Props = {
  isModal: boolean
  setIsModal: (modal: boolean) => void
}

const DetailModal = () => {
  const [modalValue, setModalValue] = useRecoilState(teachermodalState)
  const [idValue, setIdValue] = useRecoilState(idState)

  const router = useRouter()

  const [teacher, setTeacher] = useState({
    id: '',
    name: '',
    phone: '',
    particulars: ''
  })

  const getUserInfo = () => {
    instance.get(`/teachers/${idValue}`).then(res => {
      console.log(res)
      setTeacher(res.data.data)
    })
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className="relative w-[480px] h-full bg-white rounded-tr-[32px] shadow">
      <div className="flex flex-col pt-[72px] px-6 box-border gap-[81px]"></div>
      <button
        className="absolute top-6 right-6"
        onClick={() => setModalValue(!modalValue)}
      >
        x
      </button>
      <div className="p-6">
        <div className="text-gray-900 text-[26px] font-bold mb-2">
          {teacher.name}
        </div>
        <div className="text-gray-800 text-base font-medium mb-5">
          {teacher.phone.slice(0, 3)}-{teacher.phone.slice(3, 7)}-
          {teacher.phone.slice(7, 11)}
        </div>

        <div className="text-gray-500 text-sm font-normal">
          {teacher.particulars}
        </div>
      </div>
      <button
        className="absolute bottom-[18px] w-[431px] left-6 px-6 py-3.5 btn-purple"
        onClick={() => router.push('/teacher/edit')}
      >
        수정하기
      </button>
    </div>
  )
}

export default DetailModal
