'use client'
import plusCircle from '../../../assets/icon/plus-circle.svg'
import search_16 from '../../../assets/icon/search.svg'
import x_icon_12 from '../../../assets/icon/x_icon_12.svg'
import search_20 from '../../../assets/icon/search_20.svg'
import Image from 'next/image'
import { fetchApi } from '@/hooks/useApi'
import { useState, useEffect } from 'react'

export default function StudentPage() {
  const allStudentData = [
    {
      name: '정은담',
      phoneNum: '010-1234-5678',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '조영은',
      phoneNum: '010-2345-6789',
      className: '반야사 요가',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '조성훈',
      phoneNum: '010-3456-7891',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail: '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기'
    },
    {
      name: '윤태식',
      phoneNum: '010-4567-8910',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '엄세리',
      phoneNum: '010-5678-9101',
      className: '기구 필라테스',
      detail: '체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '정은담',
      phoneNum: '010-6789-1011',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '정은담',
      phoneNum: '010-7891-0111',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '조영은',
      phoneNum: '010-8910-1112',
      className: '반야사 요가',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '조성훈',
      phoneNum: '010-9101-1121',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail: '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기'
    },
    {
      name: '윤태식',
      phoneNum: '010-1011-1213',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '엄세리',
      phoneNum: '010-1234-1566',
      className: '기구 필라테스',
      detail: '체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '정은담',
      phoneNum: '010-1688-1591',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '정은담',
      phoneNum: '010-1568-1235',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '조영은',
      phoneNum: '010-1368-1689',
      className: '반야사 요가',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '조성훈',
      phoneNum: '010-1397-1587',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail: '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기'
    },
    {
      name: '윤태식',
      phoneNum: '010-1356-1566',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '엄세리',
      phoneNum: '010-1234-1566',
      className: '기구 필라테스',
      detail: '체형 교정 및 이완을 통한 삶의 균형 찾기'
    },
    {
      name: '정은담',
      phoneNum: '010-1234-1359',
      className: '체형 교정 및 이완을 통한 삶의 균형 찾기',
      detail:
        '체형 교정 및 이완을 통한 삶의 균형 찾기/스트레스로부터 벗어 나기/체형 교정 및 이완을 통한 삶의 균형 찾기'
    }
  ]
  const [studentData, setStudentData] = useState<any>()

  let [searchInput, setSearchInput] = useState<any>('')

  useEffect(() => {
    setStudentData(allStudentData)
    fetchApi('/students?searchBy=none', 'GET')
  }, [])

  function onChangeInput(event: any) {
    setSearchInput(event.target.value)
  }

  function searchClick() {
    console.log(searchInput)
    if (isNaN(searchInput)) {
      let result = allStudentData.filter(data =>
        data.name.includes(searchInput)
      )
      setStudentData(result)
    } else {
      let result = allStudentData.filter(data =>
        data.phoneNum.replaceAll('-', '').includes(searchInput)
      )
      setStudentData(result)
    }

    //console.log(result)
    //setStudentData(result)
  }

  function onClickX() {
    setSearchInput('')
  }

  function preventDashAndPressEnter(event: any) {
    /* dash(-)의 event.which가 189 */
    if (event.which === 189) {
      event.preventDefault()
    }
    if (event.key == 'Enter') {
      searchClick()
    }
    //console.log(event.which)
  }

  function pressEnter() {
    console.log('enter')
  }

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full text-black text-3xl font-bold font-['Pretendard'] leading-[30px]">
            수강생 관리
          </div>
        </div>

        <div className="flex gap-2 items-center w-[132px] h-[41px] rounded-lg px-5 py-2.5 bg-primary-600">
          <Image src={plusCircle} width={20} height={20} alt=" " />
          <div className="h-[21px] w-16 text-white text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] cursor-pointer">
            수강생 등록
          </div>
        </div>
      </div>
      {/* 검색창 */}
      <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
        <div className="lg:w-[325px] lg:gap-2.5 w-[280px] flex gap-2 px-4 lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
          <Image src={search_16} width={16} height={16} alt=" " />
          <input
            className="w-[245px] focus:outline-none"
            placeholder="Search"
            value={searchInput}
            onChange={onChangeInput}
            onKeyDown={preventDashAndPressEnter}
          />
          <Image
            className="cursor-pointer"
            src={x_icon_12}
            width={12}
            height={12}
            alt=" "
            onClick={onClickX}
          />
        </div>

        <div
          className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer"
          onClick={searchClick}
        >
          <Image src={search_20} width={20} height={20} alt=" " />
        </div>
      </div>
      {/* 수강생 목록 시작 */}
      <div className="w-full flex flex-col gap-3 pb-[60px]">
        {/* 수강생 목록 설명 */}
        <div className="w-full h-[46px] lg:px-7 px-6 py-4 flex lg:gap-6 gap-4 rounded bg-[#F0EFFF]">
          <div className="w-[100px] text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[14px]">
            이름
          </div>
          <div className="lg:w-[160px] w-[130px] text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[14px]">
            전화번호
          </div>
          <div className="lg:w-[240px] w-[120px] text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[14px]">
            클래스명
          </div>
          <div className="grow shrink basis-0 text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[14px]">
            특이사항
          </div>
        </div>
        {/* 수강생 목록 시작 */}
        <div className="w-full flex flex-col gap-[14px]">
          {studentData?.map(
            (
              data: {
                name: string
                phoneNum: string
                className: string
                detail: string
              },
              i: number
            ) => {
              return (
                <div
                  key={i}
                  className="w-full flex lg:gap-10 gap-8 lg:p-7 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex lg:gap-6 gap-4 flex-1">
                    <div className="w-[100px] text-gray-800 text-sm font-semibold font-['Pretendard']">
                      {data.name}
                    </div>
                    <div className="lg:w-[160px] w-[130px] text-gray-800 text-sm font-semibold font-['Pretendard']">
                      {data.phoneNum}
                    </div>
                    <div className="lg:w-[240px] w-[120px] text-gray-800 text-sm font-semibold font-['Pretendard']">
                      {data.className}
                    </div>
                    <div className="flex-1 text-gray-900 text-base font-normal font-['Pretendard']">
                      {data.detail}
                    </div>
                  </div>
                  {/* <div className="w-[93px] h-[37px] flex gap-1 px-3 py-2 rounded-lg outline outline-1 outline-primary-600">
                  <div className="w-[49px] text-indigo-500 text-[12px] font-semibold font-['Pretendard'] leading-[21px]">
                    관리하기
                  </div>
                  <Image
                    src={chevron_right_16}
                    width={16}
                    height={16}
                    alt=" "
                  />
                </div> */}
                </div>
              )
            }
          )}
        </div>
      </div>
    </div>
  )
}
