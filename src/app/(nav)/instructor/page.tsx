'use client'
import plusCircle from '@/assets/icons/plus-circle.svg'
import searchIcon from '@/assets/icons/search.svg'
import closeIcon from '@/assets/icons/close.svg'
import searchIconWhite from '@/assets/icons/search_white.svg'
import chevronRight from '@/assets/icons/chevron_right_pri_600.svg'
import NoneResult from '@/components/common/NoneResult'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { instructorRegisterModal } from '@/state/modal'
import { useGetData } from '@/hooks/useGetData'
import { useRef } from 'react'
import { postVarType, getDataType } from '../student/page'

export default function InstructorPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  let target: HTMLElement | null = document.getElementById('test')
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrollCount, setScrollCount] = useState(0)
  const [instructorData, setInstructorData] = useState<any>([])

  const [modalValue, setModalValue] = useRecoilState(instructorRegisterModal)

  const [inputValue, setInputValue] = useState<any>('')
  const [postVar, setPostVar] = useState<postVarType>({
    page: 1,
    hasNextPage: false
  })
  const handleObserver = (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      setScrollCount(prev => prev + 1)
    }
  }

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const observer = new IntersectionObserver(handleObserver, options)
  postVar.hasNextPage && target && observer.observe(target)

  useEffect(() => {
    if (scrollCount !== 0 && postVar.hasNextPage) {
      setLoading(true)
      setTimeout(() => {
        getInstructorListToScroll()
        setLoading(false)
      }, 500)
    }
  }, [scrollCount])

  const getInstructorListToScroll = async () => {
    if (inputValue !== '') {
      const searchBy = inputRef.current?.name as string
      const res = await useGetData(
        'teachers',
        postVar.page + 1,
        searchBy,
        inputValue
      )
      setInstructorData((preInstructorData: getDataType[]) => [
        ...preInstructorData,
        ...res.data
      ])
      setPostVar(prePostVar => res.meta)
    } else {
      const res = await useGetData('teachers', postVar.page + 1)
      setInstructorData((preInstructorData: getDataType[]) => [
        ...preInstructorData,
        ...res.data
      ])
      setPostVar(prePostVar => res.meta)
    }
  }

  useEffect(() => {
    if (!modalValue) {
      useGetData('teachers', 1).then(res => {
        setInstructorData((preInstructorData: getDataType[]) => [...res.data])
        setPostVar(prePostVar => res.meta)
        setRefresh(true)
      })
    }
  }, [modalValue])

  const onChangeInput = (event: any) => {
    setInputValue(event.target.value)
  }

  const searchClick = async () => {
    const searchBy = inputRef.current?.name as string
    const res = await useGetData('teachers', 1, searchBy, inputValue)
    setInstructorData((preInstructorData: getDataType[]) => [...res.data])
    setPostVar(prePostVar => res.meta)
    console.log(res)
  }
  const onClickInputRefresh = async () => {
    setInputValue('')
    const res = await useGetData('teachers', 1)
    setInstructorData((preInstructorData: getDataType[]) => [...res.data])
    setPostVar(prePostVar => res.meta)
    setRefresh(true)
  }

  const modalClick = () => {
    setModalValue(true)
  }

  const checkInputType = () => {
    const checkList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (inputValue !== '' && checkList.includes(inputValue[0])) {
      return false
    } else {
      return true
    }
  }

  const allowOnlyNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let regex = /^[a-zA-Z]+$/
    const forbiddenKeys = ['-', 'e', 'ArrowUp', 'ArrowDown']
    const checkList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (
      forbiddenKeys.includes(e.key) ||
      e.currentTarget.value.length > 12 ||
      (e.currentTarget.value.length === 12 && e.key !== 'Backspace')
    ) {
      e.preventDefault()
    }
    if (regex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
      alert('이름과 전화번호를 동시에 검색할 수 없습니다. 각각 입력해주세요.')
    }
    if (e.key == 'Enter') {
      searchClick()
    }
  }

  const preventInputDifferentType = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const checkList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (inputValue !== '' && checkList.includes(e.key)) {
      e.preventDefault()
      alert('이름과 전화번호를 동시에 검색할 수 없습니다. 각각 입력해주세요.')
    }
    if (e.key == 'Enter') {
      searchClick()
    }
  }

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6 pb-16">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full text-black text-3xl font-bold font-['Pretendard'] leading-[30px]">
            강사 관리
          </div>
        </div>
        <div
          className="flex gap-2 items-center w-[132px] h-[41px] rounded-lg px-5 py-2.5 btn-purple"
          onClick={modalClick}
        >
          <Image src={plusCircle} width={20} height={20} alt=" " />
          <div className="h-[21px] w-16 text-white text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] cursor-pointer">
            강사 등록
          </div>
        </div>
      </div>
      {/* 검색창 */}
      <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
        <div className="lg:w-[325px] lg:gap-2.5 w-[280px] flex gap-2 px-4 lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
          <Image src={searchIcon} width={16} height={16} alt=" " />
          <input
            ref={inputRef}
            className="w-[245px] border-none focus:ring-0"
            placeholder="Search"
            name={checkInputType() ? 'name' : 'phone'}
            type={checkInputType() ? 'text' : 'number'}
            value={inputValue}
            onChange={onChangeInput}
            onKeyDown={
              checkInputType() ? preventInputDifferentType : allowOnlyNum
            }
          />
          <Image
            className="cursor-pointer"
            src={closeIcon}
            width={12}
            height={12}
            alt=" "
            onClick={onClickInputRefresh}
          />
        </div>
        <div className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer">
          <Image src={searchIconWhite} width={20} height={20} alt=" " />
        </div>
      </div>
      {/* 강사 목록 시작 */}
      {instructorData.length === 0 && refresh ? <NoneResult /> : null}
      {/* 겅색 결과 없음 */}
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {instructorData?.map(
          (data: { name: string; phone: string }, i: number) => {
            return (
              <div
                key={i}
                className="w-full h-[240px] flex flex-col justify-between px-6 pt-8 pb-6 border border-gray-200 rounded-3xl shadow-[0px_5px_15px_0px_rgba(0, 0, 0, 0.02)]"
              >
                <div className="w-full flex flex-col gap-2">
                  <div className="w-[307px] text-gray-900 text-2xl font-semibold font-['Pretendard'] leading-9">
                    {data.name}
                  </div>
                  <div className="w-[307px] text-gray-500 text-base font-medium font-['Pretendard'] leading-normal">
                    {data.phone}
                  </div>
                </div>
                <div className="w-full px-5 py-2.5 flex gap-2 justify-center border border-primary-600 rounded-lg">
                  <div className="text-indigo-500 text-sm font-semibold font-['Pretendard'] leading-[21px]">
                    강사 정보
                  </div>
                  <Image src={chevronRight} width={20} height={20} alt="" />
                </div>
              </div>
            )
          }
        )}
      </div>
      {!loading && !modalValue ? <div id="test"></div> : null}
      {loading ? (
        <div className="w-full h-[70px] pt-[50px] flex justify-center items-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
