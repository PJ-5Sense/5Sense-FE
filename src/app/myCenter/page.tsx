'use client'
import '../globals.css'
import Image from 'next/image'
import Script from 'next/script'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'

declare global {
  interface Window {
    daum: any
  }
}

interface IAddr {
  address: string
  zonecode: string
}

export default function MyCenter() {
  const phoneNumInputRef = useRef<HTMLInputElement>(null)

  const onClickAdd = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        console.log(data)
        setAddress(data.address + `  (${data.buildingName})`)
      }
    }).open()
  }

  let [address, setAddress] = useState<string>('')
  let [centerName, setCenterName] = useState<string>('')
  let [userNum, setUserNum] = useState<string>('')
  let [inputWarn, setInputWarn] = useState<string>('outline-[#7354E8]')
  let [onFocusCenterInput, setOnFocusCenterInput] = useState<boolean>(false)
  let [onFocusPhoneNumInput, setOnFocusPhoneNumInput] = useState<boolean>(false)

  const handleClickOutside = () => {
    setOnFocusPhoneNumInput(false)
  }

  const handleClickInside = () => {
    setOnFocusPhoneNumInput(true)
    console.log('in')
  }

  useOnClickOutside(phoneNumInputRef, handleClickOutside)

  console.log(userNum)
  /* 전화번호 입력 -> '-' &  number type 아닌 것들 입력 방지*/
  function allowOnlyNum(e: any) {
    console.log(e.key)
    if (isNaN(e.key) && e.key !== 'Backspace') {
      e.preventDefault()
    }
  }

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
      <form
        className="flex flex-col w-[430px] h-[297px] gap-5"
        onSubmit={e => {
          e.preventDefault()
          console.log(centerName)
          console.log(address)
          console.log(userNum)
          if (userNum.length !== 11) {
            alert('번호를 다시 입력해주세요. ex) 010xxxxxxxx')
          }
          /* const options = {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({centerName, address, userNum})
            }

            fetch('url', options)
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            }) */
        }}
      >
        <div className="w-[430px] h-[209px] flex flex-col items-center gap-4">
          <div className="relative w-[430px] h-[60px] flex items-center border rounded-lg border-[#E5E7EB] ">
            <input
              type="text"
              id="floating_outlined"
              value={centerName}
              autoComplete="off"
              className="block px-2.5 pb-2.5 pt-4 w-full h-full text-sm text-gray-900 bg-transparent 
                rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={e => {
                setCenterName(e.target.value)
              }}
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 
                peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 
                peer-focus:-translate-y-4 left-1"
            >
              센터명
            </label>
          </div>
          <div
            className="relative w-[430px] h-[60px]  flex items-center  rounded-lg border border-[#E5E7EB]"
            onClick={onClickAdd}
          >
            <input
              type="text"
              id="floating_outlined"
              value={address}
              autoComplete="off"
              className="block px-2.5 pb-2.5 pt-4 w-full h-full text-sm text-gray-900 bg-transparent 
                rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 
                peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 
                peer-focus:-translate-y-4 left-1"
            >
              주소
            </label>
          </div>
          <div className="relative w-[430px] h-[60px]  flex items-center  rounded-lg border border-[#E5E7EB]">
            <input
              ref={phoneNumInputRef}
              type="text"
              id="floating_outlined"
              autoComplete="off"
              className={`block px-2.5 pb-2.5 pt-4 w-full h-full text-sm text-gray-900 bg-transparent 
                rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                 dark:focus:border-blue-500 focus:outline-none focus:ring-0 ${inputWarn} peer`}
              placeholder=" "
              value={userNum}
              onClick={() => {
                handleClickInside()
              }}
              onKeyDown={allowOnlyNum}
              onChange={e => {
                console.log(e.target.value)
                if (e.target.value.length > 11) {
                  setInputWarn('focus:border-red-600')
                } else {
                  setInputWarn('focus:border-blue-600')
                }
                setUserNum(e.target.value)
              }}
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 
                peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 
                peer-focus:-translate-y-4 left-1"
            >
              대표번호 {!onFocusPhoneNumInput ? '(- 없이 입력해주세요)' : null}
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-[200px] px-6 py-[10px] rounded-lg bg-[#7354E8] text-[#FFF] font-semibold"
          >
            등록
          </button>
        </div>
      </form>
    </>
  )
}
