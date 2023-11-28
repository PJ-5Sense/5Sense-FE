import Image from 'next/image'
import { useState, useRef, useEffect, BaseSyntheticEvent } from 'react'
import chevronDownBlue from '../../assets/icons/chevron-down-blue.svg'
import chevronUpBlue from '../../assets/icons/chevron-up-blue.svg'
import searchIcon from '../../assets/icons/search.svg'
import chevronDownGray from '../../assets/icons/chevron-down-gray.svg'
import chevronUpGray from '../../assets/icons/chevron-up-gray.svg'
import { useOnClickOutside } from '../../hooks/useOnclickOutside'

export default function ClassFilter() {
  //const teacherTypeRef = useRef<HTMLButtonElement>(null);
  const teacherInfo: { name: string }[] = [
    { name: '정은담' },
    { name: '엄세리' },
    { name: '윤태식' },
    { name: '조영은' },
    { name: '조성훈' },
    { name: '정유미' },
    { name: '정해인' },
    { name: '정우성' },
    { name: '정우영' },
    { name: '정국' }
  ]

  const category: { subject: string; detail: string[] }[] = [
    {
      subject: '미술',
      detail: ['미술 1반', '미술 2반', '미술 3반', '미술 4반', '미술 5반']
    },
    {
      subject: '연기',
      detail: ['연기 1반', '연기 2반', '연기 3반', '연기 4반', '연기 5반']
    },
    {
      subject: '공연',
      detail: ['공연 1반', '공연 2반', '공연 3반', '공연 4반', '공연 5반']
    },
    {
      subject: '체육',
      detail: ['체육 1반', '체육 2반', '체육 3반', '체육 4반', '체육 5반']
    },
    {
      subject: '댄스',
      detail: ['댄스 1반', '댄스 2반', '댄스 3반', '댄스 4반', '댄스 5반']
    },
    {
      subject: '보컬',
      detail: ['보컬 1반', '보컬 2반', '보컬 3반', '보컬 4반', '보컬 5반']
    },
    {
      subject: '프로듀싱',
      detail: [
        '프로듀싱 1반',
        '프로듀싱 2반',
        '프로듀싱 3반',
        '프로듀싱 4반',
        '프로듀싱 5반'
      ]
    },
    {
      subject: '연주',
      detail: ['연주 1반', '연주 2반', '연주 3반', '연주 4반', '연주 5반']
    },
    {
      subject: '기타',
      detail: ['기타 1', '기타 2', '기타 3', '기타 4', '기타 5']
    }
  ]

  let [isClickedClassFilter, setIsClickedClassFilter] = useState<boolean>(false)
  let [isClickedTeacherFilter, setIsClickedTeacherFilter] =
    useState<boolean>(false)
  let [isClickedCategoryFilter, setIsClickedCategoryFilter] =
    useState<boolean>(false)
  //let [test, setTest] = useState<string>('true');
  let [classType, setClassType] = useState<string>('')
  let [searchTeacher, setSearchTeacher] = useState<string>('')
  let [checkedTeacherNameList, setCheckedTeacherNameList] = useState<string[]>(
    []
  )
  let [onFocusFirstGroup, setOnFocusFirstGroup] = useState<boolean>(false)
  let [onFocusSecondGroup, setOnFocusSecondGroup] = useState<boolean>(false)
  let [groupClass, setGroupClass] = useState<{
    subject: string
    key: null | number
    detail: string
  }>({
    subject: '',
    key: null,
    detail: ''
  })

  function SearchTeacherName(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTeacher(event.target.value)
  }

  function onFocusTrue() {
    setIsClickedClassFilter(true)
    //setTest('true')
    //console.log(onFocusFilterBtn);
  }

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)
    setClassType(event.target.value)
    setIsClickedClassFilter(false)
  }

  function getCheckedName() {
    if (checkedTeacherNameList.length === 1) {
      return `${checkedTeacherNameList[0]}`
    } else if (checkedTeacherNameList.length == 2) {
      return `${checkedTeacherNameList[0]},${checkedTeacherNameList[1]}`
    } else {
      return `${checkedTeacherNameList[0]},${checkedTeacherNameList[1]},${checkedTeacherNameList[2][0]}..`
    }
  }

  function compareSearchAndList(e: any) {
    //if(e.target.current.id)
  }

  const classTypeRef = useRef<HTMLButtonElement>(null)
  const classTypeRefClick = useRef<HTMLDivElement>(null)
  const teacherNameTypeRef = useRef<HTMLButtonElement>(null)
  const teacherNameTypeRefClick = useRef<HTMLDivElement>(null)
  const categoryTypeRef = useRef<HTMLButtonElement>(null)
  const categoryTypeRefClick = useRef<HTMLDivElement>(null)

  const handleClickCategoryOutside = (e: any) => {
    //console.log('outside');
    //console.log(categoryTypeRefClick.current?.contains(e.target));

    if (
      isClickedCategoryFilter &&
      !categoryTypeRefClick.current?.contains(e.target)
    ) {
      setIsClickedCategoryFilter(false)
    }
  }

  const handleClickCategoryInside = () => {
    setIsClickedCategoryFilter(prev => !prev)
  }

  const handleClickClassOutside = (e: any) => {
    //console.log('class outside');
    if (
      isClickedClassFilter &&
      !classTypeRefClick.current?.contains(e.target)
    ) {
      setIsClickedClassFilter(false)
    }
  }

  const handleCLickClassInside = () => {
    //console.log('class inside');
    setIsClickedClassFilter(prev => !prev)
  }

  const handleClickTeacherOutside = (e: any) => {
    //console.log('click outside');
    if (
      isClickedTeacherFilter &&
      !teacherNameTypeRefClick.current?.contains(e.target)
    ) {
      setIsClickedTeacherFilter(false)
    }
  }

  const handleClickTeacherInside = () => {
    //console.log('click inside');
    setIsClickedTeacherFilter(prev => !prev)
  }
  /* 카테고리 영역 밖 클릭 */
  useOnClickOutside(categoryTypeRef, handleClickCategoryOutside)
  /* 클래스 필터링 영역 밖 클릭 */
  useOnClickOutside(classTypeRef, handleClickClassOutside)
  /* 강사명 필터링 영역 밖 클릭 */
  useOnClickOutside(teacherNameTypeRef, handleClickTeacherOutside)

  /* 클래스 필터링 영역 밖 클릭 */
  /* useEffect(() => {
        const clickOutsideTimeFilter = (e: any) => {
            if (!isClickedTimeFilter && !classTypeRefClick.current?.contains(e.target) && !classTypeRef.current?.contains(e.target)) {
              setIsClickedTimeFilter(false);
            }
          }
        
          document.addEventListener('mousedown', clickOutsideTimeFilter)
          return () => {
            document.removeEventListener('mousedown', clickOutsideTimeFilter)
          }
    }, [classTypeRefClick, classTypeRef]); */

  /* 강사명 필터링 영역 밖 클릭 */
  /* useEffect(() => {
        const clickOutsideTeacherFilter = (e: any) => {
            if(!isClickedTeacherFilter && !teacherNameTypeRef.current?.contains(e.target) && !teacherNameTypeRefClick.current?.contains(e.target)){
                setIsClickedTeacherFilter(false);
            }
        } 
          document.addEventListener('mousedown', clickOutsideTeacherFilter)
          return () => {
            document.removeEventListener('mousedown', clickOutsideTeacherFilter)
          }
    }, [teacherNameTypeRef, teacherNameTypeRefClick]) */

  //console.log(classType)

  return (
    <div className="absolute left-12 top-[120px] flex flex-col gap-2 h-[50px]">
      <div className=" max-w-[375px] h-[37px] items-start gap-2 flex">
        <button
          ref={classTypeRef}
          className="group flex items-center gap-2 w-[112px] h-full border px-3 py-2 rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
          onClick={e => {
            handleCLickClassInside()
          }}
        >
          <span className="w-16 h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">
            {classType === '' ? '클래스 유형' : classType}
          </span>
          {isClickedClassFilter ? (
            <Image src={chevronUpBlue} width={16} height={16} alt=" " />
          ) : (
            <Image src={chevronDownBlue} width={16} height={16} alt=" " />
          )}
        </button>
        <button
          ref={teacherNameTypeRef}
          className="group flex items-center gap-2 max-w-[150px] h-full px-3 py-2 border rounded-lg border-indigo-500  hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9] focus-within:text-white"
          onClick={() => {
            handleClickTeacherInside()
          }}
        >
          <span className="max-w-[110px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">
            {checkedTeacherNameList.length === 0 ? '강사명' : getCheckedName()}
          </span>
          {isClickedTeacherFilter ? (
            <Image src={chevronUpBlue} width={16} height={16} alt=" " />
          ) : (
            <Image src={chevronDownBlue} width={16} height={16} alt=" " />
          )}
        </button>
        <button
          ref={categoryTypeRef}
          className="group flex items-center gap-2 w-[97px] h-full px-3 py-2 border rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
          onClick={() => {
            handleClickCategoryInside()
            //setIsClickedCategoryFilter(prev => !prev)
          }}
        >
          <span className="w-[49px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">
            {groupClass.detail !== '' ? groupClass.detail : '카테고리'}
          </span>
          {isClickedCategoryFilter ? (
            <Image src={chevronUpBlue} width={16} height={16} alt=" " />
          ) : (
            <Image src={chevronDownBlue} width={16} height={16} alt=" " />
          )}
        </button>
      </div>
      <div className="relative">
        {' '}
        {/* 필터링 UI 기준점 */}
        {/* 기반반/회차반 필터링 */}
        {isClickedClassFilter ? (
          <div
            ref={classTypeRefClick}
            className="absolute w-[150px] flex flex-col p-4 border rounded-lg border-gray-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] bg-white"
          >
            <div
              id="classTypeFilter"
              className="w-[130px] h-[54] flex flex-col gap-3 "
            >
              <p className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="timeClass"
                  name="classType"
                  value="회차반"
                  onChange={radioHandler}
                />
                <label
                  htmlFor="timeClass"
                  className="text-gray-900 text-sm font-semibold font-['Pretendard'] leading-[21px]"
                >
                  회차반
                </label>
              </p>
              <p className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="preiodClass"
                  name="classType"
                  value="기간반"
                  onChange={radioHandler}
                />
                <label
                  htmlFor="preiodClass"
                  className="text-gray-900 text-sm font-semibold font-['Pretendard'] leading-[21px]"
                >
                  기간반
                </label>
              </p>
            </div>
          </div>
        ) : null}
        {/* 강사이름 필터링 */}
        {isClickedTeacherFilter ? (
          <div
            ref={teacherNameTypeRefClick}
            className="absolute left-[120px] flex gap-[5px] w-[195px] py-4 pl-4 pr-2 border rounded-lg border-gray-300 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]"
          >
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-[42px] p-3 border rounded-lg border-gray-200 bg-gray-50 flex gap-2 focus:border-none focus-within:ring-1 focus-within:ring-[#7354E8]">
                <Image src={searchIcon} width={18} height={18} alt=" " />
                <input
                  type="text"
                  placeholder="강사이름"
                  value={searchTeacher}
                  className="w-full h-full border-none focus:ring-0 text-gray-500 text-sm font-normal font-['Pretendard'] leading-[17.50px]"
                  onChange={event => {
                    SearchTeacherName(event)
                    console.log(searchTeacher)
                  }}
                />
              </div>
              <div className="overflow-hidden">
                <div className="max-h-[150px]  flex flex-col items-center gap-3 overflow-auto ">
                  {teacherInfo.map((teacher, i) => {
                    return (
                      <div
                        key={i}
                        className="w-full h-4 flex items-center gap-2"
                      >
                        {checkedTeacherNameList.includes(teacher.name) ? (
                          <input
                            type="checkbox"
                            id={teacher.name}
                            value={teacher.name}
                            checked
                            className="hover:cursor-pointer focus:ring-transparent ring-0 focus:outline-0 rounded"
                            onChange={e => {
                              if (e.target.checked) {
                                setCheckedTeacherNameList(
                                  checkedTeacherNameList => [
                                    ...checkedTeacherNameList,
                                    e.target.value
                                  ]
                                )
                              } else {
                                setCheckedTeacherNameList(
                                  checkedTeacherNameList.filter(
                                    name => name !== e.target.value
                                  )
                                )
                              }
                            }}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            id={teacher.name}
                            value={teacher.name}
                            className="hover:cursor-pointer focus:ring-transparent ring-0 focus:outline-0 rounded"
                            onChange={e => {
                              if (e.target.checked) {
                                setCheckedTeacherNameList(
                                  checkedTeacherNameList => [
                                    ...checkedTeacherNameList,
                                    e.target.value
                                  ]
                                )
                              } else {
                                setCheckedTeacherNameList(
                                  checkedTeacherNameList.filter(
                                    name => name !== e.target.value
                                  )
                                )
                              }
                            }}
                          />
                        )}

                        <label
                          className="hover:cursor-pointer"
                          htmlFor={teacher.name}
                        >
                          {teacher.name}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* 강사이름 자동완성 */}
              {searchTeacher !== '' ? (
                <div className="absolute top-[62px] w-[162px] h-auto flex flex-col gap-3 p-4 border border-gray-200 bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]">
                  {teacherInfo.map((teacher, i) => {
                    if (teacher.name.includes(searchTeacher)) {
                      return (
                        <div key={i} className="w-full flex items-center gap-2">
                          <Image
                            src={searchIcon}
                            width={14}
                            height={14}
                            alt=" "
                          />
                          <span
                            className="text-[#7354E8] text-sm font-normal font-['Pretendard'] leading-[21px] hover:cursor-pointer"
                            id={teacher.name}
                            onClick={e => {
                              //console.log(e.currentTarget)
                              let teacherName = e.currentTarget.id
                              if (
                                checkedTeacherNameList.includes(teacherName)
                              ) {
                                setSearchTeacher('')
                              } else {
                                setCheckedTeacherNameList([
                                  ...checkedTeacherNameList,
                                  e.currentTarget.id
                                ])
                                setSearchTeacher('')
                              }
                            }}
                          >
                            {searchTeacher}
                            <span className="text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px]">
                              {teacher.name.replace(searchTeacher, '')}
                            </span>
                          </span>
                          {/* 앞 순서부터만 색 변경 가능 이슈 고치기 */}
                        </div>
                      )
                    }
                  })}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* 카테고리명 대분류/소분류 필터링 */}
        {isClickedCategoryFilter ? (
          <div
            ref={categoryTypeRefClick}
            className="absolute left-[212.5px] flex flex-col w-[195px] h-auto p-4 gap-3 border rounded-lg border-gray-300 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]"
          >
            <div className="relative">
              <button
                className="z-0 flex items-center w-full h-[42px] p-3 border rounded-lg border-gray-300 bg-white focus:border-indigo-500"
                onClick={() => {
                  setOnFocusFirstGroup(prev => !prev)
                }}
              >
                <span className="w-[90%] text-left text-gray-500 text-sm font-normal font-['Pretendard']">
                  {groupClass.subject !== ''
                    ? groupClass.subject
                    : '대분류 선택'}
                </span>
                <Image
                  className=""
                  src={onFocusFirstGroup ? chevronUpGray : chevronDownGray}
                  width={16}
                  height={16}
                  alt=" "
                />
              </button>
              {/* 대분류 필터링 */}
              {onFocusFirstGroup ? (
                <div className="overflow-hidden">
                  <div className="z-10 absolute w-full max-h-[144px] overflow-auto p-1 border border-indigo-500 rounded-md bg-white">
                    {category.map((group, i) => {
                      return (
                        <div
                          key={i}
                          id={group.subject}
                          className="rounded-[3px] px-2 py-1 text-gray-900 text-sm font-normal font-['Pretendard'] hover:bg-purple-100"
                          onClick={e => {
                            setGroupClass({
                              ...groupClass,
                              subject: e.currentTarget.id,
                              key: i
                            })
                            setOnFocusFirstGroup(false)
                          }}
                        >
                          {group.subject}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="relative">
              <button
                className="z-0 flex items-center w-full h-[42px] p-3 border rounded-lg border-gray-300 bg-white focus:border-indigo-500"
                onClick={() => {
                  setOnFocusSecondGroup(prev => !prev)
                }}
              >
                <span className="w-[90%] text-left text-gray-500 text-sm font-normal font-['Pretendard']">
                  {groupClass.detail !== '' ? groupClass.detail : '소분류 선택'}
                </span>
                <Image
                  className=""
                  src={onFocusSecondGroup ? chevronUpGray : chevronDownGray}
                  width={16}
                  height={16}
                  alt=" "
                />
              </button>
              {/* 소분류 필터링 */}
              {groupClass.key !== null && onFocusSecondGroup ? (
                <div className="overflow-hidden">
                  <div className="z-10 absolute w-full max-h-[144px] overflow-auto p-1 border border-indigo-500 rounded-md bg-white">
                    {category[groupClass.key].detail.map((detailValue, i) => {
                      return (
                        <div
                          key={i}
                          id={detailValue}
                          className="rounded-[3px] px-2 py-1 text-gray-900 text-sm font-normal font-['Pretendard'] hover:bg-purple-100"
                          onClick={e => {
                            console.log(e.currentTarget.id)
                            setGroupClass({
                              ...groupClass,
                              detail: detailValue
                            })
                            setOnFocusSecondGroup(false)
                            //setFirstGroupClass(e.currentTarget.id)
                          }}
                        >
                          {detailValue}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
