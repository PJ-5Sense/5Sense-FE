'use client'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import DropDown from '@/components/common/DropDown'
import { centerDataType } from '@/app/myCenter/rigister/page'
import { centerInfoState } from '@/lib/state/centerInfoState'
import instance from '@/lib/api/axios'

import ProfileIcon from 'public/assets/images/defaultProfile.svg'
import CameraIcon from 'public/assets/icons/camera.svg'
import KakaoIcon from 'public/assets/logo/kakaoLogo.svg'
import ToggleOn from 'public/assets/icons/toggle_on.svg'
import ToggleOff from 'public/assets/icons/toggle_off.svg'
import GoogleIcon from 'public/assets/logo/googleLogo.svg'
import NaverIcon from 'public/assets/logo/naverLogo.svg'
import NaverWhite from 'public/assets/logo/naverWhite.svg'

interface snsLinkType {
  kakao: boolean
  naver: boolean
  google: boolean
}

export default function ManageMent() {
  const socialType = localStorage.getItem('social')
  const [postData, setPostData] = useState<centerDataType>({
    name: '',
    address: '',
    mainPhone: '',
    open: '',
    close: '',
    profile: ''
  })
  const [snsLink, setSnsLink] = useState<snsLinkType>({
    kakao: socialType === 'kakao' ? true : false,
    naver: socialType === 'naver' ? true : false,
    google: socialType === 'google' ? true : false
  })
  const [img, setImg] = useState<string | null>()
  const [imgFile, setImgFile] = useState<File>()
  const centerInfo = useRecoilValue(centerInfoState)
  const setCenterInfo = useSetRecoilState(centerInfoState)

  const onClickAddress = () => {
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

  const [dropDownProps, setDropDownProps] = useState({
    open: {
      title: '',
      list: getTimeList()
    },
    close: {
      title: '',
      list: getTimeList()
    }
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.currentTarget.name
    setPostData({
      ...postData,
      [type]: e.target.value
    })
  }

  const handleChangeDropwdownFromChild = (data: { time: string }) => {
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

  const checkDiff = () => {
    let data: any = {}
    if (postData.name !== centerInfo.name) {
      data.name = postData.name
    }
    if (postData.address !== centerInfo.address) {
      data.address = postData.address
    }
    if (postData.mainPhone !== centerInfo.mainPhone) {
      data.mainPhone = postData.mainPhone
    }
    if (postData.open !== centerInfo.open) {
      data.open = postData.open
    }
    if (postData.close !== centerInfo.close) {
      data.close = postData.close
    }
    if (imgFile) {
      data.profile = imgFile
    }

    return data
  }

  const handleClickPatch = () => {
    //console.log(checkDiff())
    /* let formData = new FormData()
      formData.append('profile', imgFile)
      for (const [key, value] of formData.entries()) {
        console.log(key, value)
      } */
    instance
      .patch(
        '/centers',
        { ...checkDiff() },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(res => {
        const modifiedData = res.data.data
        alert('프로필 정보 수정 완료되었습니다')
        setCenterInfo(modifiedData)
        console.log(res)
      })
  }

  useEffect(() => {
    if (centerInfo.name !== '') {
      console.log(centerInfo)
      setDropDownProps(prev => ({
        ...prev,
        open: {
          ...prev.open,
          title: centerInfo.open
        },
        close: {
          ...prev.close,
          title: centerInfo.close
        }
      }))
      setPostData(prev => ({
        ...prev,
        name: centerInfo.name,
        address: centerInfo.address,
        mainPhone: centerInfo.mainPhone,
        open: centerInfo.open,
        close: centerInfo.close,
        profile: centerInfo.profile
      }))
      setImg(centerInfo.profile)
    }
  }, [centerInfo])

  return (
    <>
      {postData.name !== '' && (
        <div className="w-[640px] flex flex-col gap-5 justify-center">
          <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
          <form
            className="w-full px-6 py-8 flex flex-col rounded-xl border border-gray-200 justify-center gap-10"
            onSubmit={e => {
              e.preventDefault()
              handleClickPatch()
            }}
          >
            <div className="gray-900-bold text-xl font-['Pretendard']">센터 정보</div>
            <div className="w-full flex flex-col items-center gap-10">
              <div className="relative w-[140px] flex flex-col items-center">
                {img === null ? (
                  <div className="w-[140px] h-[140px] rounded-full bg-primary-300 flex justify-center items-center">
                    <ProfileIcon className="" width={140} height={140} alt="" />
                  </div>
                ) : (
                  <div className="w-[140px] h-[140px] ">
                    <img src={img} className="rounded-full w-[140px] h-[140px]" alt="" />
                  </div>
                )}

                <div className="absolute left-[35px] top-[124px] bg-white w-[70px] h-[34px] pl-2.5 pr-3 py-2 flex justify-center rounded-lg border border-primary-600">
                  <input
                    id="file"
                    type="file"
                    className="w-0 h-0"
                    onChange={e => {
                      if (e.target.files) {
                        let file = e.target.files[0]
                        let img = URL.createObjectURL(file)
                        setImg(img)
                        setImgFile(file)
                      }
                    }}
                  />
                  <label htmlFor="file" className="w-full flex gap-1 items-center cursor-pointer">
                    <CameraIcon width={16} height={16} alt="" />
                    <div className="indigo-500-semibold text-xs">수정</div>
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <input
                  name="name"
                  value={postData.name}
                  onChange={e => {
                    onChangeHandler(e)
                  }}
                  className="w-full h-[60px] px-4 border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50"
                  placeholder="센터명을 입력해주세요."
                />
                <input
                  name="address"
                  value={postData.address}
                  onChange={e => {
                    onChangeHandler(e)
                  }}
                  onClick={onClickAddress}
                  className="w-full h-[60px] px-4 border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50"
                  placeholder="주소를 입력해주세요"
                />
                <input
                  name="mainPhone"
                  value={postData.mainPhone}
                  onChange={e => {
                    onChangeHandler(e)
                  }}
                  className="w-full h-[60px] px-4 border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50"
                  placeholder="대표번호를 입력해주세요"
                />
                <div className="flex gap-2">
                  <DropDown
                    {...dropDownProps.open}
                    handleChangeParentsOpenTimeData={handleChangeDropwdownFromChild}
                    type="open"
                  />

                  <span className="flex items-center">-</span>
                  <DropDown
                    {...dropDownProps.close}
                    handleChangeParentsCloseTimeData={handleChangeCloseTimeFromChild}
                    type="close"
                  />
                </div>
              </div>
              <button type="submit" className="w-full h-[52px] btn-purple">
                수정하기
              </button>
            </div>
          </form>
          {/* 계정 연결 */}
          <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl font-['Pretendard']">SNS 연결 설정</div>
            <div className="w-full flex flex-col gap-[14px]">
              <div
                className={`relative w-full h-16 flex items-center ${
                  snsLink.kakao ? 'bg-[#FFE812]' : 'border border-1 border-[#FFE812]'
                } rounded-md `}
              >
                <KakaoIcon className="absolute left-2" width={48} height={48} alt="" />
                <div className="absolute left-[68px] text-stone-800 text-base font-semibold font-['Pretendard']">
                  카카오 계정 연결
                </div>
                <div className="absolute left-[200px] text-stone-800 text-sm font-medium font-['Pretendard']">
                  2024.01.07
                </div>
                {snsLink.kakao ? (
                  <ToggleOn
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    hiught={24}
                    onClick={() => {
                      setSnsLink(prev => ({
                        ...prev,
                        kakao: false
                      }))
                    }}
                  />
                ) : (
                  <ToggleOff
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    hiught={24}
                    onClick={() => {
                      setSnsLink(prev => ({
                        ...prev,
                        kakao: true
                      }))
                    }}
                  />
                )}
              </div>
              <div
                className={`relative w-full h-16 flex items-center ${
                  snsLink.naver ? 'bg-[#2BB500]' : 'border border-[#2BB500]'
                }  rounded-md `}
              >
                {snsLink.naver ? (
                  <NaverWhite className="absolute left-2" width={48} height={48} alt="" />
                ) : (
                  <NaverIcon className="absolute left-2" width={48} height={48} alt="" />
                )}

                <div
                  className={`absolute left-[68px] ${
                    snsLink.naver ? 'text-white' : 'text-[#2BB500]'
                  }  text-base font-semibold`}
                >
                  네이버 계정 연결
                </div>
                <div
                  className={`absolute left-[200px] ${
                    snsLink.naver ? 'text-white' : 'text-stone-800'
                  } text-sm font-medium`}
                >
                  2024.01.07
                </div>
                {snsLink.naver ? (
                  <ToggleOn
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    heught={24}
                    onClick={() => {
                      setSnsLink(prev => ({
                        ...prev,
                        naver: false
                      }))
                    }}
                  />
                ) : (
                  <ToggleOff
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    heught={24}
                    onClick={() => {
                      setSnsLink(prev => ({
                        ...prev,
                        naver: true
                      }))
                    }}
                  />
                )}
              </div>
              <div className="relative w-full h-16 flex items-center border border-gray-600 rounded-md ">
                <GoogleIcon className="absolute left-2 p-[15px]" width={48} height={48} alt="" />
                <div className="absolute left-[68px] text-stone-800 text-base font-semibold font-['Pretendard']">
                  구글 계정 연결
                </div>
                <div className="absolute left-[200px] text-stone-800 text-sm font-medium font-['Pretendard']">
                  2024.01.07
                </div>
                {snsLink.google ? (
                  <ToggleOn
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    height={24}
                    onClick={() => {
                      setSnsLink(prev => ({
                        ...prev,
                        google: false
                      }))
                    }}
                  />
                ) : (
                  <ToggleOff
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    height={24}
                    onClick={() => {
                      setSnsLink(prev => ({
                        ...prev,
                        google: true
                      }))
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
