import { useState } from 'react'

import instance from '@/lib/api/axios'

import { metaType } from '@/app/(service)/(nav)/student/page'

import SearchIconWhite from 'public/assets/icons/search_white.svg'

import SearchIconGray from 'public/assets/icons/search.svg'

interface IProps {
  type: string
  passInputData: (data: { value: string; searchBy: string; list: any; meta: metaType }) => void
  paymentStatus?: string
}

export default function SearchInput(props: IProps) {
  const checkNumTypeList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const [inputValue, setInputValue] = useState<string>('')

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleClickSearch = () => {
    if (inputValue === '') {
      alert('검색어를 입력해주세요.')
      return
    }
    let searchBy: string = ''
    if (checkNumTypeList.includes(inputValue[0])) {
      searchBy = 'phone'
    } else {
      searchBy = 'name'
    }
    if (props.type === 'payment') {
      instance(
        `/api/billing-payments?searchBy=${searchBy}&${searchBy}=${inputValue}&PaymentStatus=${props.paymentStatus}`
      ).then(res => {
        const data = res.data.data.billingPayments
        const meta = res.data.data.meta

        props.passInputData({ value: inputValue, searchBy: searchBy, list: data, meta: meta })
      })
    } else {
      instance(`/api/${props.type}?searchBy=${searchBy}&${searchBy}=${inputValue}`).then(res => {
        const data = props.type === 'teachers' ? res.data.data.teachers : res.data.data.students
        const meta = res.data.data.meta

        props.passInputData({ value: inputValue, searchBy: searchBy, list: data, meta: meta })
      })
    }
  }

  const clickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleClickSearch()
    }
  }

  return (
    <div className="flex gap-2.5 lg:w-[377px] lg:h-[42px] w-[326px] h-[37px] mb-5">
      <div className="relative lg:w-[325px] lg:gap-2.5 w-[280px] flex items-center gap-2 xl:px-4 pl-3  lg:py-3 py-2 rounded-lg border border-1 border-gray-300 hover:border-primary-600">
        <SearchIconGray width={16} height={16} alt=" " />
        <input
          className="xl:w-[245px] w-[222px] placeholder:gray-500-normal placeholder:text-sm focus:outline-none"
          placeholder="이름 또는 전화번호를 입력해주세요."
          value={inputValue}
          onChange={handleChangeInput}
          onKeyDown={e => clickEnter(e)}
        />
      </div>
      <div
        className="lg:w-[42px] lg:h-[42px] w-9 h-9 p-2 flex items-center justify-center rounded-lg bg-primary-600 cursor-pointer"
        onClick={() => {
          handleClickSearch()
        }}
      >
        <SearchIconWhite width={20} height={20} alt="" />
      </div>
    </div>
  )
}
