'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

import SearchInput from '@/components/common/SearchInput'
import { metaType } from '../student/page'
import instance from '@/lib/api/axios'
import { changePhoneNumberToString } from '@/utils'

import NotFoundPage from '@/components/common/NotFoundPage'
import Loading from '@/components/common/Loading'
import ChevronDownIcon from 'public/assets/icons/chevron/chevron-down-blue.svg'
import ChevronUpIcon from 'public/assets/icons/chevron/chevron-up-blue.svg'
import ToggleOnIcon from 'public/assets/icons/toggle_on.svg'
import ToggleOffIcon from 'public/assets/icons/toggle_off.svg'
import ContentHeader from '@/components/common/ContentHeader'
import RadioIcon from '@/icons/icon/radio.svg'

export interface PaymentType {
  id: number
  type: string
  paymentStatus: string
  name: string
  tuitionFee: number
  studentName: string
  studentPhone: string
}

export default function PayPage() {
  const target = useRef<HTMLDivElement>(null)

  const [studentList, setStudentList] = useState<PaymentType[]>([])
  const [metaData, setMetaData] = useState<metaType>({
    page: 1,
    hasNextPage: false
  })
  const [inputData, setInputData] = useState<{ value: string; searchBy: string }>({
    value: '',
    searchBy: 'none'
  })
  const [isClickedDropdown, setIsClickedDropdown] = useState<boolean>(false)
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState<string>('All')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRefresh, setIsRefresh] = useState<boolean>(false)

  const getInputDataFromChild = (data: { value: string; searchBy: string; list: PaymentType[]; meta: metaType }) => {
    setInputData(prev => ({
      ...prev,
      value: data.value,
      searchBy: data.searchBy
    }))

    setStudentList(data.list)
    setMetaData(prev => ({
      ...prev,
      page: data.meta.page,
      hasNextPage: data.meta.hasNextPage
    }))
  }

  const infiniteScroll = useCallback(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const getData = () => {
      if (inputData.value === '') {
        instance(`/api/billing-payments?searchBy=none&page=${metaData.page + 1}&PaymentStatus=All`).then(res => {
          const studentsData = res.data.data.billingPayments
          const meta = res.data.data.meta
          setStudentList(prev => [...prev, ...studentsData])
          setMetaData(prev => ({
            ...prev,
            page: meta.page,
            hasNextPage: meta.hasNextPage
          }))
          setIsLoading(false)
        })
      } else {
        instance(
          `/api/billing-payments?searchBy=${inputData.searchBy}&${inputData.searchBy}=${inputData.value}&page=${
            metaData.page + 1
          }&PaymentStatus=${currentPaymentStatus}`
        ).then(res => {
          const studentsData = res.data.data.billingPayments
          const meta = res.data.data.meta
          setStudentList(prev => [...prev, ...studentsData])
          setMetaData(prev => ({
            ...prev,
            page: meta.page,
            hasNextPage: meta.hasNextPage
          }))
          setIsLoading(false)
        })
      }
    }

    const callback = (entry: any) => {
      if (entry[0].isIntersecting) {
        setIsLoading(true)
        setTimeout(() => {
          getData()
        }, 500)
      }
    }
    const observer = new IntersectionObserver(callback, options)
    if (target.current) {
      observer.observe(target.current)
    }
  }, [metaData])

  useEffect(() => {
    let requestUrl =
      inputData.value === ''
        ? `/api/billing-payments?page=1&take=10&searchBy=none&PaymentStatus=${currentPaymentStatus}`
        : `/api/billing-payments?page=1&take=10&searchBy=${inputData.searchBy}&${inputData.searchBy}=${inputData.value}&PaymentStatus=${currentPaymentStatus}`
    instance(requestUrl).then(res => {
      const studentsData = res.data.data.billingPayments
      const meta = res.data.data.meta
      setStudentList(studentsData)
      setMetaData(prev => ({
        ...prev,
        page: meta.page,
        hasNextPage: meta.hasNextPage
      }))
      setIsRefresh(true)
    })
  }, [currentPaymentStatus])

  useEffect(() => {
    if (metaData.hasNextPage) {
      infiniteScroll()
    }
  }, [metaData])

  return (
    <div>
      <ContentHeader title="청구/납무" />
      <div className="relative w-full flex justify-between">
        <button
          className={`group ${currentPaymentStatus === 'Unpaid' ? 'w-[87px]' : 'w-[100px]'}  h-[37px] flex items-center gap-2 px-3 py-2 rounded-lg border filter-btn`}
          onClick={() => {
            setIsClickedDropdown(prev => !prev)
          }}
        >
          <div className={`primary-600-semibold group-hover:text-white group-focus:text-white text-sm`}>
            {currentPaymentStatus === 'All' ? '결제상태' : currentPaymentStatus === 'Paid' ? '결제완료' : '미결제'}
          </div>
          <div className="h-[21px] py-[2.5px]">
            {isClickedDropdown ? <ChevronUpIcon width={16} height={16} /> : <ChevronDownIcon width={16} height={16} />}
          </div>
        </button>
        {isClickedDropdown && (
          <div className="absolute top-[45px] left-0 w-[195px] flex flex-col p-4 border rounded-lg border-gray-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] bg-white">
            <div id="classTypeFilter" className="w-[130px] h-[54] flex flex-col gap-3 ">
              <p className="flex gap-2 items-center">
                {currentPaymentStatus === 'Paid' ? (
                  <RadioIcon />
                ) : (
                  <input
                    className="cursor-pointer focus:ring-offset-0 focus:ring-0"
                    type="radio"
                    id="paid"
                    value="결제완료"
                    checked={currentPaymentStatus === 'Paid' && true}
                    onChange={() => {
                      setCurrentPaymentStatus('Paid')
                      setIsClickedDropdown(false)
                    }}
                  />
                )}
                <label
                  htmlFor="paid"
                  className="gray-900-semibold text-sm cursor-pointer"
                  onClick={() => {
                    setCurrentPaymentStatus('Paid')
                    setIsClickedDropdown(false)
                  }}
                >
                  결제완료
                </label>
              </p>
              <p className="flex gap-2 items-center cursor-pointer">
                {currentPaymentStatus === 'Unpaid' ? (
                  <RadioIcon />
                ) : (
                  <input
                    className="cursor-pointer focus:ring-offset-0 focus:ring-0"
                    type="radio"
                    id="unpaid"
                    value="미결제"
                    checked={currentPaymentStatus === 'Unpaid' && true}
                    onChange={() => {
                      setCurrentPaymentStatus('Unpaid')
                      setIsClickedDropdown(false)
                    }}
                  />
                )}
                <label
                  htmlFor="unpaid"
                  className="gray-900-semibold text-sm cursor-pointer"
                  onClick={() => {
                    setCurrentPaymentStatus('Unpaid')
                    setIsClickedDropdown(false)
                  }}
                >
                  미결제
                </label>
              </p>
            </div>
          </div>
        )}
        <SearchInput type="payment" paymentStatus={currentPaymentStatus} passInputData={getInputDataFromChild} />
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full h-[46px] lg:px-7 px-6 py-4 flex items-center lg:gap-8 gap-5 rounded bg-[#F0EFFF]">
          <div className="lg:w-[100px] w-[70px] indigo-500-semibold text-sm">이름</div>
          <div className="lg:w-[160px] w-[110px] indigo-500-semibold text-sm">전화번호</div>
          <div className="flex-grow min-w-[100px] indigo-500-semibold text-sm">수강중인 클래스</div>
          <div className="lg:w-[140px] w-[110px] indigo-500-semibold text-sm">총 수강료</div>
          <div className={`lg:w-[220px] w-[148px] indigo-500-semibold text-sm`}>결제상태</div>
        </div>
        <div className="w-full flex flex-col gap-[14px]">
          {isRefresh && studentList.length === 0 ? (
            <div className="w-full mt-[140px]">
              <NotFoundPage title="검색결과가 없습니다." subTitle="다른 검색어를 통해 검색을 이어나가보세요" />
            </div>
          ) : null}
          {studentList?.map((data: any, i) => {
            return (
              <button
                key={i}
                className="w-full flex lg:gap-8 gap-5 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)]"
              >
                <div className=" lg:w-[100px] w-[70px] gray-800-semibold lg:text-[16px] text-[14px] text-left">
                  {data.student.name}
                </div>
                <div className="lg:w-[160px] w-[110px] gray-800-semibold lg:text-[16px] text-[14px] text-left">
                  {changePhoneNumberToString(data.student.phone)}
                </div>
                <div className="flex-1 gray-900-normal lg:text-[16px] text-[14px] text-left">{data.lesson.name}</div>
                <div className="lg:w-[140px] w-[110px] grsy-900-normal lg:text-[16px] text-[14px] text-left">
                  {data.lesson.tuitionFee} 원
                </div>
                <div className={`lg:w-[220px] w-[148px] gray-900-normal text-base text-left`}>
                  <div className="w-full flex items-center xl:gap-2.5 gap-2">
                    <div className="text-gray-700 lg:text-[16px] text-[14px] font-medium">미결제</div>
                    {data.paymentStatus === 'Paid' ? (
                      <ToggleOnIcon
                        onClick={() => {
                          if (confirm('결제상태를 변경하시겠습니까?')) {
                            instance
                              .patch(`/api/billing-payments/${data.id}`, {
                                paymentStatus: 'Unpaid'
                              })
                              .then(res => {
                                instance(
                                  `/api/billing-payments?page=1&take=10&searchBy=none&PaymentStatus=${currentPaymentStatus}`
                                ).then(res => {
                                  const studentsData = res.data.data.billingPayments
                                  const meta = res.data.data.meta
                                  setStudentList(studentsData)
                                  setMetaData(prev => ({
                                    ...prev,
                                    page: meta.page,
                                    hasNextPage: meta.hasNextPage
                                  }))
                                })
                              })
                          } else {
                            return
                          }
                        }}
                      />
                    ) : (
                      <ToggleOffIcon
                        onClick={() => {
                          if (confirm('결제상태를 변경하시겠습니까?')) {
                            instance
                              .patch(`/api/billing-payments/${data.id}`, {
                                paymentStatus: 'Paid'
                              })
                              .then(res => {
                                instance(
                                  `/api/billing-payments?page=1&take=10&searchBy=none&PaymentStatus=${currentPaymentStatus}`
                                ).then(res => {
                                  const studentsData = res.data.data.billingPayments
                                  const meta = res.data.data.meta
                                  setStudentList(studentsData)
                                  setMetaData(prev => ({
                                    ...prev,
                                    page: meta.page,
                                    hasNextPage: meta.hasNextPage
                                  }))
                                })
                              })
                          } else {
                            return
                          }
                        }}
                      />
                    )}
                    <div className="text-gray-700 lg:text-[16px] text-[14px] font-medium">결제완료</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      {!isLoading && <div ref={target}></div>}
      {isLoading && <Loading />}
    </div>
  )
}
