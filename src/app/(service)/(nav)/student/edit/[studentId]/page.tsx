'use client'
import { useRouter, useParams } from 'next/navigation'
import { SetStateAction, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Modal, Button } from 'flowbite-react'

import useInputNum from '@/hooks/useInputNum'
import instance from '@/lib/api/axios'
import UseModal from '@/hooks/useModal'
import StudentAddClassModal from '@/components/modal/StudentAddClassModal'
import StudentsSession from '@/components/studentsDetail/card/studentsSession'
import StudentsDuration from '@/components/studentsDetail/card/studentsDuartion'
import { sessionScheduleState } from '@/lib/state/studentSessionSchedule'
import { studentDurationScheduleState } from '@/lib/state/studentDurationSchedule'
import { AddSessionLessonCheck } from '@/components/student/addSessionLessonCheck'
import AddDurationLessonCheck from '@/components/student/addDurationLessonCheck'
import ContentHeader from '@/components/common/ContentHeader'
import { sessionLessonsType, durationLessonsType } from '@/components/studentsDetail/studentsDetail'
import { DayCalendarDateState } from '@/lib/state/calendar/DayCalendarDateState'

import PlusIcon from '@/icons/icon/plus.svg'

interface studentInfo {
  id: number
  name: string
  phone: string
  particulars: string
  durationLessons: durationLessonsType[]
  sessionLessons: sessionLessonsType[]
}

export interface InputNumProps {
  name: string
  submitData: any
  setSubmitData: React.Dispatch<SetStateAction<any>>
}

