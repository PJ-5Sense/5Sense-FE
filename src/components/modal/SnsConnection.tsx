import { useSetRecoilState } from 'recoil'

import { modalState } from '@/lib/state/modal'

interface IProps {
  toggleStatus: boolean
  onCloseSnsModal: () => void
}

export default function SnsConnection({ toggleStatus, onCloseSnsModal }: IProps) {
  const setModal = useSetRecoilState(modalState)
  return (
    <div className="w-[424px] flex flex-col gap-[53px] px-6 pt-[82px] pb-6 border border-1 border-gray-900 rounded-xl bg-[#fff]">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full text-center gray-900-bold uppercase text-2xl">
          sns 계정 연결을 {toggleStatus ? '활성화' : '비활성화'} 합니다.
        </div>
        <div className="w-full text-center text-black text-lg font-medium uppercase">
          최소 한 개이상의 sns계정이 필요합니다.
        </div>
      </div>
      <button
        className="w-full h-[52px] btn-purple"
        onClick={() => {
          setModal(false)
          onCloseSnsModal()
        }}
      >
        확인
      </button>
    </div>
  )
}
