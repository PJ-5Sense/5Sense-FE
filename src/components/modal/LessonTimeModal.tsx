'use client'
import Image from 'next/image'

import Minus from 'public/assets/icons/minus_vector.svg'
import Plus from 'public/assets/icons/plus_vector.svg'
import { useState } from 'react'

interface IProps {
  handleChangeLessonTimeFromChild: (time: number) => void
  lessonTime: number | string
}

export default function LessonTimeModal(props: IProps) {
  const [lessonTime, setLessonTime] = useState<number>(props.lessonTime === '시간' ? 30 : Number(props.lessonTime))
  const handleChangeLessonTime = (type: string) => {
    if (type === 'plus') {
      setLessonTime(prev => (prev += 30))
    } else {
      if (lessonTime === 0) {
        return
      } else {
        setLessonTime(prev => (prev -= 30))
      }
    }
  }

  const handleChangeParentsLessonTime = () => {
    props.handleChangeLessonTimeFromChild(lessonTime)
  }

  return (
    <div className="w-[282px] p-4 bg-white flex flex-col gap-6 rounded-lg border border-1 border-primary-600">
      <div className="w-full flex flex-col gap-6">
        <div className="w-full h-6 text-left gray-900-semibold text-base">소요 시간</div>
        <div className="w-full flex items-center justify-between h-10">
          <button
            className={`w-10 h-full flex justify-center items-center rounded-full ${
              lessonTime === 0 ? 'bg-gray-200' : 'bg-primary-600'
            }`}
            onClick={() => handleChangeLessonTime('minus')}
          >
            <Image src={Minus} width={12} height={9.6} alt="minus" />
          </button>
          <div className="w-[186px] h-[27px] flex justify-center items-center gray-800-semibold text-lg">
            {lessonTime}분
          </div>
          <button
            className="w-10 h-full flex justify-center items-center rounded-full bg-primary-600"
            onClick={() => {
              handleChangeLessonTime('plus')
            }}
          >
            <Image src={Plus} width={14} height={14} alt="plus" />
          </button>
        </div>
      </div>
      <div className="w-full flex gap-2.5">
        <button
          type="button"
          className="w-full h-[41px] rounded-lg border border-1 border-gray-200 flex justify-center items-center gray-800-semibold text-sm btn-white"
        >
          취소
        </button>
        <button
          type="button"
          className="w-full h-[41px] rounded-lg bg-primary-600 flex justify-center items-center text-white font-semibold text-sm btn-purple"
          onClick={() => {
            handleChangeParentsLessonTime()
          }}
        >
          확인
        </button>
      </div>
    </div>
  )
}
