'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import instance from '@/lib/api/axios'
import ContentHeader from '@/components/common/ContentHeader'

import MinusIcon from 'public/assets/icons/minus_vector.svg'
import PlusIcon from 'public/assets/icons/plus_vector.svg'

export default function AddRoom() {
  const router = useRouter()
  const [permissonNum, setPermissonNum] = useState<number>(1)
  const [roomName, setRoomName] = useState<string>('')
  const [inputCount, setInputCount] = useState<number>(0)

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.slice(0, 20)
      setRoomName(e.target.value)
    }
    setRoomName(e.target.value)
    setInputCount(e.target.value.length)
  }

  return (
    <div className="w-full flex flex-col items-center pb-[60px]">
      <ContentHeader title="강의실 추가" back onClick={() => router.push('/room')} />
      <form
        className="w-[640px] flex flex-col gap-[34px]"
        onSubmit={e => {
          e.preventDefault()
          instance
            .post('/api/lesson-rooms', {
              name: roomName,
              capacity: permissonNum
            })
            .then(res => {
              router.push('/room')
            })
        }}
      >
        <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-1 border-gray-200">
          <div className="gray-900-bold text-xl">강의실 정보</div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-full text-left gray-800-semibold text-base">강의실 이름</div>
              <input
                className="input-line-gray"
                placeholder="강의실 이름을 입력해주세요"
                value={roomName}
                maxLength={20}
                onChange={e => {
                  onInputHandler(e)
                }}
              />
              <div className="w-full text-right gray-500-normal text-sm font-['Inter']">{inputCount}/20</div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full gray-800-semibold text-base">권장 허용 인원</div>
              <div className="w-full flex justify-between h-[64px] p-3 border border-1 border-gray-300 rounded-full">
                <button
                  type="button"
                  className={`w-10 h-full flex items-center justify-center rounded-full ${
                    permissonNum === 1 ? 'bg-gray-200' : 'bg-primary-600'
                  }`}
                  onClick={() => {
                    if (permissonNum !== 1) {
                      setPermissonNum(prev => prev - 1)
                    }
                  }}
                >
                  <MinusIcon />
                </button>
                <div className="w-[472px] h-full flex items-center justify-center text-lg gray-800-semibold">
                  {permissonNum}명
                </div>
                <button
                  type="button"
                  className="w-10 h-full flex items-center justify-center rounded-full bg-primary-600"
                  onClick={() => {
                    setPermissonNum(prev => prev + 1)
                  }}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-[52px] flex justify-center items-center text-white text-base font-semibold btn-purple"
        >
          추가하기
        </button>
      </form>
    </div>
  )
}
