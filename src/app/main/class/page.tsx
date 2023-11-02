"use client"
import { useSearchParams } from 'next/navigation';
import dropDown from '../../../assets/icons/dropDown.svg';
import upIcon from '../../../assets/icons/upIcon.svg';
import Image from 'next/image';
import { useState } from 'react';

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

  let [clickClassFilter, setClickClassFilter] = useState<boolean>(false);

  return (
    <>
    <section className="absolute top-[120px] flex w-[343px] h-[37px] gap-2">
    <div className='flex flex-col w-[125px] gap-2'>
      {!clickClassFilter ? 
      <>
      <button className="flex gap-2 justify-center items-center px-3 py-2 border rounded-lg border-[#7354E8]" onClick={() => {
        setClickClassFilter(prev => !prev);
      }}>
      <span className="text-[#7354E8] text-[14px] font-semibold">클래스 유형</span>
      <Image src={dropDown} width={16} height={17} alt=''/>
      </button>
      </> : 
      <>
      <button className="flex gap-2 justify-center items-center px-2 py-2 border-[3px] rounded-lg border-[#D3C4F9] bg-[#563AC0]" onClick={() => {
        setClickClassFilter(prev => !prev);
      }}>
      <span className="text-[#FFF] text-[14px] font-semibold">클래스 유형</span>
      <Image src={upIcon} width={16} height={17} alt=''/>
      </button>
      <div className='flex w-[195px] p-4 rounded-lg border border-[#D1D5DB] bg-[#FFF]'>
        <div className='w-[100%] flex flex-col gap-3'>
        <div className='flex'>
          <input type='radio' id='time_class' value="time_class" />
          <label htmlFor='time_class'>회차반</label>
        </div>
        <div className='flex'>
          <input type='radio' id="preiod_class" value='preiod_class'/>
          <label htmlFor='preo[iod_class'>기간반</label>
        </div>
        </div>
      </div>
      </>}
    </div>
    <button className="flex w-auto justify-center items-center px-3 py-2 border rounded-lg border-[#7354E8] bg-[#FFF]">
    <span className="text-[#7354E8] text-[14px] font-semibold">강사명</span>
    <Image src={dropDown} width={16} height={17} alt=''/>
    </button>
    <button className="flex w-auto justify-center items-center px-3 py-2 border rounded-lg border-[#7354E8] bg-[#FFF]">
    <span className="text-[#7354E8] text-[14px] font-semibold">카테고리</span>
    <Image src={dropDown} width={16} height={17} alt=''/>
    </button>
    </section>
    
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
