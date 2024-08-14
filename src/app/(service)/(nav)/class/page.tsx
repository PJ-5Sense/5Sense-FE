'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import ClassFilter from '@/components/class/classFilter'
import instance from '@/lib/api/axios'
import { filterState, filterStateType } from '@/lib/filter/filterState'
import DetailClassModal from '@/components/modal/DetailClassModal'
import ContentHeader from '@/components/common/ContentHeader'
import NotFoundPage from '@/components/common/NotFoundPage'

interface classType {
  category: string
  id: number
  type: string
  name: string
  teacher: string
  createdData: Date
  numberOfStudents: string
}

export default function ClassPage() {
  const router = useRouter()
  const target = useRef<HTMLDivElement>(null)
  const filterValue = useRecoilValue(filterState)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [classList, setClassList] = useState<classType[]>([])
  const [targetClass, setTargetClass] = useState<{ id: number; type: string }>({
    id: 0,
    type: ''
  })

  const [metaData, setMetaData] = useState<{ page: number; hasNextPage: boolean }>({
    page: 1,
    hasNextPage: false
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRefresh, setIsRefresh] = useState<boolean>(false)

  const checkLessonUrl = (data: filterStateType, page: number) => {
    let baseUrl = ['/api/lessons/filters?']
    if (data.classType !== '') {
      baseUrl.push(`type=${data.classType}`)
    } else {
      baseUrl.push('type=all')
    }
    if (data.teacherId.length !== 0) {
      baseUrl.push('&teachers=')
      baseUrl.push(data.teacherId.join())
    }
    if (data.subCategoryId !== '') {
      baseUrl.push('&categories=')
      baseUrl.push(data.subCategoryId)
    }
    baseUrl.push(`&page=${page}&take=10`)
    return baseUrl.join('')
  }

  useEffect(() => {
    instance(checkLessonUrl(filterValue, 1)).then(res => {
      const lessonData = res.data.data.lessons
      const meta = res.data.data.meta
      setClassList(lessonData)
      setMetaData(prev => ({
        ...prev,
        page: meta.page,
        hasNextPage: meta.hasNextPage
      }))
      setIsRefresh(true)
    })
  }, [filterValue])

  useEffect(() => {
    if (metaData.hasNextPage) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }

      const getData = () => {
        instance(checkLessonUrl(filterValue, metaData.page + 1)).then(res => {
          const lessonData = res.data.data.lessons
          const meta = res.data.data.meta
          setClassList(prev => [...prev, ...lessonData])
          setMetaData(prev => ({
            ...prev,
            page: meta.page,
            hasNextPage: meta.hasNextPage
          }))
          setIsLoading(false)
        })
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
    <div className="w-full">
      <ContentHeader title="클래스 관리" btnName="클래스 등록" onClick={() => router.push('class/register')} />
      <ClassFilter />
      <div className="w-full grid grid-cols-2 2xl:grid-cols-3 gap-[20px] mt-5">
        {classList.length !== 0 &&
          classList.map((data, idx) => (
            <button
              key={idx}
              className="h-[224px] px-6 py-8 flex flex-col rounded-lg shadow-[0_5px_15px_0_rgba(0,0,0,0.02)] border border-gray-200 hover:border-primary-600"
              onClick={() => {
                setTargetClass(prev => ({
                  ...prev,
                  id: data.id,
                  type: data.type
                }))
                setIsModalOpen(true)
              }}
            >
              <div
                className={`mb-5 h-7 px-2.5 py-2 rounded justify-center items-center ${
                  data.type === 'duration' ? 'text-primary-600 bg-primary-100' : 'text-secondary-600 bg-secondary-100'
                } text-xs font-semibold`}
              >
                {data.category}
              </div>
              <div className="mb-8 h-[60px] gray-900-semibold text-[20px]">{data.name}</div>
              <div className="w-full flex items-center justify-between">
                <div className="gray-500-medium text-base">담당 강사 : {data.teacher}</div>
                <div className="gray-500-normal text-base">회원 수 : {data.numberOfStudents}</div>
              </div>
            </button>
          ))}
      </div>
      {!isLoading && <div ref={target}></div>}
      {isLoading && (
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
      )}
      {isRefresh && classList.length === 0 ? (
        <div className="w-full mt-[140px]">
          <NotFoundPage title="검색결과가 없습니다." subTitle="다른 검색어를 통해 검색을 이어나가보세요" />
        </div>
      ) : null}
      {isModalOpen && (
        <DetailClassModal
          id={targetClass.id}
          type={targetClass.type}
          isOpen={isModalOpen}
          handleClose={() => {
            setIsModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
