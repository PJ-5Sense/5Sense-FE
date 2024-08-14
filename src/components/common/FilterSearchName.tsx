'use client'
import { useEffect, useState, useRef } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { instructorDataType } from '../class/classFilter'
import instance from '@/lib/api/axios'
import { filterState } from '@/lib/filter/filterState'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'

import SearchIcon from 'public/assets/icons/search.svg'

interface IProps {
  type: string
  target: string
}

export default function FilterSearchName(props: IProps) {
  const studentsListRef = useRef<HTMLDivElement>(null)
  const setFilterState = useSetRecoilState(filterState)
  const filterValue = useRecoilValue(filterState)

  const [listData, setListData] = useState<instructorDataType[]>([])
  const [searchName, setSearchName] = useState<string>('')
  const [isFocudInput, setIsFocusInput] = useState<boolean>(false)

  const SearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value)
  }

  const handleClickOutsideOfStudentList = (e: any) => {
    if (isFocudInput) {
      setIsFocusInput(false)
    }
  }
  useOnClickOutside(studentsListRef, handleClickOutsideOfStudentList)
  const filterName = () => {
    if (searchName !== '') {
      let ifIncludeSearchName = listData.filter(info => info.name.includes(searchName))
      let sortBySearchName = ifIncludeSearchName.sort((a, b) => {
        return a.name.indexOf(searchName) - b.name.indexOf(searchName)
      })
      let result = []
      for (var i = 0; i < sortBySearchName.length; i++) {
        result.push(sortBySearchName[i])
      }
      return result
    } else {
      return []
    }
  }

  let sortFilterName = filterName()

  useEffect(() => {
    instance(`/api/${props.target}?searchBy=none&page=1&take=100`).then(res => {
      const list = res.data.data[`${props.target}`]
      setListData(list)
    })
  }, [])

  return (
    <div ref={studentsListRef} className="relative w-full flex flex-col gap-3">
      <div className="w-full h-[42px] p-3 border rounded-lg border-gray-200 bg-gray-50 flex gap-2 focus:border-none focus-within:ring-1 focus-within:ring-[#7354E8]">
        <SearchIcon width={18} height={18} />
        <input
          type="text"
          placeholder={props.target === 'teachers' ? '강사 이름' : '수강생 이름'}
          value={searchName}
          onFocus={() => {
            setIsFocusInput(true)
          }}
          className="w-full h-full bg-gray-50 border-none focus:ring-0 text-gray-500 text-sm font-normal leading-[17.50px]"
          onChange={event => {
            SearchName(event)
          }}
        />
      </div>
      {props.type === 'filter' && (
        <div className="overflow-hidden">
          <div className="max-h-[150px]  flex flex-col items-center gap-3 overflow-auto ">
            {listData.map((data, i) => {
              return (
                <div key={i} className="w-full h-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={data.id}
                    checked={filterValue.teacherName.includes(data.name) ? true : false}
                    className="bg-gray-50 hover:cursor-pointer focus:ring-transparent ring-0 focus:outline-0 rounded"
                    onChange={e => {
                      if (e.target.checked) {
                        setFilterState(prev => ({
                          ...prev,
                          teacherId: [...prev.teacherId, data.id],
                          teacherName: [...prev.teacherName, data.name]
                        }))
                      } else {
                        setFilterState(prev => ({
                          ...prev,
                          teacherId: prev.teacherId.filter(id => id !== data.id),
                          teacherName: prev.teacherName.filter(name => name !== data.name)
                        }))
                      }
                    }}
                  />

                  <label className="hover:cursor-pointer" htmlFor={data.id}>
                    {data.name}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {props.type === 'search' && isFocudInput && (
        <div className="overflow-hidden">
          <div className="max-h-[150px] px-3  flex flex-col items-center gap-3 overflow-auto ">
            {listData.map((data, i) => {
              return (
                <div key={i} className="w-full h-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={data.id}
                    checked={filterValue.teacherName.includes(data.name) ? true : false}
                    className="bg-gray-50 hover:cursor-pointer focus:ring-transparent ring-0 focus:outline-0 rounded"
                    onChange={e => {
                      if (e.target.checked) {
                        setFilterState(prev => ({
                          ...prev,
                          teacherId: [...prev.teacherId, data.id],
                          teacherName: [...prev.teacherName, data.name]
                        }))
                      } else {
                        setFilterState(prev => ({
                          ...prev,
                          teacherId: prev.teacherId.filter(id => id !== data.id),
                          teacherName: prev.teacherName.filter(name => name !== data.name)
                        }))
                      }
                    }}
                  />

                  <label className="hover:cursor-pointer" htmlFor={data.id}>
                    {data.name}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 강사이름 자동완성 */}
      {searchName !== '' && sortFilterName.length !== 0 ? (
        <div className="absolute top-[45px] h-auto w-full flex flex-col gap-3 p-4 border border-gray-200 bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]">
          {sortFilterName.map((data, i) => {
            return (
              <div key={i} className="w-full flex items-center gap-2">
                <SearchIcon width={14} height={14} />
                <span
                  className="gray-500-normal text-sm hover:cursor-pointer"
                  id={data.name}
                  onClick={e => {
                    let teacherName = e.currentTarget.id
                    if (filterValue.teacherName.includes(teacherName)) {
                      setSearchName('')
                    } else {
                      setFilterState(prev => ({
                        ...prev,
                        teacherId: [...prev.teacherId, data.id],
                        teacherName: [...prev.teacherName, data.name]
                      }))
                      setSearchName('')
                    }
                  }}
                >
                  {/* 1글자만 입력시 */}
                  {searchName.length === 1 && (
                    <>
                      {data.name.split('').map((nameSplit: string, i) => {
                        if (nameSplit === searchName) {
                          return (
                            <span key={i} className="text-[#7354E8] text-sm font-normal">
                              {searchName}
                            </span>
                          )
                        } else {
                          return (
                            <span key={i} className="gray-500-normal text-sm">
                              {nameSplit}
                            </span>
                          )
                        }
                      })}
                    </>
                  )}
                  {/* 1글자 이상 입력 & 입력 글자 === 찾고자하는 강사 이름 */}
                  {searchName.length > 1 && data.name === searchName && (
                    <>
                      <span key={i} className="text-[#7354E8] text-sm font-normal">
                        {searchName}
                      </span>
                    </>
                  )}
                  {/* 1글자 이상 입력 && 입력 글자 !== 찾고자 하는 강사 이름 */}
                  {searchName.length > 1 && data.name !== searchName && (
                    <>
                      {data.name.split(searchName).map((nameSplit: string, i: number) => {
                        if (nameSplit === '') {
                          return (
                            <span key={i} className="text-primary-600 text-sm font-normal">
                              {searchName}
                            </span>
                          )
                        } else {
                          return (
                            <span key={i} className="gray-500-normal text-sm">
                              {nameSplit}
                            </span>
                          )
                        }
                      })}
                    </>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
