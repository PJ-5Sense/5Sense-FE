'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import NoneResult from '@/components/common/NoneResult'
import { useGetData } from '@/hooks/useGetData'

import searchIconWhite from 'public/assets/icons/search_white.svg'
import closeIcon from 'public/assets/icons/close.svg'
import plusCircle from 'public/assets/icons/plus-circle.svg'
import searchIconGray from 'public/assets/icons/search.svg'

interface studentType {
  id: string
  name: string
  phone: string
  className: string
  particulars: string
}

export interface postVarType {
  page: number
  hasNextPage: boolean
}

export interface getDataType {
  id: string
  name: string
  phone: string
}

export default function StudentPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const target: HTMLElement | null = document.getElementById('test')
  const numberCheckList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const [studentList, setStudentList] = useState<studentType[]>([])
  const [postVar, setPostVar] = useState<postVarType>({
    page: 1,
    hasNextPage: false
  })
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [scrollCount, setScrollCount] = useState(0)
  const [inputValue, setInputValue] = useState<string>('')

  // const [Modal, setModal] = useRecoilState(modalState)
  // const handleModal = (id: string) => {
  //   setModal(prevModal => ({
  //     ...prevModal,
  //     active: true,
  //     id: id,
  //     type: 'student'
  //   }))
  // }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }
  const handleObserver = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      setScrollCount(prev => prev + 1)
    }
  }

  const observer = new IntersectionObserver(handleObserver, options)
  postVar.hasNextPage && target && observer.observe(target)

  const getStudentListToScroll = async () => {
    if (inputValue !== '') {
      const searchBy = inputRef.current?.name

      const res = await useGetData('students', postVar.page + 1, 10, searchBy, inputValue)
      setStudentList((preStudentData: getDataType[]) => [...preStudentData, ...res.data])
      setPostVar((prePostVar: postVarType) => res.meta)
    } else {
      const res = await useGetData('students', postVar.page + 1, 10)
      setStudentList((preStudentData: getDataType[]) => [...preStudentData, ...res.data])
      setPostVar((prePostVar: postVarType) => res.meta)
    }
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleClickSearch = async () => {
    const searchBy = inputRef.current?.name
    const res = await useGetData('students', 1, 10, searchBy, inputValue)
    setStudentList((preStudentData: getDataType[]) => [...res.data])
    setPostVar((prePostVar: postVarType) => res.meta)
  }

  const handleClickInputRefresh = async () => {
    setInputValue('')
    const res = await useGetData('students', 1, 10)
    setStudentList(res.data)
    setPostVar((prePostVar: postVarType) => res.meta)
  }

  const checkInputType = () => {
    if (inputValue !== '' && numberCheckList.includes(inputValue[0])) {
      return false
    } else {
      return true
    }
  }

  const allowOnlyNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let regex = /^[a-zA-Z]+$/
    const forbiddenKeys = ['-', 'e', 'ArrowUp', 'ArrowDown']
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
      handleClickSearch()
    }
  }

  const preventInputDifferentType = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue !== '' && numberCheckList.includes(e.key)) {
      e.preventDefault()
      alert('이름과 전화번호를 동시에 검색할 수 없습니다. 각각 입력해주세요.')
    }
    if (e.key == 'Enter') {
      handleClickSearch()
    }
  }

  useEffect(() => {
    useGetData('students', 1, 10).then(res => {
      setStudentList((preInstructorData: getDataType[]) => [...res.data])
      setPostVar(res.meta)
      setIsRefresh(true)
    })
  }, [])

  useEffect(() => {
    if (scrollCount !== 0 && postVar.hasNextPage) {
      setIsLoading(true)
      setTimeout(() => {
        getStudentListToScroll()
        setIsLoading(false)
      }, 500)
    }
  }, [scrollCount])

  return (
    <div className="w-full 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6 pb-[60px]">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <div className="flex w-full pt-12 mb-[30px] justify-between">
        <div className=" h-[30px]">
          <div className="w-full black-bold text-3xl font-['Pretendard']">수강생 관리</div>
        </div>
        <Link href={'student/register'} className="flex px-5 py-2.5 btn-purple text-sm">
          <Image src={plusCircle} alt="plus" width={20} height={20} className="mr-2" />
          수강생 등록
        </Link>
      </div>
      {/* 검색창 */}
      <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
        <div className="lg:w-[325px] lg:gap-2.5 w-[280px] flex gap-2 px-4 lg:py-3 py-2 rounded-lg outline outline-1 outline-gray-300 focus-within:outline-[#563AC0]">
          <Image src={searchIconGray} width={16} height={16} alt=" " />
          <input
            ref={inputRef}
            className="w-[245px] focus:outline-none"
            placeholder="Search"
            name={checkInputType() ? 'name' : 'phone'}
            type={checkInputType() ? 'text' : 'number'}
            value={inputValue}
            onChange={handleChangeInput}
            onKeyDown={checkInputType() ? preventInputDifferentType : allowOnlyNum}
          />
          <Image
            className="cursor-pointer"
            src={closeIcon}
            width={12}
            height={12}
            alt=" "
            onClick={handleClickInputRefresh}
          />
        </div>
        <div
          className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer"
          onClick={handleClickSearch}
        >
          <Image src={searchIconWhite} width={20} height={20} alt="" />
        </div>
      </div>
      {/* 수강생 목록 시작 */}
      <div className="w-full flex flex-col gap-3">
        {/* 수강생 목록 설명 */}
        <div className="w-full h-[46px] lg:px-7 px-6 py-4 flex lg:gap-6 gap-4 rounded bg-[#F0EFFF]">
          <div className="w-[100px] indigo-500-semibold text-sm font-['Pretendard']">이름</div>
          <div className="lg:w-[160px] w-[130px] indigo-500-semibold text-sm font-['Pretendard']">전화번호</div>
          <div className="xl:flex-1 lg:w-[100px] flex-1 indigo-500-semibold text-sm font-['Pretendard']">클래스명</div>
          <div className="xl:w-[400px] lg:flex-1 w-[200px] indigo-500-semibold text-sm font-['Pretendard']">
            특이사항
          </div>
        </div>
        {/* 수강생 목록 시작 */}
        <div className="w-full flex flex-col gap-[14px]">
          {isRefresh && studentList.length === 0 ? <NoneResult /> : null}
          {/* 검색 결과 없음 */}
          {studentList?.map(({ id, name, className, phone, particulars }) => {
            return (
              <button
                key={id}
                className="w-full flex lg:gap-10 gap-8 lg:p-7 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)] hover:outline-primary-600"
                onClick={() => {
                  //handleModal(data.id)
                }}
              >
                <div className="flex lg:gap-6 gap-4 flex-1">
                  <div className="w-[100px] gray-800-semibold text-sm font-['Pretendard'] text-left">{name}</div>
                  <div className="lg:w-[160px] w-[130px] gray-800-semibold text-sm font-['Pretendard'] text-left">
                    {phone.slice(0, 3)}-{phone.slice(3, 7)}-{phone.slice(7, 11)}
                  </div>
                  <div className="xl:flex-1 lg:w-[100px] flex-1 gray-800-semibold text-sm font-['Pretendard'] text-left">
                    {className}
                  </div>
                  <div className="xl:w-[400px] lg:flex-1 w-[200px] gray-900-normal text-base font-['Pretendard'] text-left">
                    {particulars}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      {isLoading && (
        <div className="w-full h-14 flex justify-center items-center pt-[50px]">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
