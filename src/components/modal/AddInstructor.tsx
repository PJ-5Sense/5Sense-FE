import { Button } from 'flowbite-react'
import { useState } from 'react'
import instance from '@/lib/api/axios'

interface IProps {
  onClose: () => void
}

export default function AddInstructor({ onClose }: IProps) {
  const [instructorInfo, setInstructorInfo] = useState<{ name: string; phone: string }>({
    name: '',
    phone: ''
  })

  const register = () => {
    instance.post('/api/teachers', { ...instructorInfo }).then(() => {
      onClose()
    })
  }

  return (
    <div className="w-full flex flex-col gap-7">
      <div className="w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="이름"
          value={instructorInfo.name}
          onChange={e => {
            setInstructorInfo(prev => ({
              ...prev,
              name: e.target.value
            }))
          }}
          className="h-[58px] px-3 py-5 border border-gray-200 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          placeholder="전화번호 (-제외)"
          value={instructorInfo.phone}
          onChange={e => {
            setInstructorInfo(prev => ({
              ...prev,
              phone: e.target.value
            }))
          }}
          className="h-[58px] px-3 py-5 border border-gray-200 rounded-lg focus:outline-none"
        />
      </div>
      <Button
        onClick={() => {
          if (instructorInfo.name !== '' && instructorInfo.phone !== '') {
            register()
          } else {
            alert('이름과 전화번호를 제대로 입력해주세요.')
          }
        }}
        className="h-[52px]"
        color="primary"
      >
        등록하기
      </Button>
    </div>
  )
}
