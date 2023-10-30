"use client"
import Image from "next/image"
import searchIcon from '../../assets/icon/search.svg'
import x_icon from '../../assets/icon/x_icon.svg';
import userIcon from '../../assets/icon/userIcon.svg';
import vecterIcon from '../../assets/icon/vectorIcon.svg';
import plusIcon from '../../assets/icon/plusIcon.svg';
import { useState } from 'react'

export default function TeacherInfo() {

    let [teacherName, setTeacherName] = useState<string>('');
    
    function emptyInput() {
        setTeacherName('');
    } 

    const teacherList: {name: string}[] = [
        {name: '정은담'},
        {name: '엄세리'},
        {name: '윤태식'},
        {name: '조영은'},
        {name: '조성훈'},
    ]

    return (
        <div className="flex flex-col items-start gap-10 w-[640px] h-[162px] py-8 px-6 border border-[#E5E7EB] rounded-xl bg-[#FFF] ">
            <div className="font-bold text-[20px] leading-5 text-[#111928]">강사 정보</div>
            <div className="flex flex-start flex-col w-[100%] h-[auto] px-4 py-[14px] justify-center border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg focus-within:border-[#7354E8]">
                <div className="flex w-[100%] items-center gap-2">
                    <Image src={searchIcon} width={18} height={18} alt="search" />
                    <input list="teacherName" className="w-[100%] text-[16px] text-[#111928] font-normal leading-6 outline-none" placeholder="강사 이름을 입력해주세요" value={teacherName} onChange={(e) => {
                        setTeacherName(e.target.value);
                    }} />
                    {teacherName !== '' ? <Image src={x_icon} width={16} height={16} alt='X' onClick={emptyInput} /> : null}
                </div>
            </div>
            <div className=" flex flex-col w-[100%] h-[auto] p-4 border rounded-lg items-center gap-3 bg-[#FFF] border-[#E5E7EB] shadow-[0px_1px_2px_0px_rgba(0, 0, 0, 0.08)]">
                <div className="w-[100%] text-[14px] font-semibold">강사 이름</div>
                
                <div className="flex w-[100%] h-[auto] pt-3 border-t border-t-[#E5E7EB] gap-3">
                    <Image src={plusIcon} width={14} height={15} alt="" />
                    <div className="text-[14px] text-[#7354E8] font-semibold">강사 추가</div>
                </div>
            </div>
        </div>
    )
}