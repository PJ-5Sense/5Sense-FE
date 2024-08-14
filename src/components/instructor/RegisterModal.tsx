import instance from '@/lib/api/axios'
import { AxiosResponse } from 'axios'
import { Button } from 'flowbite-react'
import React, { useState } from 'react'

interface postDataType {
  name: string
  phone: string
}

interface IProps {
  onClose: () => void
  onCloseState?: () => void
  onRigister?: () => void
}

export default function RegisterModal({ onClose, onCloseState, onRigister }: IProps) {
  const [postData, setPostData] = useState<postDataType>({
    name: '',
    phone: ''
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, valueName: string) => {
    if (valueName === 'name') {
      setPostData({
        ...postData,
        name: e.target.value
      })
    } else if (valueName === 'phone') {
      setPostData({
        ...postData,
        phone: e.target.value
      })
    }
  }

  const onKeyDownOnlyNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const forbiddenKeys = ['-', 'e', 'ArrowDown', 'ArrowUp']
    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault()
    }
    if (e.currentTarget.value.length === 12 && e.key !== 'Backspace') {
      e.preventDefault()
    }
  }

  const limitLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const max = Number(e.currentTarget.getAttribute('maxlength'))
    if (target.value.length > max) {
      setPostData({
        ...postData,
        name: target.value.slice(0, max)
      })
    }
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const data = postData
        if (postData.name === '' && postData.phone === '') {
          alert('강사정보를 올바르게 입력해주세요.')
          return
        }
        instance.post('/api/teachers', data).then((res: AxiosResponse) => {
          onClose()
          if (onCloseState) {
            onCloseState()
          }
          if (onRigister) {
            onRigister()
          }
        })
      }}
    >
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="이름"
            value={postData.name}
            onChange={e => {
              onChangeHandler(e, 'name')
              limitLength(e)
            }}
            maxLength={20}
            className={`${postData.name.length > 0 ? 'bg-gray-50' : 'bg-white'} w-full h-[58px] input-line-gray`}
          />
          <input
            type="number"
            placeholder="전화번호 (-제외)"
            value={postData.phone}
            onChange={e => {
              onChangeHandler(e, 'phone')
            }}
            onKeyDown={onKeyDownOnlyNum}
            className={`${postData.phone.length > 0 ? 'bg-gray-50' : 'bg-white'} w-full h-[58px] input-line-gray`}
          />
        </div>
        <Button color="primary" fullSized size="lg" type="submit">
          등록
        </Button>
      </div>
    </form>
  )
}
