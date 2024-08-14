'use client'
import { useState, useRef, useEffect } from 'react'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import { classType } from '../modal/StudentAddClassModal'

import ChevronDownIcon from 'public/assets/icons/chevron/chevron_down_gray.svg'
import ChevronUpIcon from 'public/assets/icons/chevron/chevron_up_gray.svg'

interface categoryProps {
  id: number
  name: string
  parentId?: number
}

interface IProps {
  title: string
  list: any[]
  handleChangeParentsOpenTimeData?: (data: { time: string }) => void
  handleChangeParentsCloseTimeData?: (data: { time: string }) => void
  handleChangeParentsDropdownData?: (data: string) => void
  handleChangeParentsClassDropdownData?: (data: classType) => void
  handleChangeParentsCategoryData?: (data: any, type: string) => void
  handleChangeParentsDropdownDataCheckbox?: (data: string) => void
  type: string
}

export default function DropDown(props: IProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const propsFunction = (item: any) => {
    if (props.type === 'open' && props.handleChangeParentsOpenTimeData) {
      props.handleChangeParentsOpenTimeData({
        time: item
      })
    } else if (props.type === 'close' && props.handleChangeParentsCloseTimeData) {
      props.handleChangeParentsCloseTimeData({
        time: item
      })
    } else if (props.type === 'dropdown' && props.handleChangeParentsDropdownData) {
      props.handleChangeParentsDropdownData(item)
    } else if (props.type === 'class' && props.handleChangeParentsClassDropdownData) {
      props.handleChangeParentsClassDropdownData(item)
    } else if (props.type === 'category' && props.title === '대분류 선택' && props.handleChangeParentsCategoryData) {
      props.handleChangeParentsCategoryData(
        {
          title: item.name,
          id: item.id
        },
        'main'
      )
    } else if (props.type === 'category' && props.title === '소분류 선택' && props.handleChangeParentsCategoryData) {
      props.handleChangeParentsCategoryData(
        {
          title: item.name,
          id: item.id
        },
        'sub'
      )
    }
  }
  const [isClickDropDown, setIsClickDropDown] = useState(false)
  const [clickedItemTitle, setClickedItemTitle] = useState<string>(props.title)
  const [clickedItem, setClickedItem] = useState<any>(props.title)
  const [checked, setChecked] = useState<string[]>([])

  const returnCheckedDay: () => string = () => {
    const dayList = ['월', '화', '수', '목', '금', '토', '일']
    if (checked.length === 0) {
      return ''
    }
    let result: string = ''
    const sortedChecked = checked.sort((a, b) => dayList.indexOf(a) - dayList.indexOf(b))
    for (var i = 0; i < sortedChecked.length; i++) {
      if (i !== 0) {
        result += ',' + sortedChecked[i]
      } else {
        result += sortedChecked[i]
      }
    }
    return result + '  반복'
  }

  const handleClickDropDown = (type: string) => {
    setIsClickDropDown(prev => !prev)
    if (props.type === 'checkbox' && props.handleChangeParentsDropdownDataCheckbox) {
      props.handleChangeParentsDropdownDataCheckbox(returnCheckedDay())
    }
  }

  const handleClickOutsideOfDropdown = (e: any) => {
    if (isClickDropDown && !dropdownRef.current?.contains(e.target)) {
      setIsClickDropDown(false)
      if (props.type === 'checkbox' && props.handleChangeParentsDropdownDataCheckbox) {
        props.handleChangeParentsDropdownDataCheckbox(returnCheckedDay())
      }
    }
  }

  useOnClickOutside(dropdownRef, handleClickOutsideOfDropdown)

  return (
    <div ref={dropdownRef} className="flex-1 relative">
      <div className="relative w-full flex items-center">
        <button
          type="button"
          onClick={() => handleClickDropDown(props.type)}
          className={`w-full px-4 py-3.5 h-[52px] border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50`}
        >
          <div
            className={`h-[18px] ${
              props.list.includes(clickedItemTitle) ? 'gray-900-normal' : 'gray-500-normal'
            } text-sm text-left`}
          >
            {props.type !== 'checkbox' && clickedItemTitle}
            {props.type === 'checkbox' && (checked.length === 0 ? clickedItemTitle : returnCheckedDay())}
          </div>
        </button>
        {isClickDropDown ? (
          <ChevronUpIcon className="absolute right-4" width={16} height={16} />
        ) : (
          <ChevronDownIcon className="absolute right-4" width={16} height={16} />
        )}
      </div>
      {isClickDropDown && (
        <div
          className={`absolute z-10 top-full w-full max-h-[174px] border rounded-lg border-gray-200 bg-white overflow-y-scroll`}
        >
          {props.type !== 'category' &&
            props.type !== 'checkbox' &&
            props.type !== 'class' &&
            props.list.map((item: string, i: number) => {
              return (
                <div
                  key={i}
                  className={`flex h-[42px] px-3 py-2.5 items-center rounded-lg hover:bg-purple-100 cursor-pointer`}
                  title={item}
                  onClick={() => {
                    propsFunction(item)
                    setClickedItemTitle(item)
                    setIsClickDropDown(false)
                  }}
                >
                  <div id="box" className="w-full gray-900-normal text-base">
                    {item}
                  </div>
                </div>
              )
            })}
          {props.type === 'class' &&
            props.list.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`flex h-[42px] px-3 py-2.5 items-center rounded-lg hover:bg-purple-100 cursor-pointer`}
                  title={item.name}
                  onClick={() => {
                    propsFunction(item)
                    setClickedItem(item)
                    setClickedItemTitle(item.name)
                    setIsClickDropDown(false)
                  }}
                >
                  <div id="box" className="w-full gray-900-normal text-base">
                    {item.name}
                  </div>
                </div>
              )
            })}
          {props.type === 'category' &&
            props.list.map((item: categoryProps, i: number) => {
              return (
                <div
                  key={i}
                  className={`flex h-[42px] px-3 py-2.5 items-center rounded-lg hover:bg-purple-100 cursor-pointer`}
                  title={item.name}
                  onClick={() => {
                    propsFunction(item)
                    setClickedItem(item)
                    setClickedItemTitle(item.name)
                    setIsClickDropDown(false)
                  }}
                >
                  <div id="box" className="w-full gray-900-normal text-base">
                    {item.name}
                  </div>
                </div>
              )
            })}
          {props.type === 'checkbox' &&
            props.list.map((item: string, i: number) => {
              return (
                <div key={i} className="flex w-full h-[42px] px-3 py-2.5 items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-[14px] h-[14px] cursor-pointer focus:ring-offset-0 focus:ring-0"
                    id={item}
                    checked={checked.includes(item) && true}
                    onClick={e => {
                      if (!checked.includes(item) && e.currentTarget.checked) {
                        setChecked(prev => [...prev, item])
                      }
                      if (checked.includes(item)) {
                        setChecked(checked.filter((day, i) => day !== item))
                      }
                    }}
                  />
                  <label className="w-full gray-900-normal text-base cursor-pointer" htmlFor={item}>
                    {item}
                  </label>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
