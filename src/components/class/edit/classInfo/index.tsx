import { Dispatch, SetStateAction, useState } from 'react'

import InputForm, { InputFormProps } from '@/components/common/InputForm'
//import TextareaForm, { TextareaFormProps } from '@/components/common/TextareaForm'
import Category from './Category'
//import { IClassInfo, IInfoValid } from '@/app/(service)/(nav)/class/edit/session/page'
import CustomInput from '@/components/common/InputForm'

interface IProps {
  classInfo: any
  vaild: any
  checkValid: (vlaue: any) => void
  onChange: (vlaue: any) => void
}

export default function ClassInfo({ classInfo, vaild, checkValid, onChange }: IProps) {
  /* const classMemoProps: TextareaFormProps = {
    title: '클래스 메모',
    placeholder: '클래스관련 메모를 적어주세요',
    name: 'memo',
    maxLength: 300,
    submitData: classInfo.memo,
    onChange: onChange
  } */
  return {
    /* <div className={`${vaild.valid ? '' : 'border-[#EF5D5D]'} class-box`}>
      <div className={`gray-900-bold text-xl`}>클래스 정보</div>
      <div className="info-detail flex flex-col gap-2">
        <CustomInput
          valid={vaild.name}
          checkValid={checkValid}
          label="클래스 명"
          name="name"
          placeholder="클래스명을 입력해 주세요"
          maxLength={20}
          onChange={onChange}
          value={classInfo.name}
        />
        <TextareaForm {...classMemoProps} />
        <Category classInfo={classInfo} valid={vaild.category} onChange={onChange} checkValid={checkValid} />
      </div>
    </div> */
  }
}
