'use client'

import MinusIcon from 'public/assets/icons/minus_vector.svg'
import PlusIcon from 'public/assets/icons/plus_vector.svg'

import { formatAddComma } from '@/utils'
import { Props } from '..'

export default function Session({ register, watch, setValue, formState, edit }: Props) {
  const { errors } = formState
  const disabled = false

  function geKoreanNumber(value: string) {
    const koreanUnits = ['조', '억', '만', '']
    const unit = 10000
    let answer = ''

    let number = Number(value.replaceAll(',', ''))

    while (number > 0) {
      const mod = number % unit
      console.log(mod)
      // 콤마표현하는 함수
      const modToString = mod.toString().replace(/(\d)(\d{3})/, '$1,$2')
      number = Math.floor(number / unit)
      if (modToString === '0') {
        koreanUnits.pop()
        answer = answer
      } else {
        answer = `${modToString}${koreanUnits.pop()}${answer}`
      }
    }
    return answer
  }

  // const changeTuitionFee = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value: string = e.target.value
  //   const removedCommaValue = value.replaceAll(',', '')

  //   if (isNaN(Number(removedCommaValue))) {
  //     return setClassType(prev => ({ ...prev, tuitionFee: '' }))
  //   }
  //   setClassType(prev => ({ ...prev, tuitionFee: Number(removedCommaValue.slice(0, 9)).toLocaleString() }))
  // }

  // const handleCnt = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value

  //   if (isNaN(Number(value))) {
  //     return setClassType(prev => ({ ...prev, totalSessions: '' }))
  //   }
  //   setClassType(prev => ({ ...prev, totalSessions: value }))
  // }

  const handleLessonTime = (type: string) => {
    if (type === 'plus') {
      setValue('lessonTime', watch('lessonTime') + 30)
    } else {
      setValue('lessonTime', watch('lessonTime') - 30)
    }
  }

  const handleStudentCnt = (type: string) => {
    if (type === 'plus') {
      setValue('capacity', watch('capacity') + 1)
    } else {
      setValue('capacity', watch('capacity') - 1)
    }
  }

  return (
    <div className="w-full flex flex-col">
      {/* 수강료 */}
      <div className="payBox w-full flex flex-col gap-2">
        <p className={`${errors.tuitionFee ? 'text-[#EF5D5D]' : ''} gray-800-semibold`}>수강료</p>
        <div className="flex flex-col gap-2.5">
          <div className="w-full px-5 py-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-between gap-4">
            <div className="flex w-full items-center">
              <span className="text-[#4B5563] text-base font-medium">1회 금액</span>
              <input
                type="number"
                className="flex-grow text-right placeholder:text-gray-400 text-base font-normal border-none outline-none disabled:bg-inherit disabled:text-[#9CA3AF] focus:shadow-none focus:border-current focus:ring-0 focus:ring-transparent"
                placeholder="0"
                disabled={edit}
                {...register('tuitionFee', { required: true })}
                onWheel={e => e.currentTarget.blur()}
              />
              <span className="text-gray-400 text-base font-normal">원</span>
            </div>
            <div className="w-[552px] h-px bg-gray-200" />
            <div className="flex w-full items-center">
              <span className="text-[#4B5563] text-base font-medium">총 회차</span>
              <input
                type="number"
                className="flex-grow text-right placeholder:text-gray-400 text-base font-normal border-none outline-none disabled:bg-inherit disabled:text-[#9CA3AF] focus:shadow-none focus:border-current focus:ring-0 focus:ring-transparent"
                placeholder="0"
                disabled={edit}
                {...register('totalSessions', { required: true })}
              />
              <span className="text-gray-400 text-base font-normal">회</span>
            </div>
          </div>
          <div className="w-full p-5 bg-gray-50 rounded-lg flex flex-col">
            <div className="flex w-full">
              <span className="gray-900-semibold text-base">총 금액</span>
              <span
                className={`flex-grow text-right text-[22px] font-bold ${edit ? 'text-[#9CA3AF]' : 'text-indigo-500'}`}
              >
                {formatAddComma(watch('tuitionFee'), watch('totalSessions'))}원
              </span>
            </div>
            <p className="text-right text-gray-500 text-xs font-medium">
              {geKoreanNumber(formatAddComma(watch('tuitionFee'), watch('totalSessions')))}원
            </p>
          </div>
        </div>
      </div>
      {/* 상세 내역 */}
      <div className="detailInfo w-full flex flex-col gap-3 mt-6">
        <p className="gray-800-semibold text-base">상세 내역</p>
        <div className="w-full flex">
          <div className="w-[3px] h-[21px] bg-indigo-500 rounded-sm" />
          <div className="text-gray-600 text-sm font-normal ml-3.5">1회 금액 * 총 회차</div>
          <div className="flex-grow text-right text-gray-600 text-sm font-normal">
            {watch('tuitionFee')}*{watch('totalSessions')}회
          </div>
        </div>
      </div>
      {/* 소요 시간*/}
      <div className="time w-full flex flex-col gap-2 mt-10">
        <div className="gray-800-semibold text-base">소요 시간</div>
        <div
          className={`w-full flex justify-between h-16 p-3 border border-1 border-gray-300 rounded-full ${edit && 'bg-gray-50'}`}
        >
          <button
            disabled={watch('lessonTime') === 30 || edit}
            className={`w-10 h-full flex justify-center items-center rounded-full ${edit ? 'bg-gray-200' : 'bg-primary-600'} cursor-pointer`}
            onClick={e => {
              e.preventDefault()
              handleLessonTime('minus')
            }}
          >
            <MinusIcon />
          </button>
          <div
            className={`w-[186px] h-[27px] flex justify-center items-center  text-lg ${
              disabled ? 'text-[#9CA3AF]' : 'gray-800-semibold'
            }`}
          >
            {watch('lessonTime')}분
          </div>
          <button
            disabled={edit}
            className={`w-10 h-full flex justify-center items-center rounded-full ${edit ? 'bg-gray-200' : 'bg-primary-600'} cursor-pointer`}
            onClick={e => {
              e.preventDefault()
              handleLessonTime('plus')
            }}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      {/* 최대 수업 정원*/}
      <div className="w-full flex flex-col gap-2 mt-8">
        <div className="text-base gray-800-semibold">최대 수업 정원</div>
        <div
          className={`w-full flex justify-between h-16 p-3 border border-1 border-gray-300 rounded-full ${edit && 'bg-gray-50'}`}
        >
          <button
            disabled={watch('capacity') === 1 || edit}
            className={`w-10 h-full flex justify-center items-center rounded-full ${edit ? 'bg-gray-200' : 'bg-primary-600'} cursor-pointer`}
            onClick={e => {
              e.preventDefault()
              handleStudentCnt('minus')
            }}
          >
            <MinusIcon />
          </button>
          <div
            className={`w-[186px] h-[27px] flex justify-center items-center  text-lg ${
              disabled ? 'text-[#9CA3AF]' : 'gray-800-semibold'
            }`}
          >
            {watch('capacity')}명
          </div>
          <button
            disabled={edit}
            className={`w-10 h-full flex justify-center items-center rounded-full ${edit ? 'bg-gray-200' : 'bg-primary-600'} cursor-pointer`}
            onClick={e => {
              e.preventDefault()
              handleStudentCnt('plus')
            }}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
