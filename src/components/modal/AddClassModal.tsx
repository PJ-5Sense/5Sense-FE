import RoomReservation from '../room/RoomReservation'

interface IProps {
  onClick: () => void
}

export default function AddClassModal({ onClick }: IProps) {
  return (
    <div className="w-[640px] border border-1 border-gray-200 rounded-xl bg-white">
      <div className="relative w-full h-[90px]">
        <div className="absolute left-6 top-10 text-2xl gray-900-bold">일정 추가</div>
        {/* <CloseCircleIcon
          className="absolute right-4 top-4 cursor-pointer"
          width={35}
          height={35}
          onClick={() => {
            onClick()
          }}
        /> */}
      </div>
      <div className="w-full px-6 pb-6 flex flex-col gap-10">
        <RoomReservation classType="duration" viewType="modal" onClose={onClick} />
      </div>
    </div>
  )
}
