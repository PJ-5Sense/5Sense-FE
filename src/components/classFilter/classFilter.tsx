import Image from "next/image"
import { useState, useRef, useEffect, BaseSyntheticEvent } from 'react';
import chevornDown from '../../assets/icons/chevron-down.svg';
import chevornUp from '../../assets/icons/chevron-up.svg';
import searchIcon from '../../assets/icons/search.svg';


export default function ClassFilter() {
    //const teacherTypeRef = useRef<HTMLButtonElement>(null);
    const teacherInfo: {name: string}[] = [
        {name: '정은담'},
        {name: '엄세리'},
        {name: '윤태식'},
        {name: '조영은'},
        {name: '조성훈'},
        {name: '정유미'},
        {name: '정해인'},
        {name: '정우성'},
        {name: '정우영'},
        {name: '정국'}
    ]


    let [isClickedTimeFilter, setIsClickedTimeFilter] = useState<boolean>(false);
    let [isClickedTeacherFilter, setIsClickedTeacherFilter] = useState<boolean>(false);
    let [test, setTest] = useState<string>('true');
    let [classType, setClassType] = useState<string>('');
    let [searchTeacher, setSearchTeacher] = useState<string>('');
    let [checkedTeacherNameList, setCheckedTeacherNameList] = useState<string[]>([]);

    function SearchTeacherName(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTeacher(event.target.value);
    }

    function onFocusTrue() {
        setIsClickedTimeFilter(true);
        //setTest('true')
        //console.log(onFocusFilterBtn);
    }

    function onFocusFalse() {
        setIsClickedTimeFilter(false);
    }

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target)
        setClassType(event.target.value);
        setIsClickedTimeFilter(false);
    };

    function getCheckedName() {
        if(checkedTeacherNameList.length === 1){
            return `${checkedTeacherNameList[0]}`;
        }
        else if(checkedTeacherNameList.length == 2){
            return `${checkedTeacherNameList[0]},${checkedTeacherNameList[1]}`;
        }else {
            return `${checkedTeacherNameList[0]},${checkedTeacherNameList[1]},${checkedTeacherNameList[2][0]}..`;
        }
    }

    function compareSearchAndList(e: any) {
        //if(e.target.current.id)
    }

    const classTypeRef = useRef<HTMLButtonElement>(null);
    const classTypeRefClick = useRef<HTMLDivElement>(null);
    const teacherNameTypeRef = useRef<HTMLButtonElement>(null);
    const teacherNameTypeRefClick = useRef<HTMLDivElement>(null);

    /* 클래스 유형 제어 */
    useEffect(() => {
        const clickOutsideTimeFilter = (e: any) => {
            if (!isClickedTimeFilter && !classTypeRefClick.current?.contains(e.target) && !classTypeRef.current?.contains(e.target)) {
              setIsClickedTimeFilter(false);
            }
          }
        
          document.addEventListener('mousedown', clickOutsideTimeFilter)
          return () => {
            document.removeEventListener('mousedown', clickOutsideTimeFilter)
          }
    }, [classTypeRefClick, classTypeRef]);

    /* 강사명 제어 */
    useEffect(() => {
        const clickOutsideTeacherFilter = (e: any) => {
            if(!isClickedTeacherFilter && !teacherNameTypeRef.current?.contains(e.target) && !teacherNameTypeRefClick.current?.contains(e.target)){
                setIsClickedTeacherFilter(false);
            }
        } 
          document.addEventListener('mousedown', clickOutsideTeacherFilter)
          return () => {
            document.removeEventListener('mousedown', clickOutsideTeacherFilter)
          }
    }, [teacherNameTypeRef, teacherNameTypeRefClick])
      
    //console.log(classType)

    return (
        <div className="absolute left-12 top-[120px] flex flex-col gap-2 h-[50px]">
            <div className=" max-w-[375px] h-[37px] items-start gap-2 inline-flex">
                <button ref={classTypeRef} className="group flex items-center gap-2 w-[112px] h-full border px-3 py-2 rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
                onClick={onFocusTrue} /* onFocus={onFocusTrue} */ >
                    <span className="w-16 h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">{classType === '' ? '클래스 유형' : classType}</span>
                    {isClickedTimeFilter ? <Image src={chevornUp} width={16} height={16} alt=" " /> : <Image src={chevornDown} width={16} height={16} alt=" " />}
                </button>
                <button ref={teacherNameTypeRef} className="group flex items-center gap-2 max-w-[150px] h-full px-3 py-2 border rounded-lg border-indigo-500  hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9] focus-within:text-white"
                onClick={() => {
                    setIsClickedTeacherFilter(true);
                }}>
                    <span className="max-w-[110px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">
                        {checkedTeacherNameList.length === 0 ? '강사명' : getCheckedName() }
                        
                    </span>
                    <Image src={chevornDown} width={16} height={16} alt=" " />
                </button>
                <button className="group flex items-center gap-2 w-[97px] h-full px-3 py-2 border rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]">
                    <span className="w-[49px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">카테고리</span>
                    <Image src={chevornDown} width={16} height={16} alt=" " />
                </button>
            </div>
            <div className="relative"> {/* 필터링 UI 기준점 */}
            {/* 기반반/회차반 필터링 */}
            {isClickedTimeFilter ?
            <div ref={classTypeRefClick} className="w-[195px] flex flex-col p-4 border rounded-lg border-gray-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] bg-white">
            <div id="classTypeFilter" className="w-[163px] h-[54] flex flex-col gap-3 ">
                <p className="flex gap-2 items-center" >
                    <input type="radio" id="timeClass" name="classType" value="회차반" onChange={radioHandler} />
                    <label htmlFor="timeClass" className="text-gray-900 text-sm font-semibold font-['Pretendard'] leading-[21px]">회차반</label>
                </p>
                <p className="flex gap-2 items-center">
                    <input type="radio" id="preiodClass" name="classType" value="기간반" onChange={radioHandler} />
                    <label htmlFor="preiodClass" className="text-gray-900 text-sm font-semibold font-['Pretendard'] leading-[21px]">기간반</label>
                </p>
            </div>
            </div> : null}
            {/* 강사이름 필터링 */}
            {isClickedTeacherFilter ? 
            <div ref={teacherNameTypeRefClick} className="absolute top-0 left-[120px] flex gap-[5px] w-[195px] py-4 pl-4 pr-2 border rounded-lg border-gray-300 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]">
            <div className="w-full flex flex-col gap-3">
                <div className="w-full h-[42px] p-3 border rounded-lg border-gray-200 bg-gray-50 flex gap-2 focus:border-none focus-within:ring-1 focus-within:ring-[#7354E8]">
                    <Image src={searchIcon} width={18} height={18} alt=" " />
                    <input type="text" placeholder="강사이름" value={searchTeacher} className="w-full h-full border-none focus:ring-0 text-gray-500 text-sm font-normal font-['Pretendard'] leading-[17.50px]"
                    onChange={(event) => {
                        SearchTeacherName(event);
                        console.log(searchTeacher)
                    }} />
                </div>
                <div className="overflow-hidden">
                    <div className="max-h-[150px]  flex flex-col items-center gap-3 overflow-auto ">
                    {teacherInfo.map((teacher, i) => {
                        return(
                        <div className="w-full h-4 flex items-center gap-2">
                            {checkedTeacherNameList.includes(teacher.name) ? 
                            <input type="checkbox" id={teacher.name} value={teacher.name} checked className="hover:cursor-pointer focus:ring-transparent ring-0 focus:outline-0 rounded"
                            onChange={(e) => {
                                if(e.target.checked){
                                    setCheckedTeacherNameList(checkedTeacherNameList => [...checkedTeacherNameList, e.target.value])
                                }else{
                                    setCheckedTeacherNameList(checkedTeacherNameList.filter(name => name !== e.target.value))
                                }
                            }} /> :
                            <input type="checkbox" id={teacher.name} value={teacher.name} className="hover:cursor-pointer focus:ring-transparent ring-0 focus:outline-0 rounded"
                            onChange={(e) => {
                                if(e.target.checked){
                                    setCheckedTeacherNameList(checkedTeacherNameList => [...checkedTeacherNameList, e.target.value])
                                }else{
                                    setCheckedTeacherNameList(checkedTeacherNameList.filter(name => name !== e.target.value))
                                }
                            }} />
                            }
                            
                            <label className="hover:cursor-pointer" htmlFor={teacher.name}>{teacher.name}</label>
                        </div>
                        )
                    })}
                    </div>
                </div>
                {/* 강사이름 자동완성 */}
                {searchTeacher !== '' ?
                <div className="absolute top-[62px] w-[162px] h-auto flex flex-col gap-3 p-4 border border-gray-200 bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]">
                {teacherInfo.map((teacher, i) => {
                    if(teacher.name.includes(searchTeacher)) {
                        return(
                        <div className="w-full flex items-center gap-2">
                            <Image src={searchIcon} width={14} height={14} alt=" " />
                            <span className="text-[#7354E8] text-sm font-normal font-['Pretendard'] leading-[21px] hover:cursor-pointer" id={teacher.name} onClick={(e) => {
                                //console.log(e.currentTarget)
                                let teacherName = e.currentTarget.id;
                                if(checkedTeacherNameList.includes(teacherName)){
                                    setSearchTeacher('');
                                }else {
                                    setCheckedTeacherNameList([...checkedTeacherNameList, e.currentTarget.id]);
                                    setSearchTeacher('');
                                }
                            }}>
                                {searchTeacher}
                                <span className="text-gray-500 text-sm font-normal font-['Pretendard'] leading-[21px]">{teacher.name.replace(searchTeacher, '')}</span>
                            </span>
                            {/* 앞 순서부터만 색 변경 가능 이슈 고치기 */}
                        </div>
                        )
                    }
                })}
                </div>
                : null}
                
            </div>
            
        </div> : null}
            
            </div>
        </div>
    )
}