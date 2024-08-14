import { ChangeEvent, useEffect, useState } from 'react'

import Modal from '@/components/common/modal'
import AddClassModal from '@/components/modal/AddClassModal'
import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import { modalState } from '@/lib/state/modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import PlusIcon from 'public/assets/icons/circle/plus.svg'
import { ITypeProps } from '..'
import { useParams } from 'next/navigation'
import EditDurationScheduleCheck from '../../../../check/EditClassDurationScheduleCheck'

export default function Duration({ classType, setClassType, valid }: ITypeProps) {
  const params = useParams<{ type: string; id: string }>()

  console.log(Boolean(params))

  const setModal = useSetRecoilState(modalState)
  const duarationSchedule = useRecoilValue(durationClassScheduleState)
  const [noticeModal, setNoticeModal] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)

  function geKoreanNumber(value: string) {
    const koreanNumber = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
    const tenUnit = ['', '십', '백', '천']
    const tenThousandUnit = ['조', '억', '만', '']
    const unit = 10000

    let number = Number(value.replaceAll(',', ''))

    let answer = ''

    while (number > 0) {
      const mod = number % unit
      const modToArray = mod.toString().split('')
      const length = modToArray.length - 1

      const modToKorean = modToArray.reduce((acc, value, index) => {
        const valueToNumber = +value
        if (!valueToNumber) return acc
        // 단위가 십 이상인 '일'글자는 출력하지 않는다. ex) 일십 -> 십
        const numberToKorean = index < length && valueToNumber === 1 ? '' : koreanNumber[valueToNumber]
        return `${acc}${numberToKorean}${tenUnit[length - index]}`
      }, '')

      answer = `${modToKorean}${tenThousandUnit.pop()} ${answer}`
      number = Math.floor(number / unit)
    }

    return answer
  }

  const changeTuitionFee = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    const removedCommaValue = value.replaceAll(',', '')
    if (isNaN(Number(removedCommaValue))) {
      return setClassType((prev: any) => ({ ...prev, tuitionFee: '' }))
    }

    if (removedCommaValue.length > 9) {
      setModal(true)
      setNoticeModal(true)
    }

    setClassType((prev: any) => ({ ...prev, tuitionFee: Number(removedCommaValue.slice(0, 9)).toLocaleString() }))
  }

  console.log(duarationSchedule)

  // useEffect(() => {
  //   setIsParams(Boolean(params))
  //   console.log(isParams)
  // }, [params])

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-col gap-2">
        <p className={`${valid?.fee ? '' : 'text-[#EF5D5D]'} gray-800-semibold`}>수강료</p>
        <input
          type="text"
          className="w-full h-[60px] py-3 box-border border-b-2 flex-row-reverse items-center justify-end border-gray-700 text-gray-900 text-2xl font-semibold focus:outline-none placeholder:text-gray-300"
          onChange={changeTuitionFee}
          value={classType.tuitionFee}
          placeholder="0 원"
        />
        <p className="text-gray-500 text-sm font-normal font-['Inter']">{geKoreanNumber(classType.tuitionFee)}원</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className={`${valid?.schedule ? '' : 'text-[#EF5D5D]'} gray-800-semibold`}>일정</p>
        <EditDurationScheduleCheck />
        {/**여기 일정 UI 들어가면 됩니다. */}
      </div>
      {/* {noticeModal && (
        <Modal small>
          <div className="w-[424px] h-[282px] px-6 pt-[82px] pb-6 bg-white rounded-xl border border-gray-900 flex flex-col justify-center items-center">
            <p className="text-gray-900 text-2xl font-bold">
              최대 금액 <span className="text-indigo-500">₩999,999,999</span>
            </p>
            <p className="text-gray-900 text-2xl font-bold mb-[52px]">초과 했습니다.</p>
            <div
              className="w-full btn-purple-lg"
              onClick={() => {
                setModal(false)
                setNoticeModal(false)
              }}
            >
              확인
            </div>
          </div>
        </Modal>
      )} */}
      {/* {scheduleModal && (
        <Modal small>
          <AddClassModal
            onClick={() => {
              setModal(false)
              setScheduleModal(false)
            }}
          />
        </Modal>
      )} */}
    </div>
  )
}
