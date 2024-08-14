'use client'
import Image from 'next/image'
import { useRecoilState, useRecoilValue } from 'recoil'

import { modalState } from '@/lib/state/modal'
import close_Circle_bg from 'public/assets/icons/close_circle_bg_pri_600.svg'

import DetailInstructor from './DetailInstructor'

export type SideProps = {
  id?: string
  type?: string
}

export default function SideModal({ id, type }: SideProps) {
  const [Modal, setModal] = useRecoilState(modalState)

  /* const handleModal = () => {
    setModal(prevModal => ({
      ...prevModal,
      active: false
    }))
  } */

  const render = () => {
    /* if (type === 'student') {
      return <DetailStudent id={id} />
    }
    if (type === 'instructorDetail') {
      return <DetailInstructor id={id} />
    } */
  }
  return {
    /* <div className="relative top-0 left-0 w-[480px] h-full bg-white rounded-tr-[32px] shadow p-6 flex flex-col items-end">
      <Image src={close_Circle_bg} alt="버튼" className="cursor-pointer" onClick={handleModal} />
      {render()}
    </div> */
  }
}
