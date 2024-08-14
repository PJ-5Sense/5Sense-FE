'use client'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import IncomeStatistics from './IncomeStatistics'
import StudentStatistics from './StudentStatistics'

export type IncomeStatisticsType = {
  rounded: string
  title: string
  income: string
  statistics: { bg_color: string; percentage: string; className: string }[]
}

export default function MainBox() {
  const { width, height } = useWindowSize()
  const incomeData: IncomeStatisticsType[] = [
    {
      rounded: 'rounded-l-xl',
      title: '지난달 수입',
      income: '1,252,181,153원',
      statistics: [
        {
          bg_color: 'bg-[#9B81FE]',
          percentage: '40%',
          className: '소도구 필라테스'
        },
        {
          bg_color: 'bg-[#D3C4F9]',
          percentage: '40%',
          className: '플라잉 요가'
        },
        {
          bg_color: 'bg-[#E5E7EB]',
          percentage: '15%',
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      rounded: 'rounded-r-xl',
      title: '이번달 수입',
      income: '1,252,181,153원',
      statistics: [
        {
          bg_color: 'bg-[#9B81FE]',
          percentage: '40%',
          className: '소도구 필라테스'
        },
        {
          bg_color: 'bg-[#D3C4F9]',
          percentage: '40%',
          className: '플라잉 요가'
        },
        {
          bg_color: 'bg-[#E5E7EB]',
          percentage: '15%',
          className: '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    }
  ]

  const studentNum = [
    {
      bg_color: 'bg-[#563AC0]',
      percentage: '30%',
      className: '요가'
    },
    {
      bg_color: 'bg-[#7354E8]',
      percentage: '20%',
      className: '필라테스'
    },
    {
      bg_color: 'bg-[#9B81FE]',
      percentage: '15%',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
    },
    {
      bg_color: 'bg-[#D3C4F9]',
      percentage: '10%',
      className: '기타'
    },
    {
      bg_color: 'bg-[#E5E7EB]',
      percentage: '10%',
      className: '미수강'
    }
  ]

  return (
    <div
      className={`w-full items-start ${width > 1180 ? 'flex' : ' flex flex-col'} ${width > 1180 ? 'gap-6' : 'gap-4'}`}
    >
      <div className="w-full h-[247px] flex outline outline-1 rounded-xl outline-gray-200 ">
        {incomeData.map((data, i) => {
          return (
            <div
              key={i}
              className={`w-1/2 p-6 flex flex-col gap-5 outline outline-1 ${data.rounded} outline-gray-200 h-full`}
            >
              <div className="w-full flex flex-col items-start gap-2">
                <span className="text-gray-600 text-base font-semibold">{data.title}</span>
                <span className="h-[33px] text-black text-[28px] font-bold leading-[33px]">{data.income}</span>
              </div>
              <div className="w-full flex items-end gap-6 ">
                <div className="flex w-full flex-col gap-[6px]">
                  {data.statistics.map((data, i) => {
                    return (
                      <div key={i} className="w-full flex gap-1 items-center">
                        <span className={`w-3 h-[9px] rounded-[3px] ${data.bg_color}`}></span>
                        <span className="w-8 h-[18px] text-gray-800 text-xs font-bold leading-[18px]">
                          {data.percentage}
                        </span>
                        <span className="text-gray-400 flex-1 w-1 min-w-8 truncate h-[18px] text-xs font-medium leading-[18px]">
                          {data.className}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="w-[110px] h-[110px]">
                  <IncomeStatistics props={incomeData} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div
        className={`h-[247px] w-full flex flex-col gap-5 p-6  ${
          width > 1180 ? '2xl:max-w-[416px] xl:max-w-[296px] lg:max-w-[300px]' : 'w-full'
        } outline outline-1 rounded-xl outline-gray-200`}
      >
        <div className="w-full flex flex-col gap-2 ">
          <span className="text-gray-600 text-base font-semibold">전체 등록 학생 수</span>
          <span className="w-full h-[33px] text-black text-[28px] font-bold leading-[33px]">513명</span>
        </div>
        <div className="w-full h-[114px] flex items-end gap-6">
          <div className="flex w-full flex-col gap-[6px]">
            {studentNum.map((data, i) => {
              return (
                <div key={i} className="flex w-full h-[18px] gap-1 items-center">
                  <span className={`w-3 min-w-3 h-[9px] rounded-[3px] ${data.bg_color}`}></span>
                  <div className="w-8 h-[18px] text-gray-800 text-xs font-bold leading-[18px]">40%</div>
                  <div className="text-gray-400 h-[18px] max-w-[182px] flex-1 w-1 truncate text-xs font-medium leading-[18px]">
                    {data.className}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-[110px] h-[110px]">
            <StudentStatistics />
          </div>
        </div>
      </div>
    </div>
  )
}
