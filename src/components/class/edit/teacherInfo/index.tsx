'use client'
import { useEffect, useRef, useState } from 'react'

import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import instance from '@/lib/api/axios'
import { modalState } from '@/lib/state/modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Close_Circle_bg from 'public/assets/icons/close_circle_bg_pri_600.svg'
import PlusIcon from 'public/assets/icons/plus.svg'
import SearchIcon from 'public/assets/icons/search.svg'
import UserCircle from 'public/assets/icons/user_circle.svg'
import VecterIcon from 'public/assets/icons/vector.svg'
//import { ITeacherInfo } from '@/app/(service)/(nav)/class/edit/session/[id]/page'

interface IProps {
  teacherInfo?: any
  onChange: (value: string) => void
  valid: boolean
}

export default function TeacherInfo({ onChange, valid, teacherInfo }: IProps) {
  const inputClickRef = useRef<HTMLInputElement>(null)
  const autoCompleteTeacherNameRef = useRef<HTMLDivElement>(null)

  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)

  const handleClickOutsideOfInput = (e: any) => {
    if (openTeacherList && !autoCompleteTeacherNameRef.current?.contains(e.target)) {
      setOpenTeacherList(false)
    }
  }

  const handleClickInsideOfInput = () => {
    setOpenTeacherList(prev => !prev)
  }

  useOnClickOutside(inputClickRef, handleClickOutsideOfInput)

  let [teacherName, setTeacherName] = useState<string>('')
  let [checkInclude, setCheckInclude] = useState<boolean>(false)
  let [isClickedAddTeacher, setIsClickedAddTeacher] = useState<boolean>(false)
  let [newTeacherName, setNewTeacherName] = useState<string>('')
  let [newTeacherPhoneNum, setNewTeacherPhoneNum] = useState<string>('')
  let [openTeacherList, setOpenTeacherList] = useState<boolean>(false)
  let [nameValue, setNameValue] = useState<string>('')

  const emptyInput = () => {
    setTeacherName('')
  }

  const [teacherList, setTeacherList] = useState<{ id: string; name: string; phone: string }[]>([])
  useEffect(() => {
    instance('/api/teachers?searchBy=none&take=100').then(res => {
      setTeacherList(res.data.data.teachers)
    })
  }, [isClickedAddTeacher])

  useEffect(() => {
    if (teacherInfo) {
      console.log(teacherInfo.name)
      setTeacherName(teacherInfo.name)
    }
  }, [teacherInfo])

  return (
    <>
      <div
        className={`flex flex-col items-start gap-10 w-[640px] py-8 px-6 border ${
          valid ? 'border-[#E5E7EB]' : 'border-[#EF5D5D]'
        } rounded-xl bg-[#FFF]`}
      >
        <div className={`gray-900-bold text-[20px]`}>강사 정보</div>
        <div className="flex flex-start flex-col w-[100%] h-[auto] px-4 py-[14px] justify-center border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg focus-within:border-[#7354E8]">
          <div className="relative flex w-[100%] items-center gap-2">
            <SearchIcon />
            <input
              ref={inputClickRef}
              className="w-[100%] text-[16px] bg-[#F9FAFB] text-[#111928] font-normal outline-none"
              placeholder="강사 이름을 입력해주세요"
              value={teacherName}
              onClick={() => {
                //clickInput
                handleClickInsideOfInput()
              }}
              onChange={e => {
                setTeacherName(e.target.value)
                onChange(e.target.value)
              }}
            />

            {/* {teacherName !== '' && teacherName !== nameValue ? (
              // <CloseCircleIcon className="text-gray-400 cursor-pointer" onClick={emptyInput} />
            ) : null} */}
            {teacherName === nameValue && teacherName !== '' ? (
              <Close_Circle_bg
                className="absolute left-[100px] cursor-pointer"
                width={20}
                height={20}
                onClick={() => {
                  setTeacherName('')
                  setCheckInclude(prev => !prev)
                }}
              />
            ) : null}
          </div>
        </div>
        {openTeacherList ? (
          <div
            ref={autoCompleteTeacherNameRef}
            className=" flex flex-col w-[100%] h-[auto] p-4 border rounded-lg items-center gap-3 bg-[#FFF] border-[#E5E7EB] shadow-[0px_1px_2px_0px_rgba(0, 0, 0, 0.08)]"
          >
            <div className="w-[100%] text-[14px] gray-900-semibold">강사 이름</div>
            <div className=" w-full overflow-hidden">
              <div className="max-h-[185px] overflow-y-scroll">
                {teacherList.map((data, index) => {
                  if (data.name.includes(teacherName)) {
                    return (
                      <div
                        data-teachername={data.name}
                        key={index}
                        className="relative flex w-full px-3 py-2 items-center gap-2 rounded-lg bg-[#F9FAFB] cursor-pointer hover:opacity-70"
                        onClick={e => {
                          const name: any = e.currentTarget.getAttribute('data-teachername')
                          setTeacherName(name)
                          setCheckInclude(prev => !prev)
                          setNameValue(data.name)
                          setOpenTeacherList(prev => !prev)
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
          </div>
        ) : null}
      </div>
      {/* {isClickedAddTeacher && (
        <Modal small>
          <RegisterModal onClose={() => setModal(false)} onCloseState={() => setIsClickedAddTeacher(false)} />
        </Modal>
      )} */}
    </>
  )
}
