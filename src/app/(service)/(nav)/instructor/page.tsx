'use client'
// 모듈
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Button, Modal } from 'flowbite-react'
import { Drawer } from 'flowbite-react'

//내장
import { metaType } from '../student/page'
import instance from '@/lib/api/axios'
import DetailInstructor from '@/components/modal/DetailInstructor'
import SearchInput from '@/components/common/SearchInput'
import NotFoundPage from '@/components/common/NotFoundPage'
import { changePhoneNumberToString } from '@/utils'
import AddInstructor from '@/components/modal/AddInstructor'

//이미지
import ChevronRightIcon from 'public/assets/icons/chevron/chevron_right_pri_600.svg'
import ContentHeader from '@/components/common/ContentHeader'

interface instructorType {
  id: string
  name: string
  phone: string
}

export default function InstructorPage() {
  const target = useRef<HTMLDivElement>(null)

  // 모달 상태관리
  const [isRegistered, setIsRegistered] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<{ detail: boolean; addInstructor: boolean }>({
    detail: false,
    addInstructor: false
  })

  const [instructorList, setInstructorList] = useState<instructorType[]>([])
  const [instructorId, setInstructorId] = useState<string>('')
  const [metaData, setMetaData] = useState<metaType>({
    page: 1,
    hasNextPage: false
  })
  const [isRefresh, setIsRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputData, setInputData] = useState<{ value: string; searchBy: string }>({
    value: '',
    searchBy: ''
  })

  const getInputDataFromChild = (data: { value: string; searchBy: string; list: instructorType[]; meta: metaType }) => {
    setInputData(prev => ({
      ...prev,
      value: data.value,
      searchBy: data.searchBy
    }))

    setInstructorList(data.list)
    setMetaData(prev => ({
      ...prev,
      page: data.meta.page,
      hasNextPage: data.meta.hasNextPage
    }))
  }

  /* 첫 로딩 실행 */
  useEffect(() => {
    instance('/api/teachers?searchBy=none').then(res => {
      const instructorsData = res.data.data.teachers
      const meta = res.data.data.meta
      setInstructorList(instructorsData)
      setMetaData(prev => ({
        ...prev,
        page: meta.page,
        hasNextPage: meta.hasNextPage
      }))
      setIsRefresh(true)
    })
  }, [])

  /* 강사 등록하면 새로 강사 리스트 가져오기 */
  useEffect(() => {
    if (isRegistered) {
      instance('/api/teachers?searchBy=none').then(res => {
        const instructorsData = res.data.data.teachers
        const meta = res.data.data.meta
        setInstructorList(instructorsData)
        setMetaData(prev => ({
          ...prev,
          page: meta.page,
          hasNextPage: meta.hasNextPage
        }))
        setIsRegistered(false)
      })
    }
  }, [isRegistered])

  /* 무한스크롤 시행 */
  useEffect(() => {
    if (metaData.hasNextPage) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }

      const getData = () => {
        if (inputData.value === '') {
          instance(`/api/teachers?searchBy=none&page=${metaData.page + 1}`).then(res => {
            const instructorsData = res.data.data.teachers
            const meta = res.data.data.meta
            setInstructorList(prev => [...prev, ...instructorsData])
            setMetaData(prev => ({
              ...prev,
              page: meta.page,
              hasNextPage: meta.hasNextPage
            }))
            setIsLoading(false)
          })
        } else {
          instance(
            `/api/teachers?searchBy=${inputData.searchBy}&${inputData.searchBy}=${inputData.value}&page=${
              metaData.page + 1
            }`
          ).then(res => {
            const instructorsData = res.data.data.teachers
            const meta = res.data.data.meta
            setInstructorList(prev => [...prev, ...instructorsData])
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

      return () => {
        if (observer && target.current) {
          observer.unobserve(target.current)
        }
      }
    }
  }, [metaData])

  return (
    <>
      <ContentHeader
        title="강사 관리"
        btnName="강사 등록"
        onClick={() => {
          setIsOpen(prev => ({
            ...prev,
            addInstructor: true
          }))
        }}
      />
      {/* 검색창 */}
      <SearchInput type="teachers" passInputData={getInputDataFromChild} />
      {/* 검색 결과 없음 */}
      {isRefresh && instructorList.length === 0 ? (
        <div className="w-full mt-[140px]">
          <NotFoundPage title="검색결과가 없습니다." subTitle="다른 검색어를 통해 검색을 이어나가보세요" />
        </div>
      ) : null}
      {/* 수강생 목록 시작 */}
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {instructorList.length !== 0 &&
          instructorList?.map(({ id, name, phone }) => {
            return (
              <div
                key={id}
                className="w-full h-[240px] flex flex-col justify-between px-6 pt-8 pb-6 border border-gray-200 rounded-3xl shadow-[0px_5px_15px_0px_rgba(0, 0, 0, 0.02)]"
              >
                <div className="w-full flex flex-col gap-2">
                  <span className="gray-900-semibold text-[24px] h-9 leading-9">{name}</span>
                  <span className="text-gray-500 text-[14px] font-medium h-6 leading-6">
                    {changePhoneNumberToString(phone)}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full px-5 py-2.5 flex gap-2 justify-center border border-primary-600 rounded-lg"
                  onClick={() => {
                    setIsOpen(prev => ({
                      ...prev,
                      detail: true
                    }))
                    setInstructorId(id)
                  }}
                >
                  <div className="indigo-500-semibold text-sm ">강사 정보</div>
                  <ChevronRightIcon className="text-primary-600" width={20} height={20} />
                </button>
              </div>
            )
          })}
      </div>
      {!isLoading && <div ref={target}></div>}
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
      {isOpen.detail && (
        <Drawer
          open={isOpen.detail}
          onClose={() => {
            setIsOpen(prev => ({
              ...prev,
              detail: false
            }))
          }}
        >
          <Drawer.Header />
          <Drawer.Items>
            <DetailInstructor id={instructorId} />
          </Drawer.Items>
        </Drawer>
      )}
      {isOpen.addInstructor && (
        <Modal
          size="sm"
          show={true}
          onClose={() => {
            setIsOpen(prev => ({
              ...prev,
              addInstructor: false
            }))
          }}
        >
          <Modal.Header>일정 추가</Modal.Header>
          <Modal.Body>
            <AddInstructor
              onClose={() => {
                setIsOpen(prev => ({
                  ...prev,
                  addInstructor: false
                }))
                setIsRegistered(true)
              }}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}
