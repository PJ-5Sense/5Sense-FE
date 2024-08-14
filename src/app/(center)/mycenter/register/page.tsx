'use client'
import Script from 'next/script'
import React, { useRef, useState } from 'react'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import { useRouter } from 'next/navigation'
import instance from '@/lib/api/axios'
import DropDown from '@/components/common/DropDown'
import { Button } from 'flowbite-react'
import LoginHeader from '@/components/login/LoginHeader'
import TextInput from '@/components/common/TextInput'
import InputForm from '@/components/common/InputForm'

declare global {
  interface Window {
    daum: any
  }
}

interface IAddr {
  address: string
  zonecode: string
}

export interface centerDataType {
  name: string
  address: string
  mainPhone: string
  open: string
  close: string
  profile?: string
}

export default function MyCenter() {
  const router = useRouter()
  const centerNameInputRef = useRef<HTMLInputElement>(null)
  const addressNameInputRef = useRef<HTMLInputElement>(null)
  const phoneNumInputRef = useRef<HTMLInputElement>(null)

  const [postData, setPostData] = useState<centerDataType>({
    name: '',
    address: '',
    mainPhone: '',
    open: '',
    close: ''
  })

  const onClickAdd = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        setPostData({
          ...postData,
          address: data.address
        })
      }
    }).open()
  }

  /* 전화번호 입력 -> '-' &  number type 아닌 것들 입력 방지*/
  const allowOnlyNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const forbiddenKeys = ['-', 'e']
    if (
      forbiddenKeys.includes(e.key) ||
      e.currentTarget.value.length > 12 ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      (e.currentTarget.value.length === 12 && e.key !== 'Backspace')
    ) {
      e.preventDefault()
    }
  }

  const checkPostableData = (postData: centerDataType) => {
    if (postData.name !== '' && postData.address !== '' && postData.mainPhone.length >= 9) {
      return true
    } else {
      false
    }
  }

  const getTimeList = () => {
    const list = []
    for (var i = 0; i <= 48; i++) {
      let standard = i * 30
      let hour: string | number = Math.floor(standard / 60)
      let min: string | number = standard % 60
      if (hour < 10) {
        hour = `0${hour}`
      }
      if (min === 0) {
        min = `0${min}`
      }
      let time = `${hour}:${min}`
      list.push(time)
    }
    return list
  }

  const handleChangeStartTimeFromChild = (data: { time: string }) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      open: data.time
    }))
  }

  const handleChangeCloseTimeFromChild = (data: { time: string }) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      close: data.time
    }))
  }

  const DropDownProps1 = {
    title: '오픈 시간',
    list: getTimeList()
  }

  const DropDownProps2 = {
    title: '마감 시간',
    list: getTimeList()
  }

  return (
    <div className="w-full">
      <LoginHeader
        title="반갑습니다, 오센스입니다."
        subTitle="오감을 깨우는 클래스 관리, 센스 만점 오센스에서 시작하세요!"
      />
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
      <form
        className="w-full flex flex-col gap-16 mt-16"
        onSubmit={async e => {
          e.preventDefault()
          console.log(postData)
          let hasCenter
          if (typeof window !== undefined && localStorage.getItem('hasCenter') === 'false') {
            hasCenter = false
          } else {
            hasCenter = true
          }
          console.log(hasCenter)
          // Object.entries(postData).forEach(([key, value]) => {
          //   if (key === 'name' && value === '') {
          //     setDanger(danger => ({
          //       ...danger,
          //       name: true
          //     }))
          //   } else if (key === 'address' && value === '') {
          //     setDanger(danger => ({
          //       ...danger,
          //       address: true
          //     }))
          //   } else if (key === 'mainPhone' && value.length < 9) {
          //     setDanger(danger => ({
          //       ...danger,
          //       phone: true
          //     }))
          //   }
          // })

          if (checkPostableData(postData) && !hasCenter) {
            console.log('test')
            instance
              .post('/centers', {
                name: postData.name,
                address: postData.address,
                mainPhone: postData.mainPhone,
                open: postData.open,
                close: postData.close
              })
              .then(() => {
                router.push('/home')
              })
          } else {
            if (hasCenter) {
              alert('한 개 이상의 센터는 등록할 수 없습니다.')
            } else {
              alert('학원 정보를 올바르게 입력해주세요.')
            }
          }
        }}
      >
        <div className="w-full flex flex-col items-center gap-8">
          <div className="w-full text-left gray-900-bold text-xl">내 센터정보를 입력해 주세요</div>
          <div className="w-full flex flex-col items-center gap-4">
            <InputForm
              title="센터명"
              name="name"
              placeholder="20자 이내의 센터명을 입력해 주세요"
              value={postData.name}
              onChange={e => {
                const { name, value } = e.target
                setPostData(prev => ({ ...prev, [name]: value }))
              }}
            />
            <div className={inputBox}>
              <span className={label}>주소</span>
              <input
                type="text"
                name="address"
                placeholder="주소를 입력해 주세요"
                value={postData.address}
                className="text-input"
                onClick={onClickAdd}
              />
            </div>
            <div className={inputBox}>
              <span className={label}>대표 번호</span>
              <input
                type="number"
                placeholder="전화번호 (-제외)"
                onKeyDown={allowOnlyNum}
                value={postData.mainPhone}
                className="text-input"
                onChange={e => setPostData(prev => ({ ...prev, mainPhone: e.target.value }))}
                onWheel={e => e.currentTarget.blur()}
              />
            </div>
            <div className={inputBox}>
              <span className={label}>영업시간</span>
              <div className="w-full flex gap-3">
                <div className="w-full flex gap-2 items-center">
                  <DropDown
                    {...DropDownProps1}
                    handleChangeParentsOpenTimeData={handleChangeStartTimeFromChild}
                    type="open"
                  />
                  <span className="gray-800-normal text-[14px]">부터</span>
                </div>
                <div className="w-full flex gap-2 items-center">
                  <DropDown
                    {...DropDownProps2}
                    handleChangeParentsCloseTimeData={handleChangeCloseTimeFromChild}
                    type="close"
                  />
                  <span className="gray-800-normal text-[14px]">까지</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-[10px]">
          <Button
            fullSized
            color="outline"
            onClick={() => {
              router.push('/home')
            }}
          >
            다음에 하기
          </Button>
          <Button fullSized color="primary" type="submit">
            등록
          </Button>
        </div>
      </form>
    </div>
  )
}

const inputBox = 'w-full flex flex-col gap-2.5'

const label = 'text-gray-800 text-base font-semibold leading-normal'
