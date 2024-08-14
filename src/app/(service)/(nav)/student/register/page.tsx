'use client'
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'
import { SetStateAction, useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Modal, Button } from 'flowbite-react'

import useInputNum from '@/hooks/useInputNum'
import instance from '@/lib/api/axios'
import StudentAddClassModal from '@/components/modal/StudentAddClassModal'
import UseModal from '@/hooks/useModal'
import { sessionScheduleState } from '@/lib/state/studentSessionSchedule'
import { studentDurationScheduleState } from '@/lib/state/studentDurationSchedule'
import AddDurationLessonCheck from '@/components/student/addDurationLessonCheck'
import { AddSessionLessonCheck } from '@/components/student/addSessionLessonCheck'
import ContentHeader from '@/components/common/ContentHeader'

import PlusIcon from '@/icons/icon/plus.svg'

type studentInfo = {
  name: string
  phone: string
  particulars: string
}

export interface InputNumProps {
  name: string
  submitData: any
  setSubmitData: React.Dispatch<SetStateAction<any>>
}

export default function StudentRegister() {
  const router = useRouter()
  const durationSchedule = useRecoilValue(studentDurationScheduleState)
  const setDurationSchedule = useSetRecoilState(studentDurationScheduleState)
  const sessionSchedule = useRecoilValue(sessionScheduleState)
  const setSessionSchedule = useSetRecoilState(sessionScheduleState)
  const [Schedule, close, open] = UseModal()
  const [studentInfo, setStudentInfo] = useState<studentInfo>({
    name: '',
    phone: '',
    particulars: ''
  })
  const [InputValue, handleChange] = useInputNum({
    name: 'phone',
    submitData: studentInfo,
    setSubmitData: setStudentInfo
  })

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength: number = e.target.maxLength
    const title: string = e.target.title
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength)
    }
    setStudentInfo(prev => ({
      ...prev,
      [title]: e.target.value
    }))
  }

  const onDeleteDurationSchedules = (classId: number) => {
    const formatedDurationSchedules = durationSchedule.filter(
      (data: { classId: number }, i) => data.classId !== classId
    )
    setDurationSchedule(formatedDurationSchedules)
  }

  const studentRigister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sessionSchedule.length !== 0) {
      instance.post('/api/students', studentInfo).then((res: AxiosResponse) => {
        const studentData = res.data.data
        const studentId = studentData.id
        instance
          .post('/api/session-lesson-registrations', {
            studentId: studentId,
            lessonId: sessionSchedule[0].lessonId,
            paymentStatus: sessionSchedule[0].paymentStatus
          })
          .then(res => {
            const sessionDate = {
              year: Number(sessionSchedule[0].sessionDate.split('.')[0]),
              month: Number(sessionSchedule[0].sessionDate.split('.')[1]) - 1,
              date: Number(sessionSchedule[0].sessionDate.split('.')[2])
            }
            instance
              .post('/api/session-lesson-schedules', {
                lessonId: sessionSchedule[0].lessonId,
                studentId: studentId,
                sessionDate: new Date(sessionDate.year, sessionDate.month, sessionDate.date).toISOString(),
                startTime: sessionSchedule[0].startTime,
                endTime: sessionSchedule[0].endTime,
                roomId: sessionSchedule[0].roomId
              })
              .then(res => {
                router.push('/student')
              })
          })
      })
    } else if (durationSchedule.length !== 0) {
      instance.post('/api/students', studentInfo).then(res => {
        const studentData = res.data.data
        const studentId = studentData.id
        instance
          .post('/api/duration-lesson-registrations', {
            studentId: Number(studentId),
            lessonId: durationSchedule[0].classId,
            paymentStatus: durationSchedule[0].paymentStatus
          })
          .then(res => {
            router.push('/student')
          })
      })
    } else {
      instance.post('/api/students', studentInfo).then(res => {
        router.push('/student')
      })
    }
  }

  useEffect(() => {
    /* 회차, 기간반 스케줄 초기화 */
    return () => {
      setSessionSchedule([])
      setDurationSchedule([])
    }
  }, [])

  return (
    <div className="w-full flex flex-col items-center pb-[60px]">
      <ContentHeader title="수강생 등록" back onClick={() => router.push('/student')} />
      <div className="w-[640px]">
        <form className="flex flex-col gap-5 pb-[60px]" onSubmit={studentRigister}>
          {/* 수강생 정보 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl ">수강생 정보</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">이름</div>
                <input
                  className={`${
                    InputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="text"
                  title="name"
                  placeholder="이름을 입력해주세요"
                  value={studentInfo.name}
                  maxLength={20}
                  onChange={onInputHandler}
                />
                <div className="w-full text-right gray-500-normal text-sm font-['Inter']">
                  {studentInfo.name.length}/20
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">전화번호</div>
                <input
                  className={`${
                    InputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="number"
                  title="phone"
                  placeholder="전화번호를 입력해주세요 (-제외)"
                  value={studentInfo.phone}
                  onChange={onInputHandler}
                  maxLength={12}
                  onWheel={e => {
                    e.currentTarget.blur()
                  }}
                />
                <div className="w-full text-right gray-500-normal text-sm font-['Inter']">
                  {studentInfo.phone.length}/12
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="gray-800-semibold">특이사항</div>
                <input
                  className={`${
                    InputValue.length > 0 ? 'bg-gray-50' : 'bg-white'
                  } w-full h-auto input-line-gray gray-900-400`}
                  type="text"
                  title="particulars"
                  placeholder="수강생 특이사항을 적어주세요"
                  value={studentInfo.particulars}
                  onChange={onInputHandler}
                  maxLength={300}
                />
                <div className="w-full text-right gray-500-normal text-sm font-['Inter']">
                  {studentInfo.particulars.length}/300
                </div>
              </div>
            </div>
          </div>
          {/* 클래스 등록 */}
          <div className="flex flex-col gap-10 w-[640px] px-6 py-8 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl">클래스 목록</div>
            <div className="w-full flex flex-col gap-4">
              <Button color="outline" fullSized onClick={open}>
                <PlusIcon className="mr-2" />
                일정 추가
              </Button>
              {/* 기간반 추가 */}
              {durationSchedule.length !== 0 &&
                durationSchedule.map((data, i) => {
                  const classId = data.classId
                  return (
                    <AddDurationLessonCheck
                      key={i}
                      className={data.className}
                      paymentStatus={data.paymentStatus}
                      schedules={data.schedules}
                      onDelete={() => {
                        onDeleteDurationSchedules(classId)
                      }}
                    />
                  )
                })}
              {/* 회차반 추가 */}
              {sessionSchedule.map((data, i) => {
                return (
                  <AddSessionLessonCheck
                    key={i}
                    className={data.name}
                    sessionDate={data.sessionDate}
                    startTime={data.startTime}
                    endTime={data.endTime}
                    roomName={data.roomName}
                    restOfSessions={data.restOfSessions}
                    totalSessions={data.totalSessions}
                    onDelete={() => {
                      setSessionSchedule([...sessionSchedule.filter((data, index) => index !== i)])
                    }}
                  />
                )
              })}
            </div>
          </div>
          {/* 등록 버튼 */}
          <button type="submit" className="w-full py-3.5 btn-purple-lg">
            <div className="text-white text-base font-semibold">등록하기</div>
          </button>
        </form>
      </div>
      <Modal size="md" show={Schedule} onClose={close}>
        <Modal.Header>클래스 추가</Modal.Header>
        <Modal.Body>
          <StudentAddClassModal onClose={close} />
        </Modal.Body>
      </Modal>
    </div>
  )
}