export default function StudentEdit({ params }: { params: { studentId: string } }) {
  const studentId = params.studentId
  const router = useRouter()
  const durationSchedule = useRecoilValue(studentDurationScheduleState)
  const sessionSchedule = useRecoilValue(sessionScheduleState)
  const setDurationSchedule = useSetRecoilState(studentDurationScheduleState)
  const setSessionSchedule = useSetRecoilState(sessionScheduleState)
  const setDayCalenderState = useSetRecoilState(DayCalendarDateState)

  const [Schedule, close, open] = UseModal()

  const [studentInfo, setStudentInfo] = useState<studentInfo>({
    id: 0,
    name: '',
    phone: '',
    particulars: '',
    durationLessons: [],
    sessionLessons: []
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

  const reservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sessionSchedule.length !== 0) {
      if (
        studentInfo.sessionLessons.filter((data: any, i: number) => data.id === sessionSchedule[0].lessonId).length ===
        0
      ) {
        const sessionDate = {
          year: Number(sessionSchedule[0].sessionDate.split('.')[0]),
          month: Number(sessionSchedule[0].sessionDate.split('.')[1]) - 1,
          date: Number(sessionSchedule[0].sessionDate.split('.')[2])
        }
        /* 수강생 정보 수정에서 새로운 회차반 클래스 추가하고 일정추가를 하는 경우 */
        instance
          .post('/api/session-lesson-registrations', {
            studentId: studentInfo.id,
            lessonId: sessionSchedule[0].lessonId,
            paymentStatus: sessionSchedule[0].paymentStatus
          })
          .then(res => {
            instance
              .post('/api/session-lesson-schedules', {
                lessonId: sessionSchedule[0].lessonId,
                studentId: studentInfo.id,
                sessionDate: new Date(sessionDate.year, sessionDate.month, sessionDate.date).toISOString(),
                startTime: sessionSchedule[0].startTime,
                endTime: sessionSchedule[0].endTime,
                roomId: sessionSchedule[0].roomId
              })
              .then(res => {
                router.push('/student')
              })
          })
      } else {
        /* 이미 추가된 회차반에 대해 일정 추가를 하는 경우 */
        const sessionDate = {
          year: Number(sessionSchedule[0].sessionDate.split('.')[0]),
          month: Number(sessionSchedule[0].sessionDate.split('.')[1]) - 1,
          date: Number(sessionSchedule[0].sessionDate.split('.')[2])
        }
        instance
          .post('/api/session-lesson-schedules', {
            lessonId: sessionSchedule[0].lessonId,
            studentId: studentInfo.id,
            sessionDate: new Date(sessionDate.year, sessionDate.month, sessionDate.date).toISOString(),
            startTime: sessionSchedule[0].startTime,
            endTime: sessionSchedule[0].endTime,
            roomId: sessionSchedule[0].roomId
          })
          .then(res => {
            router.push('/api/student')
          })
      }
    } else if (durationSchedule.length !== 0) {
      instance
        .post('/api/duration-lesson-registrations', {
          studentId: studentInfo.id,
          lessonId: durationSchedule[0].classId,
          paymentStatus: durationSchedule[0].paymentStatus
        })
        .then(res => {
          router.push('/student')
        })
    } else if (sessionSchedule.length === 0 && durationSchedule.length === 0) {
      /* 단순 수강생 정보 수정 */
      instance
        .put(`/api/students/${studentInfo.id}`, {
          name: studentInfo.name,
          phone: studentInfo.phone,
          particulars: studentInfo.particulars
        })
        .then(res => {
          router.push('/student')
          console.log(res)
        })
    }
  }

  const onDeleteDurationSchedules = (classId: number) => {
    const formatedDurationSchedules = durationSchedule.filter(
      (data: { classId: number }, i) => data.classId !== classId
    )
    setDurationSchedule(formatedDurationSchedules)
  }

  useEffect(() => {
    //const studentId = localStorage.getItem('studentId')
    setStudentInfo(prev => ({
      ...prev,
      id: Number(studentId)
    }))
    instance(`/api/students/${studentId}`).then(res => {
      const studentData = res.data.data
      setStudentInfo(prev => ({
        ...prev,
        name: studentData.name,
        phone: studentData.phone,
        particulars: studentData.particulars,
        durationLessons: studentData.durationLessons,
        sessionLessons: studentData.sessionLessons
      }))
    })

    return () => {
      setSessionSchedule([])
      setDurationSchedule([])
      const currentDate = new Date()
      setDayCalenderState({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate()
      })
      localStorage.removeItem('studentId')
    }
  }, [])

  return (
    <div className="w-full flex flex-col items-center pb-[60px]">
      <ContentHeader title="수강생 정보수정" back onClick={() => router.push('/student')} />
      <div className="w-[640px] ">
        <form className="flex flex-col gap-5 pb-[60px]" onSubmit={e => reservation(e)}>
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
                  onWheel={e => e.currentTarget.blur()}
                  maxLength={12}
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
              {/* 현재 페이지에서 추가하는 기간반 클래스 */}
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
              {/* 기존에 수강중인 기간반 */}
              {studentInfo.durationLessons.length !== 0 &&
                studentInfo.durationLessons.map((data, i) => {
                  return (
                    <StudentsDuration
                      key={i}
                      className={data.name}
                      paymentStatus={data.paymentStatus}
                      type="check"
                      schedules={data.schedules[0]}
                    />
                  )
                })}
              {/* 기존에 수강중인 회차반 */}
              {studentInfo.sessionLessons.length !== 0 &&
                studentInfo.sessionLessons.map((data, i) => {
                  /* 잔여회차 정확히 하기위해 새로 추가한 회차반에 기존에 있는 회차반에 포함되는지 체크 */
                  const checkAddSameClass: boolean =
                    sessionSchedule.filter((sessionLesson, i) => sessionLesson.lessonId === data.id).length !== 0
                      ? true
                      : false
                  const className = data.name
                  const paymentStatus = data.paymentStatus
                  const totalLessons = data.schedules[0].restOfSessions + data.schedules.length
                  return (
                    <>
                      {data.schedules.map((schedule, i) => {
                        return (
                          <StudentsSession
                            key={i}
                            className={className}
                            paymentStatus={paymentStatus}
                            type="check"
                            restOfSessions={checkAddSameClass ? schedule.restOfSessions - 1 : schedule.restOfSessions}
                            totalLessons={totalLessons}
                            schedules={schedule}
                          />
                        )
                      })}
                    </>
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
