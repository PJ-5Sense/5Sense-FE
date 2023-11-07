"use client"
import { useSearchParams } from 'next/navigation';
import dropDown from '../../../assets/icons/dropDown.svg';
import upIcon from '../../../assets/icons/upIcon.svg';
import Image from 'next/image';
import ClassFilter from '@/components/classFilter/classFilter';

export default function ClassPage() {
  const data = [
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    },
    {
      title: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      instructor: '김솔지',
      userCnt: 50
    }
  ]


  return (
    <>
    <ClassFilter />
    <section className="container w-full grid grid-cols-3 gap-[6px]">
      {data.map(({ title, instructor, userCnt }) => (
        <div className=" w-[464px] h-56 px-6 py-8 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-16 inline-flex">
          <div className=" self-stretch text-gray-900 text-xl font-semibold font-['Pretendard'] leading-[30px]">
            {title}
          </div>
          <div className="Frame814119 self-stretch justify-between items-end inline-flex">
            <div className=" text-gray-500 text-base font-medium font-['Pretendard'] leading-normal">
              담당 강사 : {instructor}
            </div>
            <div className="3040 text-center text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px]">
              회원 수 : {userCnt}
            </div>
          </div>
        </div>
      ))}
    </section>
    </>
  )
}
