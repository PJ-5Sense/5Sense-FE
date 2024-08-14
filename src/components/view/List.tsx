'use client'
import { useState } from 'react'

interface IProps {
  type: string
  id: string
  name: string
  lessons: any[]
  phone: string
  particulars?: string
  onClick?: () => void
}

export default function List(props: IProps) {
  console.log(props)
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <button
      key={props.id}
      className="w-full flex lg:gap-10 gap-8 lg:p-7 p-6 outline rounded-md outline-1 outline-gray-200 shadow-[0_5px_15px_0px_rgba(0,0,0,0.02)] hover:outline-primary-600"
      onClick={() => {
        if (props.onClick) {
          props.onClick()
        } else {
          return
        }
      }}
    >
      <div className="flex items-center lg:gap-6 gap-4 flex-1">
        <div className="w-[100px] gray-800-semibold text-sm text-left">{props.name}</div>
        <div className="lg:w-[160px] w-[130px] gray-800-semibold text-sm text-left">
          {props.phone.slice(0, 3)}-{props.phone.slice(3, 7)}-{props.phone.slice(7, 11)}
        </div>
        <div className="flex-1 flex-col gap-1/2 min-w-[100px] text-left">
          {props.lessons.length !== 0 &&
            props.lessons.map((data, i) => {
              return (
                <>
                  <div
                    key={i}
                    className={`${
                      data.type === 'duration' ? 'text-primary-600' : 'text-secondary-600'
                    } text-base font-bold`}
                  >
                    {data.type === 'duration' ? '기간반' : '회차반'}
                  </div>
                  <div className="gray-800-semibold text-base">{data.name}</div>
                </>
              )
            })}
        </div>
        <div
          className={`xl:w-[400px] w-[200px] text-ellipsis overflow-hidden hover:overflow-visible gray-900-normal text-base text-left`}
        >
          {props.particulars}
        </div>
      </div>
    </button>
  )
}
