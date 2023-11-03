"use client"
import Image from "next/image"
import searchIcon from '../../assets/icon/search.svg'
import x_icon from '../../assets/icon/x_icon.svg';
import userIcon from '../../assets/icon/userIcon.svg';
import vecterIcon from '../../assets/icon/vectorIcon.svg';
import plusIcon from '../../assets/icon/plusIcon.svg';
import x_circle from '../../assets/icon/x_circle.svg';
import closeIcon from '../../assets/icon/closeIcon.svg';
import { useEffect, useState, useRef } from 'react'

export default function TeacherInfo() {


    let [teacherName, setTeacherName] = useState<string>('');
    let [checkInclude, setCheckInclude] = useState<boolean>(false);
    let [addTeacher, setAddTeacher] = useState<boolean>(false);
    let [newTeacherName, setNewTeacherName] = useState<string>('');
    let [newTeacherPhoneNum, setNewTEacherPhoneNum] = useState<string>('');
    let [openTeacherList, setOpenTeacherList] = useState<boolean>(false);
    let [nameValue, setNameValue] = useState<string>('');

    function clickInput() {
        setOpenTeacherList(prev => !prev);
    }

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

    useEffect(() => {
        document.addEventListener('click', function(e: any) {
            if(openTeacherList && e.target.id !== 'teacherName') {
                setOpenTeacherList(false);
            }
        })
    }, [openTeacherList])

    console.log(teacherName);

    return (
        <>
        <div className="flex flex-col items-start gap-10 w-[640px] h-[162px] py-8 px-6 border border-[#E5E7EB] rounded-xl bg-[#FFF] ">
            <div className="font-bold text-[20px] leading-5 text-[#111928]">강사 정보</div>
            <div className="flex flex-start flex-col w-[100%] h-[auto] px-4 py-[14px] justify-center border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg focus-within:border-[#7354E8]">
                <div className="relative flex w-[100%] items-center gap-2">
                    <Image src={searchIcon} width={18} height={18} alt="search" /> 
                    <input id="teacherName" className="w-[100%] text-[16px] text-[#111928] font-normal leading-6 outline-none" placeholder="강사 이름을 입력해주세요" value={teacherName} 
                    onFocus={clickInput}
                    onChange={(e) => {
                        setTeacherName(e.target.value);
                    }} />
                    
                    {teacherName !== '' && teacherName !== nameValue  ? <Image src={x_icon} width={16} height={16} alt='X' onClick={emptyInput} /> : null}
                    {teacherName === nameValue && teacherName !== '' ? <Image className="absolute left-[80px]" src={x_circle} width={20} height={20} alt="" onClick={() => {
                        setTeacherName('');
                        setCheckInclude(prev => !prev);
                        }} /> :  null}
                </div>
            </div>
            {openTeacherList ? 
            <div className=" flex flex-col w-[100%] h-[auto] p-4 border rounded-lg items-center gap-3 bg-[#FFF] border-[#E5E7EB] shadow-[0px_1px_2px_0px_rgba(0, 0, 0, 0.08)]">
                <div className="w-[100%] text-[14px] font-semibold">강사 이름</div>
                {teacherList.map((teacher, index) => {
                    if(teacher.name.includes(teacherName)){
                        return(
                            <div data-teachername={teacher.name} key={index} className="flex w-[100%] px-3 py-2 items-center rounded-lg gap-2 bg-[#F9FAFB] cursor-pointer hover:opacity-70" onClick={e => {
                                const name :any = e.currentTarget.getAttribute("data-teachername");
                                setTeacherName(name);
                                setCheckInclude(prev => !prev);
                                setNameValue(teacher.name);
                                clickInput();
                                }} >
                                <Image src={userIcon} width={14} height={15} alt="" />
                                <div id="name" className="w-[100%] text-[14px] text-[#6B7280] font-normal">{teacher.name}</div>
                                <Image src={vecterIcon} width={14} height={15} alt="" />
                            </div>
                        )       
                    }
                })}
                <div className="flex w-[100%] h-[auto] pt-3 border-t border-t-[#E5E7EB] gap-3">
                    <Image src={plusIcon} width={14} height={15} alt="" />
                    <div className="text-[14px] text-[#7354E8] font-semibold cursor-pointer" onClick={() => {setAddTeacher(prev => !prev)}}>강사 추가</div>
                </div>
            </div>
            : null}
        </div>
        {addTeacher ? <div className="absolute flex flex-col items-center top-[500px] w-[424px] rounded-xl h-[326px] border border-[#111928] bg-[#FFF]">
            <div className="relative flex flex-col w-[100%] h-[100px]">
                <Image className="absolute top-2 right-2 cursor-pointer hover:opacity-70" src={closeIcon} width={35} height={35} alt="" onClick={() => {setAddTeacher(prev => !prev)}} />
                <div className="absolute left-4 top-[40px] text-[#111928] text-[22px] font-bold cursor-pointer" >강사 등록</div>
            </div>
            <div className="flex flex-col items-center w-[376px] h-[212px] gap-7 ">
                <div className="flex flex-col w-[100%] h-[132px] gap-4">
                    <div className="w-[100%] h-[58px] border rounded-lg border-[#E5E7EB] bg-[#FFF] focus-within:border-[#7354E8]">
                        <input type="text" className="w-[100%] h-[100%] outline-none px-3 py-5 rounded-lg" placeholder="이름" value={newTeacherName} onChange={(e) => {
                            setNewTeacherName(e.target.value);
                        }}/>
                    </div>
                    <div className="w-[100%] h-[58px] border rounded-lg border-[#E5E7EB] bg-[#FFF] focus-within:border-[#7354E8]">
                        <input type="text" className="w-[100%] h-[100%] outline-none px-3 py-5 rounded-lg" placeholder="전화 번호" value={newTeacherPhoneNum} onChange={(e) => {
                            setNewTEacherPhoneNum(e.target.value)
                        }} />
                    </div>
                </div>
                <button className="w-[100%] h-[52px] bg-[#7354E8] rounded-lg text-[#FFF] text-[16px]font-semibold cursor-pointer hover:opacity-70" onClick={() => {
                    setNewTeacherName('');
                    setNewTEacherPhoneNum('');
                    setAddTeacher(prev => !prev);
                    console.log(newTeacherName, newTeacherPhoneNum);
                }}>등록</button>
            </div>
        </div> : null}
        </>
    )
}