'use client'
import React, { ReactNode, useState } from 'react'
import AcademyInfo from './layout/AcademyInfo'
import TodaySchedule from './layout/TodaySchedule'

type Props = {
  isModal: boolean
  setIsModal: (modal: boolean) => void
}
const SideModal = ({ isModal, setIsModal }: Props) => {
  return (
    <div className="relative top-0 left-0 w-[480px] h-full bg-white rounded-tr-[32px] shadow">
      <div className="flex flex-col pt-[72px] px-6 box-border gap-[81px]">
        <AcademyInfo color="#1F2A37" btnColor="bg-primary-600" />
        <TodaySchedule />
      </div>
      <button
        className="absolute top-6 right-6"
        onClick={() => setIsModal(!isModal)}
      >
        x
      </button>
      <div className="absolute top-[364px] w-[480px] h-px bg-gray-200" />
    </div>
  )
}

export default SideModal
