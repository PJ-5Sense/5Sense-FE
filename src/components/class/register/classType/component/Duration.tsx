import { durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import { Button, Modal } from 'flowbite-react'
import { UseFormReturn } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import RoomReservation from '@/components/room/RoomReservation'
import UseModal from '@/hooks/useModal'
import PlusIcon from '@/icons/icon/plus.svg'
import { getKoreanNumber } from '@/utils'
import DurationScheduleCheck from '../../../../check/ClassDurationScheduleCheck'
import { Props } from '..'
import { useParams } from 'next/navigation'

export default function Duration({ register, watch, formState, getValues, edit }: Props) {
  const { errors, defaultValues } = formState
  const duarationSchedule = useRecoilValue(durationClassScheduleState)
  const params = useParams()

  const [Schedule, close, open] = UseModal()

  // const changeTuitionFee = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value: string = e.target.value
  //   const removedCommaValue = value.replaceAll(',', '')
  //   if (isNaN(Number(removedCommaValue))) {
  //     return setClassType(prev => ({ ...prev, tuitionFee: '' }))
  //   }

  //   if (removedCommaValue.length > 9) {
  //     setModal(true)
  //     setNoticeModal(true)
  //   }

  //   setClassType(prev => ({ ...prev, tuitionFee: Number(removedCommaValue.slice(0, 9)).toLocaleString() }))
  // }

  // console.log(duarationSchedule)

  // useEffect(() => {
  //   setIsParams(Boolean(params))
  //   console.log(isParams)
  // }, [params])

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex flex-col gap-2">
        <p
          className={`${errors.tuitionFee != null ? 'text-red-500' : 'text-gray-800'} text-base font-semibold leading-normal`}
        >
          수강료
        </p>
        <input
          type="number"
          className="w-full h-[60px] border-b-2 border-x-0 border-t-0 flex-col justify-center items-start gray-900-semibold text-2xl placeholder:text-gray-300 focus:shadow-none focus:border-current focus:ring-0 focus:ring-transparent"
          placeholder="0 원"
          {...register('tuitionFee', { required: true })}
          onWheel={e => e.currentTarget.blur()}
        />
        <p className="text-gray-500 text-sm font-normal font-['Inter']">
          {getKoreanNumber(watch('tuitionFee').toString())}원
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className={`${errors.schedules ? 'text-red-500' : 'text-gray-800'} gray-800-semibold`}>일정</p>
        {!edit && (
          <Button color="outline" fullSized onClick={open}>
            <PlusIcon className="mr-2" />
            일정 추가
          </Button>
        )}

        {/**여기 일정 UI 들어가면 됩니다. */}
        <DurationScheduleCheck edit={edit} onClick={open} />
      </div>
      <Modal size="md" show={Schedule} onClose={close}>
        <Modal.Header>일정 추가</Modal.Header>
        <Modal.Body>
          <RoomReservation classType="duration" viewType="modal" onClose={close} edit={edit} />
        </Modal.Body>
      </Modal>
    </div>
  )
}
