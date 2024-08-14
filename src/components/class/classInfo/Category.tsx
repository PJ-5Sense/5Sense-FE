import { ReactElement, useEffect, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

import { classDataType } from '@/app/(service)/(nav)/class/register/page'

import IconArt from '@/icons/icon/category/arts.svg'
import IconCheck from '@/icons/icon/category/check.svg'
import IconDance from '@/icons/icon/category/dance.svg'
import IconEtc from '@/icons/icon/category/etc.svg'
import IconPerformance from '@/icons/icon/category/performance.svg'
import IconPlay from '@/icons/icon/category/play.svg'
import IconProduce from '@/icons/icon/category/produce.svg'
import IconShow from '@/icons/icon/category/show.svg'
import IconSports from '@/icons/icon/category/sports.svg'
import IconVocal from '@/icons/icon/category/vocal.svg'

export type category = {
  id: number
  name: string
  imgUrl: ReactElement
  options: subCategory[]
}

type subCategory = {
  id: number
  name: string
}
const categorydata: category[] = [
  {
    id: 1,
    name: '미술',
    imgUrl: <IconArt width={30} height={30} />,
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
    imgUrl: <IconShow width={30} height={30} />,
    options: []
  },
  {
    id: 3,
    name: '공연',
    imgUrl: <IconPerformance width={30} height={30} />,
    options: []
  },
  {
    id: 4,
    name: '체육',
    imgUrl: <IconSports width={30} height={30} />,
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
    imgUrl: <IconDance width={30} height={30} />,
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
    imgUrl: <IconVocal width={30} height={30} />,
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
    imgUrl: <IconProduce width={30} height={30} />,
    options: [
      { id: 33, name: '프로듀싱' },
      { id: 34, name: '작곡·작사' },
      { id: 35, name: '디제잉악기' }
    ]
  },
  {
    id: 8,
    name: '연주',
    imgUrl: <IconPlay width={30} height={30} />,
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
    imgUrl: <IconEtc width={30} height={30} />,
    options: []
  }
]

export default function Category({
  register,
  getValues,
  setValue,
  watch,
  resetField,
  control,
  formState: { errors }
}: UseFormReturn<classDataType, any, undefined>) {
  const [selectedOptionList, setSelectedOptionList] = useState<subCategory[]>([])

  const handleGroupChange = (groupId: number, groupName: string, optionList: subCategory[]) => {
    setValue('category.id', groupId)
    setValue('category.name', groupName)

    resetField('category.subId')

    setSelectedOptionList(optionList)
  }
  const handleOptionChange = (optionId: number, optionName: string) => {
    setValue('category.subId', optionId)
    setValue('category.subName', optionName)
  }

  const hasSubCatogory = () => {
    const result = categorydata.filter(data => data.options.length > 0).map(data => data.id)

    const currentCategoryId = watch('category.id')
    if (currentCategoryId) {
      return result.includes(currentCategoryId)
    }
  }

  useEffect(() => {
    const id = Number(getValues('category.id'))
    setSelectedOptionList(categorydata[id - 1]?.options)
  }, [getValues('category.id')])

  const renderOptionsList = ({ id }: { id: number | undefined }) => {
    console.log('id', id)

    return (
      <>
        {id === 9 ? (
          <div className="flex flex-col gap-2">
            <p
              className={`${errors.category?.subName != null ? 'text-red-500' : 'text-gray-800'} text-base font-semibold leading-normal`}
            >
              기타
            </p>

            <input
              className={`w-full h-auto input-line-gray`}
              placeholder={'직접 입력'}
              {...register('category.subName', { required: watch('category.id') === 9 })}
              maxLength={10}
            />

            <span className="text-gray-500 text-sm font-normal font-['Inter'] text-right">
              {watch('category.subName')?.length}/{10}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-4 w-full gap-2">
            {selectedOptionList?.map((option: subCategory) => (
              <Controller
                key={option.id}
                name="category.subId"
                control={control}
                rules={{ required: hasSubCatogory() ? 'true' : 'false' }}
                render={({ field }) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionChange(option.id, option.name)}
                    className={`relative flex justify-center items-center w-[142px] h-[45px] p-3 rounded-md border border-indigo-400 ${
                      field.value === option.id ? 'bg-[#F0EFFF]' : 'bg-white cursor-pointer'
                    }`}
                  >
                    <input required type="radio" id={option.name} value={option.name} className="hidden" />
                    <label
                      htmlFor={option.name}
                      className={`text-base font-medium leading-normal text-primary-600 cursor-pointer`}
                    >
                      {option.name}
                    </label>
                  </div>
                )}
              />
            ))}
          </div>
        )}
      </>
    )
  }

  return (
    <div>
      <p
        className={`${errors.category?.id || errors.category?.subId ? 'text-red-500' : 'text-gray-800'} text-base font-semibold leading-normal`}
      >
        카테고리
      </p>
      {/* 대분류 소분류 박스 */}
      <div className="flex flex-col gap-6 mt-2">
        <div className="grid grid-cols-3 w-full gap-2">
          {categorydata.map(item => {
            const active = watch('category.id') === item.id
            return (
              <div key={item.id}>
                <Controller
                  name="category.id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        id={String(item.id)}
                        value={item.id}
                        className="hidden"
                        checked={field.value === item.id}
                        onChange={e => field.onChange(e.target.value)}
                      />
                      <label
                        htmlFor={String(item.id)}
                        className={`relative flex flex-col gap-[6px] justify-center items-center h-[110px] py-4 rounded-md border border-primary-500 cursor-pointer ${
                          active ? 'bg-[#F0EFFF]' : 'bg-white '
                        }`}
                        onClick={() => {
                          handleGroupChange(item.id, item.name, item.options)
                        }}
                      >
                        {active && <IconCheck className="absolute top-1 right-1" />}
                        <div
                          className={`w-12 h-12 rounded-[50px] flex justify-center items-center ${
                            active ? 'bg-white text-primary-600' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {item.imgUrl}
                        </div>

                        <input type="radio" id={String(item.id)} value={item.id} className="hidden" />
                        <span className={`text-sm font-semibold ${active ? 'text-primary-600' : 'text-gray-500'}`}>
                          {item.name}
                        </span>
                      </label>
                    </>
                  )}
                />
              </div>
            )
          })}
        </div>
        {watch('category.id') && renderOptionsList({ id: getValues('category.id') })}
      </div>
    </div>
  )
}
