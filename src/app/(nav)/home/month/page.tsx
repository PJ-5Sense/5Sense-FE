export default function MainPageMonth() {
  const date = new Date()
  const currentDate = date.getDate()
  const dayInMonth = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']

  const classData = [
    [
      {
        day: 1,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 2,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 3,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 4,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 5,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 6,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 7,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      }
    ],
    [
      {
        day: 8,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 9,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 10,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 11,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 12,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 13,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 14,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      }
    ],
    [
      {
        day: 15,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 16,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 17,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 18,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 19,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 20,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 21,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      }
    ],
    [
      {
        day: 22,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 23,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 24,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 25,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 26,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 27,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 28,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      }
    ],
    [
      {
        day: 29,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      },
      {
        day: 30,
        preiodClass: {
          bg: 'bg-primary-50',
          outline: 'outline-primary-300',
          boxBg: 'bg-primary-500',
          textColor: 'text-indigo-500',
          classCount: '30개'
        },
        timeClass: {
          bg: 'bg-stone-50',
          outline: 'outline-orange-300',
          boxBg: 'bg-orange-500',
          textColor: 'text-orange-500',
          classCount: '30개'
        }
      }
    ]
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
      {/* 월 시간표 */}
      <div className="w-full flex flex-col outline outline-1 outline-gray-200 rounded-md">
        <div className="w-full h-[43px] grid grid-cols-7">
          {dayInMonth.map((day, i) => {
            return (
              <div
                key={i}
                className="w-full h-[43px] px-[10px] py-3 flex items-center outline outline-1 outline-gray-200"
              >
                <span className=" text-gray-500 text-base font-medium font-['Pretendard']">
                  {day}
                </span>
              </div>
            )
          })}
        </div>
        {classData.map((data, i) => {
          return (
            <div key={i} className="w-full h-[180px] grid grid-cols-7">
              {data.map((data, i) => {
                return (
                  <div
                    key={i}
                    className="w-full h-full px-[10px] pt-[10px] pb-3 flex flex-col justify-between outline outline-1 outline-gray-200"
                  >
                    {currentDate === data.day ? (
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-600 text-white text-lg font-medium font-['Pretendard']">
                        {data.day}
                      </div>
                    ) : (
                      <div className="w-7 h-[21px] flex items-center justify-center text-gray-500 text-lg font-medium font-['Pretendard']">
                        {data.day}
                      </div>
                    )}

                    <div className="w-full h-[62px] flex flex-col gap-1.5 ">
                      <div
                        className={`w-full flex gap-1 h-7 px-2 py-[6px] ${data.preiodClass.bg} outline outline-1 ${data.preiodClass.outline} rounded`}
                      >
                        <div
                          className={`w-[14px] h-[14px] ${data.preiodClass.boxBg} rounded`}
                        ></div>
                        <div
                          className={`flex-1 text-right ${data.preiodClass.textColor} text-[13px] font-bold font-['Pretendard'] leading-none`}
                        >
                          {data.preiodClass.classCount}
                        </div>
                      </div>
                      <div
                        className={`w-full flex gap-1 h-7 px-2 py-[6px] ${data.timeClass.bg} outline outline-1 ${data.timeClass.outline} rounded`}
                      >
                        <div
                          className={`w-[14px] h-[14px] ${data.timeClass.boxBg}  rounded`}
                        ></div>
                        <div
                          className={`flex-1 text-right ${data.timeClass.textColor} text-[13px] font-bold font-['Pretendard'] leading-none`}
                        >
                          {data.timeClass.classCount}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
