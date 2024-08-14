interface IProps {
  className: string | null
  date: string | null
  lessonTime: string | null
  roomName: string | null
  classId: string | null
  roomId: string | null
  startTime: string | null
  category?: string
}

export default function RoomReservationCheck(props: IProps) {
  const calculateEndTime = () => {
    const startTime = {
      hour: Number(props.startTime?.split(':')[0]),
      min: Number(props.startTime?.split(':')[1])
    }

    const timeSum = startTime.hour * 2 + startTime.min / 30 + Number(props.lessonTime) / 30

    const endTime = {
      hour: `${Math.floor(timeSum / 2)}`,
      min: timeSum / 2 - Math.floor(timeSum / 2) === 0 ? '00' : '30'
    }

    return endTime.hour + ':' + endTime.min
  }

  return (
    <div className="w-full px-6 py-8 flex flex-col gap-4 border border-1 border-gray-200 rounded-xl">
      <div className="w-[72px] h-7 flex items-center justify-center rounded bg-secondary-100 text-secondary-600 text-xs font-bold">
        {props.category}
      </div>
      <div className="w-full gray-900-bold text-xl">{props.className}</div>
      <div className="w-full flex flex-col gap-1/2">
        <div className="w-full flex gap-8">
          <div className="w-[120px] h-5 flex gap-3 items-center">
            <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
            <span className="w-full gray-500-medium text-sm">날짜</span>
          </div>
          <div className="w-full text-gray-800 text-sm font-normal">{props.date}</div>
        </div>
        <div className="w-full flex gap-8">
          <div className="w-[120px] h-5 flex gap-3 items-center">
            <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
            <span className="w-full gray-500-medium text-sm">시간</span>
          </div>
          <div className="w-full text-gray-800 text-sm font-normal">
            {props.startTime} - {calculateEndTime()}
          </div>
        </div>
        <div className="w-full flex gap-8">
          <div className="w-[120px] h-5 flex gap-3 items-center">
            <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
            <span className="w-full gray-500-medium text-sm">강의실</span>
          </div>
          <div className="w-full text-gray-800 text-sm font-normal">{props.roomName}</div>
        </div>
      </div>
    </div>
  )
}
