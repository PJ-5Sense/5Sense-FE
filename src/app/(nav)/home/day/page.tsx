export default function MainPageDay() {
  let date = new Date()
  let currentHour = date.getHours()
  console.log(date.getHours())
  const classData = [
    {
      time: '09:00',
      class: [
        {
          hour: '9',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조성훈',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          hour: '9',
          bgColorOn: 'bg-[#FF5A1F]',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          hour: '9',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '3호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          hour: '9',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '정은담',
          roomNum: '4호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '11:00',
      class: [
        {
          hour: '11',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '윤태식',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '12:00',
      class: [
        {
          hour: '12',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조성훈',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '13:00',
      class: [
        {
          hour: '13',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          hour: '13',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '15:00',
      class: [
        {
          hour: '15',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          hour: '15',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    },
    {
      time: '17:00',
      class: [
        {
          hour: '17',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '조영은',
          roomNum: '1호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        },
        {
          hour: '17',
          bgColorOn: 'bg-primary-600',
          bgColorOff: 'bg-gray-200',
          textColorOn: 'text-gray-800',
          textColorOff: 'text-gray-400',
          teacherName: '엄세리',
          roomNum: '2호실',
          className:
            '체형 교정 및 이완을 위한 삶의 균형 찾기/ 스트레스로부터 벗어 나기'
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col gap-4 mx-auto xl:max-w-[1016px] pt-8 pb-[80px]">
      {/* 회차반 / 기간반 */}
      <div className="w-full h-4 flex justify-end">
        <div className="w-[164px] h-4 flex gap-6 ">
          <div className="w-[70px] h-full flex gap-2 items-center justify-end">
            <span className="w-[16px] h-[16px] border rounded bg-[#FF7749]"></span>
            <span className="text-orange-500 text-[13px] font-bold font-['Pretendard'] leading-none">
              회차반
            </span>
          </div>
          <div className="w-[70px] h-full flex gap-2 items-center justify-end">
            <span className="w-[16px] h-[16px] border rounded bg-primary-500"></span>
            <span className="text-primary-500 text-[13px] font-bold font-['Pretendard'] leading-none">
              기간반
            </span>
          </div>
        </div>
      </div>
      {/* 일 시간표 */}
      <div className="flex flex-col gap-7 w-full">
        {classData.map((data, i) => {
          if (currentHour <= Number(data.time.split(':')[0])) {
            return (
              <div
                key={i}
                className="w-full flex xl:gap-[60px] md:gap-12 gap-6"
              >
                {/* 시간 */}
                <div className="flex w-[77px] h-6 gap-5 items-center">
                  <div className="w-[51px] text-right text-indigo-500 text-base font-semibold font-['Pretendard'] leading-normal">
                    {data.time}
                  </div>
                  <div className="w-1.5 h-1.5 bg-primary-600"></div>
                </div>
                <div className="w-full flex flex-col p-4 gap-[7px] outline outline-1 rounded-lg outline-gray-200">
                  {data.class.map((data, i) => {
                    return (
                      <div key={i} className="flex gap-4 h-[45px]">
                        <div
                          className={`w-[3px] h-full rounded ${
                            currentHour === Number(data.hour)
                              ? data.bgColorOn
                              : data.bgColorOff
                          }`}
                        ></div>
                        <div className="flex flex-col w-full h-full">
                          <div className="flex gap-[6px]">
                            <div
                              className={`${
                                currentHour === Number(data.hour)
                                  ? data.textColorOn
                                  : data.textColorOff
                              }  text-sm font-medium font-['Pretendard'] leading-[21px]`}
                            >
                              {data.teacherName}
                            </div>
                            <div
                              className={`${
                                currentHour === Number(data.hour)
                                  ? data.textColorOn
                                  : data.textColorOff
                              }  text-sm font-medium font-['Pretendard'] leading-[21px]`}
                            >
                              ·
                            </div>
                            <div
                              className={`${
                                currentHour === Number(data.hour)
                                  ? data.textColorOn
                                  : data.textColorOff
                              }  text-sm font-medium font-['Pretendard'] leading-[21px]`}
                            >
                              {data.roomNum}
                            </div>
                          </div>
                          <div
                            className={`${
                              currentHour === Number(data.hour)
                                ? data.textColorOn
                                : data.textColorOff
                            }  text-base font-semibold font-['Pretendard'] leading-normal`}
                          >
                            {data.className}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
