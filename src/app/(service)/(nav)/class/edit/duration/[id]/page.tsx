'use client'
import { Button } from 'flowbite-react'
import { useParams, useRouter } from 'next/navigation'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Category from '@/components/class/classInfo/Category'
import ClassType from '@/components/class/register/classType'
import SearchPerson from '@/components/class/register/searchPerson'
import ContentHeader from '@/components/common/ContentHeader'
import TextInput from '@/components/common/TextInput'
import TextareaForm from '@/components/common/TextareaForm'
import { getDurationLessons, putDurationLessons } from '@/lib/api/class'
import { DurationScheduleType, durationClassScheduleState } from '@/lib/state/classDurationSchedule'
import { calculateLessonTime } from '@/utils'

export type classDataType = {
  name: string
  memo: string
  category: {
    id: number | undefined
    name: string | undefined
    subId: number | undefined
    subName: string | undefined
  }
  type: string
  lessonTime: number
  tuitionFee: string
  totalSessions: string
  capacity: number
  schedules: DurationScheduleType[]
  teacherId: string
}

export default function RegisterPage() {
  const router = useRouter()

  const params = useParams()

  const [teacherName, setTeacehrName] = useState('')

  const durationSchedule = useRecoilValue(durationClassScheduleState)
  const setDurationSchedule = useSetRecoilState(durationClassScheduleState)

  const Props = useForm<classDataType>({
    defaultValues: {
      name: '',
      memo: '',
      category: {
        id: undefined,
        name: undefined,
        subId: undefined,
        subName: undefined
      },
      type: 'duration',
      lessonTime: 30,
      tuitionFee: '',
      totalSessions: '',
      capacity: 1,
      schedules: durationSchedule,
      teacherId: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<classDataType> = async (data, e) => {
    let categoryId
    let categoryName

    if (data.category.subId == undefined && data.category.subName == undefined) {
      categoryId = data.category.id
      categoryName = data.category.name
    } else if (data.category.id === 9) {
      categoryId = 0
      categoryName = data.category.subName
    } else {
      categoryId = data.category.subId
      categoryName = data.category.subName
    }

    const subSchedule = data.schedules.map(({ room, ...rest }) => rest)

    let isUpdatedDurationScehdule: boolean
    if ('room' in durationSchedule[0]) {
      isUpdatedDurationScehdule = false
    } else {
      isUpdatedDurationScehdule = true
    }
    console.log('data', subSchedule)
    console.log('lessonTime', calculateLessonTime(durationSchedule[0].startTime, durationSchedule[0].endTime))
    const requestData = {
      name: data.name,
      memo: data.memo,
      tuitionFee: Number(data.tuitionFee),
      category: {
        id: categoryId,
        name: categoryName
      },
      teacherId: data.teacherId,
      schedules: [
        {
          id: Number(params.id),
          startTime: durationSchedule[0].startTime,
          endTime: durationSchedule[0].endTime,
          repeatDate: durationSchedule[0].repeatDate,
          lessonTime: isUpdatedDurationScehdule
            ? durationSchedule[0].lessonTime
            : calculateLessonTime(durationSchedule[0].startTime, durationSchedule[0].endTime),
          roomId: isUpdatedDurationScehdule ? durationSchedule[0].roomId : durationSchedule[0].room.id
        }
      ]
    }
    const result = await putDurationLessons(params.id as string, requestData)
    if (result.success) {
      router.push('/class')
    }
  }
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setFocus,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = Props

  useEffect(() => {
    return () => {
      setDurationSchedule([])
    }
  }, [])

  useEffect(() => {
    setValue('schedules', durationSchedule)
  }, [durationSchedule])

  const customHandleSubmit =
    (onValid: SubmitHandler<classDataType>, onInvalid?: SubmitErrorHandler<classDataType>) =>
    (event?: BaseSyntheticEvent) => {
      event?.preventDefault()
      if (isNaN(parseInt(getValues('teacherId')))) {
        setError('teacherId', {
          type: 'required'
        })
      } else {
        clearErrors('teacherId')
      }
      if (getValues('type') === 'duration' && getValues('schedules').length < 1) {
        setError('schedules', {
          type: 'required'
        })
      } else {
        clearErrors('schedules')
      }

      handleSubmit(onValid, onInvalid)(event)
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getDurationLessons(params.id)
        console.log(data)
        reset({
          name: data.data.name,
          memo: data.data.memo,
          category: data.data.category,
          tuitionFee: data.data.tuitionFee,
          teacherId: data.data.teacher.id
        })
        setTeacehrName(data.data.teacher.name)
        setDurationSchedule(data.data.schedules)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [params.id])

  return (
    <div className="flex flex-col items-center pb-[60px]">
      <ContentHeader title="클래스 관리" back onClick={() => router.push('/class')} />
      <form className="w-[640px] flex flex-col gap-5" onSubmit={customHandleSubmit(onSubmit)}>
        <div className={`class-box`}>
          <div className={`gray-900-bold text-xl`}>클래스 정보</div>
          <div className="info-detail flex flex-col gap-2">
            <TextInput
              register={register('name', { required: true })}
              errors={errors}
              value={watch('name')}
              title="클래스 명"
              placeholder="클래스명을 입력해 주세요"
              maxLength={20}
            />
            <TextareaForm
              register={register('memo', {
                required: true,
                onChange: e => {
                  const element = e.target as HTMLTextAreaElement
                  element.style.height = 'auto'
                  element.style.height = `${element.scrollHeight}px`
                }
              })}
              setFocus={setFocus}
              errors={errors}
              value={watch('memo')}
              title="클래스 메모"
              placeholder="클래스관련 메모를 적어주세요"
              maxLength={300}
            />
            <Category {...Props} />
          </div>
        </div>
        <ClassType {...Props} edit />
        <SearchPerson
          type="teachers"
          setValue={setValue}
          errors={errors}
          teacherName={teacherName}
          getValues={getValues}
        />
        <Button type="submit" color="primary">
          수정하기
        </Button>
      </form>
    </div>
  )
}
