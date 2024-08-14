'use client'
//import { IClassType, ITypeValid } from '@/app/(service)/(nav)/class/edit/session/page'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Duration from './component/Duration'
import Session from './component/Session'

export type scheduleItem = {
  id: number
  content: string
  modal: boolean
}

export interface ITypeProps {
  classType: any
  valid?: any
  setClassType: Dispatch<SetStateAction<any>>
}

export default function ClassType({ classType, setClassType, valid }: ITypeProps) {
  const [tab, setTab] = useState<boolean>(true)

  const onTabHandler = (date: string) => {
    if (date === '기간반') {
      setClassType((prev: any) => ({
        ...prev,
        type: 'duration',
        lessonTime: 30,
        tuitionFee: '',
        totalSessions: '',
        capacity: 1
      }))
      return setTab(true)
    } else {
      setClassType((prev: any) => ({
        ...prev,
        type: 'session',
        lessonTime: 30,
        tuitionFee: '',
        totalSessions: '',
        capacity: 1
      }))
      return setTab(false)
    }
  }

  const activeTab = (content: string, isActive: boolean) => {
    return (
      <button
        className={`w-[290px] h-10 rounded-md flex justify-center items-center text-base leading-normal ${
          isActive ? 'bg-primary-600 text-white font-semibold' : 'text-gray-500 font-medium'
        }`}
        // onClick={() => onTabHandler(content)}
      >
        {content}
      </button>
    )
  }

  useEffect(() => {
    if (classType.type === 'duration') {
      return setTab(true)
    }
    if (classType.type === 'session') {
      return setTab(false)
    }
  }, [classType])

  return (
    <div className={`${valid?.valid ? '' : 'border-[#EF5D5D]'} class-box`}>
      <div className="Title gray-900-bold text-xl">클래스 유형</div>
      <div className="flex w-full h-[52px] p-1.5 rounded-md border border-gray-300 ">
        {activeTab('기간반', tab)}
        {activeTab('회차반', !tab)}
      </div>
      {tab ? (
        <Duration classType={classType} valid={valid} setClassType={setClassType} />
      ) : (
        <Session classType={classType} valid={valid} setClassType={setClassType} />
      )}
    </div>
  )
}
