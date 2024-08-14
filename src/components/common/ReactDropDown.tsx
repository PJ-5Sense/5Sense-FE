'use client'
import React, { useState } from 'react'

interface DropDownPropsType {
  title: string
  list: string[]
}

const customTheme = {
  arrowIcon: 'ml-2 h-4 w-4',
  content: 'py-1 focus:outline-none',
  floating: {
    animation: 'transition-opacity',
    arrow: {
      base: 'absolute z-10 h-2 w-2 rotate-45',
      style: {
        dark: 'bg-gray-900 dark:bg-gray-700',
        light: 'bg-white',
        auto: 'bg-white dark:bg-gray-700'
      },
      placement: '-4px'
    },
    base: '',
    content: 'py-1 text-sm text-gray-700 dark:text-gray-200',
    divider: 'my-1 h-px bg-gray-100 dark:bg-gray-600',
    header: 'block py-2 px-4 text-sm text-gray-700 dark:text-gray-200',
    hidden: 'invisible opacity-0',
    item: {
      container: '',
      base: 'flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-500 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
      icon: 'mr-2 h-4 w-4'
    },
    style: {
      dark: 'bg-gray-900 text-white dark:bg-gray-700',
      light: 'border border-gray-200 bg-white text-gray-900',
      auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white'
    },
    target: 'w-fit'
  },
  inlineWrapper: 'flex items-center'
}

function ReactDropDown({ title, list }: DropDownPropsType) {
  const customTheme = {
    inlineWrapper: 'focus:ring-4 focus:outline-none focus:ring-blue-300'
  }

  const focus = () => {
    setFocusBorder(prev => !prev)
  }
  const [focusBorder, setFocusBorder] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>(title)

  const test = document.getElementById(':r0')

  console.log(test)
  return {
    /* <Dropdown
      label="선택해주세요"
      //theme={customTheme}
      className="max-h-[174px] overflow-y-scroll border-primary-600"
      renderTrigger={() => (
        <button
          className={`relative w-full flex items-center h-[52px] px-4 py-3.5 border focus:border-primary-600  hover:bg-gray-50 rounded-lg text-gray-500 cursor-pointer`}
        >
          {selectedItem}
          <Image className="absolute right-4" src={chevronDown} width={16} height={16} alt="cheveon_gray" />
        </button>
      )}
    >
      {list.map((data, i) => {
        return (
          <Dropdown.Item
            onClick={() => {
              setSelectedItem(data)
            }}
            className="rounded-[3px] hover:!bg-purple-100 hover:bg-none "
            key={i}
          >
            {data}
          </Dropdown.Item>
        )
      })}
    </Dropdown> */
  }
}

export default ReactDropDown
