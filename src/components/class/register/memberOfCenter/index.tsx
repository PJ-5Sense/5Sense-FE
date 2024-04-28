'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Modal from '@/components/common/modal'
import RegisterModal from '@/components/instructor/RegisterModal'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import instance from '@/lib/api/axios'
import { modalState } from '@/lib/state/modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import CloseCircleIcon from 'public/assets/icons/circle/close.svg'
import Close_Circle_bg from 'public/assets/icons/close_circle_bg_pri_600.svg'
import PlusIcon from 'public/assets/icons/plus.svg'
import SearchIcon from 'public/assets/icons/search.svg'
import UserCircle from 'public/assets/icons/user_circle.svg'
import VecterIcon from 'public/assets/icons/vector.svg'

interface IProps {
  onChange: (name: string) => void
  valid: boolean
  type: string
}

export default function MemberOfCenter({ onChange, valid, type }: IProps) {
  const inputClickRef = useRef<HTMLInputElement>(null)
  const autoCompleteTeacherNameRef = useRef<HTMLDivElement>(null)

  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)

  const handleClickOutsideOfInput = (e: any) => {
    if (openNameList && !autoCompleteTeacherNameRef.current?.contains(e.target)) {
      setOpenNameList(false)
    }
  }

  const handleClickInsideOfInput = () => {
    setOpenNameList(prev => !prev)
  }

  useOnClickOutside(inputClickRef, handleClickOutsideOfInput)

  let [searchingName, setSearchingName] = useState<string>('')
  let [checkInclude, setCheckInclude] = useState<boolean>(false)
  let [isClickedAddTeacher, setIsClickedAddTeacher] = useState<boolean>(false)
  let [openNameList, setOpenNameList] = useState<boolean>(false)
  let [nameValue, setNameValue] = useState<string>('')

  const emptyInput = () => {
    setSearchingName('')
  }

  const [nameList, setNameList] = useState<{ id: string; name: string; phone: string; particulars?: string }[]>([])
  useEffect(() => {
    if (type === 'teachers') {
      instance(`/teachers?searchBy=none&take=100`).then(res => {
        const data = res.data.data.teachers
        setNameList(data)
      })
    } else if (type === 'students') {
      const classId = localStorage.getItem('classId')
      if (classId !== 'null') {
        instance(`/students/lessons/${classId}`).then(res => {
          const data = res.data.data
          setNameList(data)
        })
      }
    }
  }, [isClickedAddTeacher])

  return (
    <>
      <div
        className={`flex flex-col items-start w-[640px] py-8 px-6 border ${
          valid ? 'border-[#E5E7EB]' : 'border-[#EF5D5D]'
        } rounded-xl bg-[#FFF]`}
      >
        <div className="gray-900-bold text-xl pb-10">강사 정보</div>
        {type === 'students' && <div className="w-full text-left gray-800-semibold text-base pb-2">수강생 찾기</div>}
        <div className="flex flex-start flex-col w-[100%] h-[auto] px-4 py-[14px] justify-center border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg focus-within:border-[#7354E8]">
          <div className="relative flex w-[100%] items-center gap-2">
            <SearchIcon />
            <input
              ref={inputClickRef}
              className="w-[100%] text-[16px] bg-[#F9FAFB] text-[#111928] font-normal outline-none"
              placeholder={type === 'teachers' ? '강사 이름을 입력해주세요' : '수강생 이름을 입력해주세요'}
              value={searchingName}
              onClick={() => {
                handleClickInsideOfInput()
              }}
              onChange={e => {
                setSearchingName(e.target.value)
                onChange(e.target.value)
              }}
            />

            {searchingName !== '' && searchingName !== nameValue ? (
              <CloseCircleIcon className="text-gray-400 cursor-pointer" onClick={emptyInput} />
            ) : null}
            {searchingName === nameValue && searchingName !== '' ? (
              <Close_Circle_bg
                className="absolute left-[100px] cursor-pointer"
                width={20}
                height={20}
                onClick={() => {
                  setSearchingName('')
                  setCheckInclude(prev => !prev)
                }}
              />
            ) : null}
          </div>
        </div>
        {openNameList ? (
          <div
            ref={autoCompleteTeacherNameRef}
            className=" flex flex-col w-[100%] h-[auto] p-4 border rounded-lg items-center gap-3 bg-[#FFF] border-[#E5E7EB] shadow-[0px_1px_2px_0px_rgba(0, 0, 0, 0.08)]"
          >
            <div className="w-[100%] text-[14px] gray-900-semibold">강사 이름</div>
            <div className=" w-full overflow-hidden">
              <div className="max-h-[185px] overflow-y-scroll">
                {nameList.map((data, index) => {
                  if (data.name.includes(searchingName)) {
                    return (
                      <div
                        data-teachername={data.name}
                        key={index}
                        className="relative flex w-full px-3 py-2 items-center gap-2 rounded-lg bg-[#F9FAFB] cursor-pointer hover:opacity-70"
                        onClick={e => {
                          const name: any = e.currentTarget.getAttribute('data-teachername')
                          setSearchingName(name)
                          setCheckInclude(prev => !prev)
                          setNameValue(data.name)
                          setOpenNameList(prev => !prev)
                          onChange(data.id)
                        }}
                      >
                        <UserCircle className="text-gray-400" />
                        <div id="name" className="text-gray-500 text-sm font-normal">
                          {data.name}
                        </div>
                        <VecterIcon className="absolute right-3" width={14} height={15} />
                      </div>
                    )
                  }
                })}
              </div>
            </div>
            {type === 'teachers' && (
              <div
                className="flex w-full pt-3 border-t border-t-[#E5E7EB] gap-1 text-[14px] text-primary-600 font-semibold items-center cursor-pointer"
                onClick={() => {
                  setIsClickedAddTeacher(true)
                  setModal(true)
                }}
              >
                <PlusIcon />
                강사 추가
              </div>
            )}
          </div>
        ) : null}
      </div>
      {type === 'teachers' && isClickedAddTeacher && (
        <Modal small>
          <RegisterModal onClose={() => setModal(false)} onCloseState={() => setIsClickedAddTeacher(false)} />
        </Modal>
      )}
    </>
  )
}