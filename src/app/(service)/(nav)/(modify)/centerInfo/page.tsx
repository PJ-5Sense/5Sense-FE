'use client'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import DropDown from '@/components/common/DropDown'
import { centerDataType } from '@/app/(center)/mycenter/register/page'
import { centerInfoState } from '@/lib/state/centerInfoState'
import instance from '@/lib/api/axios'
import Modal from '@/components/common/modal'
import { modalState } from '@/lib/state/modal'
import SnsConnection from '@/components/modal/SnsConnection'

import ProfileIcon from '@/icons/icon/defaultProfile.svg'
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
  const centerInfo = useRecoilValue(centerInfoState)
  const setCenterInfo = useSetRecoilState(centerInfoState)
  const [patchData, setPatchData] = useState({
    name: '',
    address: '',
    mainPhone: '',
    open: '',
    close: '',
    profile: ''
  })
  const [snsLink, setSnsLink] = useState<snsLinkType>({
    kakao: typeof window !== undefined && localStorage.getItem('social') === 'kakao' ? true : false,
    naver: typeof window !== undefined && localStorage.getItem('social') === 'naver' ? true : false,
    google: typeof window !== undefined && localStorage.getItem('social') === 'google' ? true : false
  })
  const [snsModal, setSnsModal] = useState<boolean>(false)
  const [toggleStatus, setToggleStatus] = useState<boolean>(false)
  const [imgFile, setImgFile] = useState<File>()
  const modal = useRecoilValue(modalState)
  const setModal = useSetRecoilState(modalState)

  const onClickAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        setPatchData(prev => ({
          ...prev,
          address: data.address
        }))
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
    setPatchData(prev => ({
      ...prev,
      [type]: e.target.value
    }))
  }

  const handleChangeDropwdownFromChild = (data: { time: string }) => {
    setPatchData(prev => ({
      ...prev,
      open: data.time
    }))
  }

  const handleChangeCloseTimeFromChild = (data: { time: string }) => {
    setPatchData(prev => ({
      ...prev,
      close: data.time
    }))
  }

  const checkDiff = () => {
    let data: any = {}
    if (patchData.name !== centerInfo.name) {
      data.name = patchData.name
    }
    if (patchData.address !== centerInfo.address) {
      data.address = patchData.address
    }
    if (patchData.mainPhone !== centerInfo.mainPhone) {
      data.mainPhone = patchData.mainPhone
    }
    if (patchData.open !== centerInfo.open) {
      data.open = patchData.open
    }
    if (patchData.close !== centerInfo.close) {
      data.close = patchData.close
    }
    if (imgFile) {
      data.profile = imgFile
    }

    return data
  }

  const handleClickPatch = () => {
    instance
      .patch(
        '/api/centers',
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
        console.log(res)
      })
  }

  const checkSnsConnectionNum = () => {
    let value = Object.values(snsLink)
    console.log(value)
    const snsConnectionNum = value.filter(data => data === true)
    return snsConnectionNum.length
  }

  const onCloseSnsModal = () => {
    setSnsModal(false)
  }

  const inputList = [
    {
      title: '센터명',
      name: 'name',
      value: patchData.name,
      placeholder: '센터명을 입력해주세요.'
    },
    {
      title: '주소',
      name: 'address',
      value: patchData.address,
      placeholder: '주소를 입력해주세요.'
    },
    {
      title: '대표번호',
      name: 'mainPhone',
      value: patchData.mainPhone,
      placeholder: '대표번호를 입력해주세요.'
    }
  ]

  useEffect(() => {
    instance('/api/centers/my').then(res => {
      const centerData = res.data.data
      setDropDownProps(prev => ({
        ...prev,
        open: {
          ...prev.open,
          title: centerData.open
        },
        close: {
          ...prev.close,
          title: centerData.close
        }
      }))
      setCenterInfo(prev => ({ ...centerData }))
      setPatchData(prev => ({ ...centerData }))
    })
  }, [])

  return (
    <>
      {patchData.name !== '' && (
        <div className="w-[640px] flex flex-col gap-5 justify-center">
          <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
          <form
            className="w-full px-6 py-8 flex flex-col rounded-xl border border-gray-200 items-start gap-10"
            onSubmit={e => {
              e.preventDefault()
              handleClickPatch()
            }}
          >
            <div className="gray-900-bold text-xl h-5 leading-5">센터 정보</div>
            <div className="w-full flex flex-col items-center gap-10">
              <div className="w-[140px] h-[156px] flex flex-col items-center gap-[-18px]">
                <div className="w-[140px] h-[140px] ">
                  <Image src={patchData.profile} className="rounded-full" width={140} height={140} alt="profile" />
                </div>
                <div className="bg-white w-[70px] h-[34px] pl-2.5 pr-3 py-2 flex justify-center rounded-lg border border-primary-600">
                  <input
                    id="file"
                    type="file"
                    className="w-0 h-0"
                    onChange={e => {
                      if (e.target.files) {
                        let file = e.target.files[0]
                        let img = URL.createObjectURL(file)
                        setPatchData(prev => ({
                          ...prev,
                          profile: img
                        }))
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
                {inputList.map((data, i) => {
                  return (
                    <div className="w-full flex flex-col gap-2" key={i}>
                      <span className="text-base gray-800-semibold">{data.title}</span>
                      <input
                        name={data.name}
                        value={data.value}
                        onChange={e => {
                          onChangeHandler(e)
                        }}
                        className="w-full h-[52px] px-4 border rounded-lg border-gray-200 focus:outline-none focus:border-primary-700 focus:bg-gray-50"
                        placeholder={data.placeholder}
                      />
                    </div>
                  )
                })}
                <div className="w-full flex flex-col gap-2">
                  <span className="text-base gray-800-semibold">영업시간</span>
                  <div className="flex gap-3">
                    <div className="w-full flex gap-2 items-center">
                      <DropDown
                        {...dropDownProps.open}
                        handleChangeParentsOpenTimeData={handleChangeDropwdownFromChild}
                        type="open"
                      />
                      <span className="text-[14px] gray-800-normal">부터</span>
                    </div>
                    <div className="w-full flex gap-2 items-center">
                      <DropDown
                        {...dropDownProps.close}
                        handleChangeParentsCloseTimeData={handleChangeCloseTimeFromChild}
                        type="close"
                      />
                      <span className="text-[14px] gray-800-normal">까지</span>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full h-[52px] btn-purple">
                수정하기
              </button>
            </div>
          </form>
          {/* 계정 연결 */}
          <div className="w-full px-6 py-8 flex flex-col gap-10 border rounded-xl border-gray-200">
            <div className="gray-900-bold text-xl ">SNS 연결 설정</div>
            <div className="w-full flex flex-col gap-[14px]">
              <div
                className={`relative w-full h-16 flex items-center ${
                  snsLink.kakao ? 'bg-[#FFE812]' : 'border border-1 border-[#FFE812]'
                } rounded-md `}
              >
                <KakaoIcon className="absolute left-2" width={48} height={48} alt="" />
                <div className="absolute left-[68px] text-stone-800 text-base font-semibold ">카카오 계정 연결</div>
                <div className="absolute left-[200px] text-stone-800 text-sm font-medium ">2024.01.07</div>
                {snsLink.kakao ? (
                  <ToggleOn
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    hiught={24}
                    onClick={() => {
                      setModal(true)
                      setSnsModal(true)
                      setToggleStatus(false)
                      if (checkSnsConnectionNum() > 1) {
                        setSnsLink(prev => ({
                          ...prev,
                          kakao: false
                        }))
                      } else {
                        return
                      }
                    }}
                  />
                ) : (
                  <ToggleOff
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    hiught={24}
                    onClick={() => {
                      setModal(true)
                      setSnsModal(true)
                      setToggleStatus(true)
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
                      setModal(true)
                      setSnsModal(true)
                      setToggleStatus(false)
                      if (checkSnsConnectionNum() > 1) {
                        setSnsLink(prev => ({
                          ...prev,
                          naver: false
                        }))
                      } else {
                        return
                      }
                    }}
                  />
                ) : (
                  <ToggleOff
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    heught={24}
                    onClick={() => {
                      setModal(true)
                      setSnsModal(true)
                      setToggleStatus(true)
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
                <div className="absolute left-[68px] text-stone-800 text-base font-semibold ">구글 계정 연결</div>
                <div className="absolute left-[200px] text-stone-800 text-sm font-medium ">2024.01.07</div>
                {snsLink.google ? (
                  <ToggleOn
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    height={24}
                    onClick={() => {
                      setModal(true)
                      setSnsModal(true)
                      setToggleStatus(false)
                      if (checkSnsConnectionNum() > 1) {
                        setSnsLink(prev => ({
                          ...prev,
                          google: false
                        }))
                      } else {
                        return
                      }
                    }}
                  />
                ) : (
                  <ToggleOff
                    className="absolute right-6 cursor-pointer"
                    width={44}
                    height={24}
                    onClick={() => {
                      setToggleStatus(true)
                      setModal(true)
                      setSnsModal(true)
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
          {/* {modal && snsModal && (
            <Modal small>
              <SnsConnection toggleStatus={toggleStatus} onCloseSnsModal={onCloseSnsModal} />
            </Modal>
          )} */}
        </div>
      )}
    </>
  )
}
