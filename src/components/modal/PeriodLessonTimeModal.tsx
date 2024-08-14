'use client'
import { useState } from 'react'

import DropDown from '../common/DropDown'

import MinusIcon from 'public/assets/icons/minus_vector.svg'
import PlusIcon from 'public/assets/icons/plus_vector.svg'

interface PeriodLessonTimeDataType {
  lessonTime: number
  date: string
}

interface IProps {
  handleChangeLessonTimeFromChild: (time: string, type: string) => void
}

export default function PeriodLessonTimeModal(props: IProps) {
  const [postData, setPostData] = useState<PeriodLessonTimeDataType>({
    lessonTime: 30,
    date: ''
  })

  const dateDropdownProps = {
    title: '요일 선택',
    list: ['월', '화', '수', '목', '금', '토', '일']
  }

  const handleChangeLessonTimeFromChild = (data: string) => {
    setPostData(prev => ({
      ...prev,
      date: data
    }))
  }

  const handleLessonTime = (type: string) => {
    if (type === 'plus') {
      setPostData(prev => ({
        ...prev,
        lessonTime: prev.lessonTime + 30
      }))
    } else if (type === 'minus') {
      setPostData(prev => ({
        ...prev,
        lessonTime: prev.lessonTime - 30
      }))
    }
  }

  const handleClickCheck = () => {
    console.log(postData)
    /* if (postData.openTime !== '' && postData.closeTime !== '' && postData.date.length !== 0) {
      props.handleChangeLessonTimeFromChild(`${postData.openTime}-${postData.closeTime},${postData.date}`, 'duration')
    } */
    props.handleChangeLessonTimeFromChild(`${postData.date}/ ${postData.lessonTime}분`, 'duration')
  }

  return (
    <div className="w-[380px] bg-white p-4 flex flex-col gap-6 rounded-lg border border-1 border-primary-600 shadow">
      <div className="w-full flex flex-col gap-2">
        <div className="gray-800-semibold text-base">요일 선택</div>
        <DropDown
          {...dateDropdownProps}
          handleChangeParentsDropdownDataCheckbox={handleChangeLessonTimeFromChild}
          type="checkbox"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="gray-800-semibold text-base">소요 시간</div>
        <div className="w-full flex justify-between items-center h-16 p-3 border border-1 border-gray-300 rounded-full">
          <button
            disabled={postData.lessonTime === 30}
            className={`w-10 h-full flex justify-center items-center rounded-full bg-primary-600 cursor-pointer disabled:bg-gray-200`}
            onClick={() => handleLessonTime('minus')}
          >
            <MinusIcon />
          </button>
          <div className="w-[186px] h-[27px] flex justify-center items-center gray-800-semibold text-lg">
            {postData.lessonTime}분
          </div>
          <button
            className="w-10 h-full flex justify-center items-center rounded-full bg-primary-600 cursor-pointer"
            onClick={() => {
              handleLessonTime('plus')
            }}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="w-full flex gap-2.5">
        <button
          type="button"
          className="w-full h-[41px] flex justify-center items-center gray-800-semibold text-sm btn-white"
        >
          취소
        </button>
        <button
          type="button"
          className="w-full h-[41px] flex justify-center items-center gray-800-semibold text-sm text-white btn-purple-sm"
          onClick={() => handleClickCheck()}
        >
          확인
        </button>
      </div>
    </div>
  )
}
