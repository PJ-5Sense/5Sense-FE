import Image from "next/image"
import ChevornDown from '../../assets/icons/chevron-down.svg';

export default function ClassFilter() {
    return (
        <div className="absolute left-12 top-[120px] w-[310px] h-[37px] items-start gap-2 inline-flex">
            <div className="group flex items-center gap-2 w-[112px] h-full border px-3 py-2 rounded-lg border-indigo-500 hover:bg-indigo-700">
                <span className="w-16 h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white">클래스 유형</span>
                <Image src={ChevornDown} width={16} height={16} alt=" " />
            </div>
            <div className="group flex items-center gap-2 w-[85px] h-full px-3 py-2 border rounded-lg border-indigo-500  hover:bg-indigo-700 ">
                <span className="w-[37px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white">강사명</span>
                <Image src={ChevornDown} width={16} height={16} alt=" " />
            </div>
            <div className="group flex items-center gap-2 w-[97px] h-full px-3 py-2 border rounded-lg border-indigo-500 hover:bg-indigo-700">
                <span className="w-[49px] h-[21px] text-[11.5px] font-semibold font-['Pretendard'] leading-[21px] text-indigo-500 group-hover:text-white">카테고리</span>
                <Image src={ChevornDown} width={16} height={16} alt=" " />
            </div>
        </div>
    )
}