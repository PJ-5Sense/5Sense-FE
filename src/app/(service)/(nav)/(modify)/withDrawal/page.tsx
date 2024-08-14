'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import DropDown from '@/components/common/DropDown'
import instance from '@/lib/api/axios'

export default function WithDrawal() {
  const router = useRouter()
  const [postData, setPostData] = useState({
    reason: '',
    detail: ''
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = e.target.maxLength
    const value = e.target.value
    if (value.length > maxLength) {
      e.target.value = e.target.value.slice(0, 2000)
    }
    setPostData(prev => ({
      ...prev,
      detail: e.target.value
    }))
  }

  const dropDownList = [
    '다른 서비스가 더 좋아서',
    '사용 빈도가 낮아서',
    '이용이 불편하고 버그가 많아서',
    '개인정보 유출 우려',
    '기타'
  ]

  const dropDownProps = {
    title: '선택해주세요.',
    list: dropDownList
  }

  const handleChangeReasonFromChild = (data: string) => {
    console.log(data)
    setPostData(prev => ({
      ...prev,
      reason: data
    }))
  }
  console.log(postData)
  return (
    <form
      className="w-[640px] px-6 py-8 flex flex-col gap-10 border rounded-xl border-gray-200"
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <div className="gray-900-bold text-xl ">회원 탈퇴</div>
      <div className="w-full p-4 flex flex-col gap-10 rounded-lg bg-primary-50">
        <div className="w-[560px] text-black text-base font-semibold ">탈퇴유의사항</div>
        <div className="w-[560px]">
          <span className="gray-500-normal text-sm ">
            회원 재가입 제한
            <br />
          </span>
          <span className="gray-500-normal text-sm ">
            • 회원탈퇴 후 재가입 시 신규회원으로 가입되며, 탈퇴 전의 회원정보, 주문정보, 마일리지, 쿠폰은 복원되지
            않습니다.
            <br />• 사이트 정책에 따라 최대 30일 동안 회원 재가입이 불가능합니다.
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <div className="w-[592px] gray-800-semibold text-base ">탈퇴 사유 및 개선점</div>
          {/* <DropDown {...dropDownProps} /> */}
          <DropDown {...dropDownProps} handleChangeParentsDropdownData={handleChangeReasonFromChild} type="dropdown" />
        </div>
        {postData.reason === '기타' && (
          <div className="flex flex-col gap-2">
            <textarea
              placeholder="탈퇴 사유 및 개선점을 적어주세요"
              maxLength={2000}
              value={postData.detail}
              onChange={onChangeHandler}
              className="w-full h-[144px] px-4 py-3.5 border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50 resize-none overflow-hidden"
            />
            <div className="w-full text-right gray-500-normal text-sm font-['Inter']">
              {postData.detail.length}/2000
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full h-[52px] btn-purple"
        onClick={() => {
          if (postData.reason !== '') {
            const please = prompt(
              "자본주의의 세상에서 학원 운영을 '무료!'로 관리할 수 있는 편리한 플랫폼 오센스를 그래도 떠나시나요..?? \n (탈퇴하시려면 로그인했던 이메일 또는 번호를 입력해주세요.) "
            )
            if (please) {
              let type: string = ''
              if (please.includes('@')) {
                type = 'email'
              } else {
                type = 'phone'
              }
              const formData = new FormData()
              formData.append(`${type}`, please)
              instance
                .delete(`/api/auth/cancelMembership`, { data: formData })
                .then(res => {
                  console.log(res)
                  localStorage.clear()
                  router.push('/login')
                })
                .catch(err => {
                  const message = err.response.data.message
                  alert(message)
                })
            }
          } else {
            alert('탈퇴 사유를 선택해주세요.')
          }
        }}
      >
        탈퇴하기
      </button>
    </form>
  )
}
