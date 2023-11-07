import Image from "next/image"
import chevornDown from '../../assets/icons/chevron-down.svg';
import chevornUp from '../../assets/icons/chevron-up.svg';
import { useState, useRef, useEffect, BaseSyntheticEvent } from 'react';

export default function ClassFilter() {
    //const teacherTypeRef = useRef<HTMLButtonElement>(null);

    let [onFocusFilterBtn, setOnFocusFilterBtn] = useState<boolean>(false);
    let [test, setTest] = useState<string>('true');
    let [classType, setClassType] = useState<string>('');

    function onFocusTrue() {
        setOnFocusFilterBtn(true);
        //setTest('true')
        //console.log(onFocusFilterBtn);
    }

    function onFocusFalse() {
        setOnFocusFilterBtn(false);
    }

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassType(event.target.value);
      };

    const classTypeRef = useRef<HTMLButtonElement>(null);
    const classTypeRefClick = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutside = (e: any) => {
            if (!onFocusFilterBtn && !classTypeRefClick.current?.contains(e.target) && !classTypeRef.current?.contains(e.target)) {
              setOnFocusFilterBtn(false);
            }
          }
          document.addEventListener('mousedown', clickOutside)
          return () => {
            document.removeEventListener('mousedown', clickOutside)
          }
    }, [test])
      

    return (
        <div className="absolute left-12 top-[120px] flex flex-col gap-2 h-[50px]">
            <div className=" w-[310px] h-[37px] items-start gap-2 inline-flex">
                <button ref={classTypeRef} id="teacher" className="group flex items-center gap-2 w-[112px] h-full border px-3 py-2 rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]"
                onClick={onFocusTrue} /* onFocus={onFocusTrue} */ >
                    <span className="w-16 h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">클래스 유형</span>
                    {onFocusFilterBtn ? <Image src={chevornUp} width={16} height={16} alt=" " /> : <Image src={chevornDown} width={16} height={16} alt=" " />}
                </button>
                <button className="group flex items-center gap-2 w-[85px] h-full px-3 py-2 border rounded-lg border-indigo-500  hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9] focus-within:text-white">
                    <span className="w-[37px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">강사명</span>
                    <Image src={chevornDown} width={16} height={16} alt=" " />
                </button>
                <button className="group flex items-center gap-2 w-[97px] h-full px-3 py-2 border rounded-lg border-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline focus:outline-2.5 focus:outline-[#D3C4F9]">
                    <span className="w-[49px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white group-focus:text-white">카테고리</span>
                    <Image src={chevornDown} width={16} height={16} alt=" " />
                </button>
            </div>
            <div>
            {onFocusFilterBtn ?
            <div ref={classTypeRefClick} className="w-[195px] flex flex-col p-4 border rounded-lg border-gray-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] bg-white">
            <div id="classTypeFilter" className="w-[163px] h-[54] flex flex-col gap-3 ">
                <p className="flex gap-2 items-center">
                    <input type="radio" id="timeClass" name="classType" value="timeClass" onChange={radioHandler} />
                    <label htmlFor="timeClass" className="text-gray-900 text-sm font-semibold font-['Pretendard'] leading-[21px]">회차반</label>
                </p>
                <p className="flex gap-2 items-center">
                    <input type="radio" id="preiodClass" name="classType" value="preiodClass" onChange={radioHandler} />
                    <label htmlFor="preiodClass" className="text-gray-900 text-sm font-semibold font-['Pretendard'] leading-[21px]">기간반</label>
                </p>
            </div>
            </div> : null}
            
            </div>
        </div>
    )
}