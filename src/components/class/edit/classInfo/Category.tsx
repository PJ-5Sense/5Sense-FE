import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'

//import { IClassInfo } from '@/app/(service)/(nav)/class/edit/session/[id]/page'
import CheckIcon from '@/icons/icon/category/check.svg'

export type category = {
  id: number
  name: string
  imgUrl: string
  options: subCategory[]
}

type subCategory = {
  id: number
  name: string
}

interface IProps {
  classInfo: any
  valid: boolean
  checkValid: (vlaue: any) => void
  onChange: (vlaue: any) => void
}

const categorydata: category[] = [
  {
    id: 1,
    name: '미술',
    imgUrl: '/assets/icons/category/arts.svg',
    options: [
      { id: 10, name: '아크릴화' },
      { id: 11, name: '수채화' },
      { id: 12, name: '유화' },
      { id: 13, name: '디지털 드로잉' },
      { id: 14, name: '이색 드로잉' },
      { id: 15, name: '캘리그라피' }
    ]
  },
  {
    id: 2,
    name: '연기',
    imgUrl: '/assets/icons/category/show.svg',
    options: []
  },
  {
    id: 3,
    name: '공연',
    imgUrl: '/assets/icons/category/performance.svg',
    options: []
  },
  {
    id: 4,
    name: '체육',
    imgUrl: '/assets/icons/category/sports.svg',
    options: [
      { id: 16, name: '클라이밍' },
      { id: 17, name: '실내다이빙' },
      { id: 18, name: '라켓스포츠' },
      { id: 19, name: '구기스포츠' },
      { id: 20, name: '무도' },
      { id: 21, name: '수영' },
      { id: 22, name: '겨울스포츠' },
      { id: 23, name: '이색스포츠' }
    ]
  },
  {
    id: 5,
    name: '댄스',
    imgUrl: '/assets/icons/category/dance.svg',
    options: [
      { id: 24, name: '방송댄스' },
      { id: 25, name: '발레' },
      { id: 26, name: '폴댄스' },
      { id: 27, name: '스윙댄스' },
      { id: 28, name: '이색댄스' }
    ]
  },
  {
    id: 6,
    name: '보컬',
    imgUrl: '/assets/icons/category/vocal.svg',
    options: [
      { id: 29, name: '재즈' },
      { id: 30, name: '실용음악' },
      { id: 31, name: '뮤지컬' },
      { id: 32, name: '기타 작곡' }
    ]
  },
  {
    id: 7,
    name: '프로듀싱',
    imgUrl: '/assets/icons/category/produce.svg',
    options: [
      { id: 33, name: '프로듀싱' },
      { id: 34, name: '작곡·작사' },
      { id: 35, name: '디제잉악기' }
    ]
  },
  {
    id: 8,
    name: '연주',
    imgUrl: '/assets/icons/category/play.svg',
    options: [
      { id: 36, name: '피아노' },
      { id: 37, name: '현악기' },
      { id: 38, name: '국악기' },
      { id: 39, name: '드럼' },
      { id: 40, name: '이색 악기' },
      { id: 41, name: 'guitar' }
    ]
  },
  {
    id: 9,
    name: '기타',
    imgUrl: '/assets/icons/category/etc.svg',
    options: []
  }
]

export default function Category({ classInfo, valid, checkValid, onChange }: IProps) {
  const [selectedOptionList, setSelectedOptionList] = useState([])
  const [option, setOption] = useState('')

  const [category, setCategory] = useState({
    id: 0,
    name: '',
    subId: 0,
    subName: ''
  })

  const handleGroupChange = (groupId: number, groupName: string, optionList: any) => {
    setCategory(prev => ({ ...prev, id: groupId, name: groupName }))
    setSelectedOptionList(optionList)
  }
  const handleOptionChange = (optionId: number, optionName: string) => {
    setCategory(prev => ({ ...prev, subId: optionId, subName: optionName }))
    onChange({ ['category']: category })
  }

  const renderOptionsList = () => {
    return (
      <>
        {category.id === 0 ? (
          <div className="flex flex-col gap-2">
            <p className={`${valid ? '' : 'text-[#EF5D5D]'} gray-800-semibold`}>기타</p>

            <input
              className={`${option.length > 0 ? 'bg-gray-50' : 'bg-white'} w-full h-auto input-line-gray`}
              placeholder={'직접 입력'}
              value={option}
              onChange={e => {
                setOption(e.target.value)
                handleOptionChange(0, option)
              }}
              maxLength={10}
            />

            <span className="text-gray-500 text-sm font-normal font-['Inter'] text-right">
              {option.length}/{10}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-4 w-full gap-2">
            {selectedOptionList.map((option: subCategory) => (
              <div
                key={option.id}
                className={`relative flex justify-center items-center w-[142px] h-[45px] p-3 rounded-md border border-indigo-400 ${
                  category.subId === option.id ? 'bg-[#F0EFFF]' : 'bg-white cursor-pointer'
                }`}
                onClick={() => {
                  handleOptionChange(option.id, option.name)
                }}
              >
                <>
                  {category.subId === option.id && <CheckIcon className="absolute top-1 right-1" />}

                  <input type="radio" id={String(option.id)} value={option.name} className="hidden" />
                  <label
                    htmlFor={String(option.id)}
                    className={`text-base font-medium leading-normal text-primary-600 cursor-pointer`}
                  >
                    {option.name}
                  </label>
                </>
              </div>
            ))}
          </div>
        )}
      </>
    )
  }

  useEffect(() => {
    onChange({ ['category']: category })
  }, [option])

  useEffect(() => {
    setCategory({ ...classInfo.category })
  }, [classInfo])

  console.log(classInfo.category)
  console.log(category)

  return (
    <div>
      <p className={`${valid ? '' : 'text-[#EF5D5D]'} gray-800-semibold`}>카테고리</p>
      {/* 대분류 소분류 박스 */}
      <div className="flex flex-col gap-6 mt-2">
        <div className="grid grid-cols-3 w-full gap-2">
          {categorydata.map((item: category) => (
            <div
              key={item.id}
              className={`relative flex flex-col gap-[6px] justify-center items-center h-[110px] py-4 rounded-md border border-primary-500 ${
                category.id === item.id ? 'bg-[#F0EFFF]' : 'bg-white cursor-pointer'
              }`}
              onClick={() => handleGroupChange(item.id, item.name, item.options)}
            >
              {category.id === item.id && <CheckIcon className="absolute top-1 right-1" />}
              <div
                className={`w-12 h-12 rounded-[50px] flex justify-center items-center ${
                  category.id === item.id ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <Image src={item.imgUrl} alt={item.name} width={30} height={30} />
              </div>

              <input type="radio" id={String(item.id)} value={item.id} className={`hidden`} />
              <label
                htmlFor={String(item.id)}
                className={`text-sm font-semibold ${
                  category.id === item.id ? 'text-primary-600' : 'text-gray-500'
                } cursor-pointer`}
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
        {category.id > 0 && renderOptionsList()}
      </div>
    </div>
  )
}
