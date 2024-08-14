export function getDateFormat(today: Date) {
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  return `${year}/${month}/${date}`
}

export function toLocalString(number: string) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function changePhoneNumberToString(phoneNumber: string) {
  if (phoneNumber.slice(0, 2) === '02') {
    if (phoneNumber.length === 9) {
      return phoneNumber.slice(0, 2) + '-' + phoneNumber.slice(2, 5) + '-' + phoneNumber.slice(5, 9)
    } else {
      return phoneNumber.slice(0, 2) + '-' + phoneNumber.slice(2, 6) + '-' + phoneNumber.slice(6, 10)
    }
  } else if (phoneNumber.slice(0, 3) === '010') {
    return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 7) + '-' + phoneNumber.slice(7, 11)
  }
}

export function formatStartTime(classTime: string) {
  return classTime.slice(0, classTime.length - 3)
}

export function calculateEndTime(startTime: string, lessonTime: number) {
  const divisionLessonTime = {
    hour: Math.floor(lessonTime / 60),
    min: lessonTime % 60
  }

  let endTime = {
    hour: Number(startTime.split(':')[0]) + divisionLessonTime.hour,
    min: Number(startTime.split(':')[1]) + divisionLessonTime.min
  }

  if (endTime.min === 60) {
    return endTime.hour + 1 + ':00'
  } else if (endTime.min === 0) {
    return endTime.hour + ':00'
  } else {
    return endTime.hour + ':' + endTime.min
  }
}

export function formatLessonDate(date: string) {
  const revertToKoreaTime = new Date(date)
  return `${revertToKoreaTime.getFullYear()}.${revertToKoreaTime.getMonth() + 1}.${revertToKoreaTime.getDate()}`
}

export function getKoreanNumber(value: string) {
  const koreanNumber = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
  const tenUnit = ['', '십', '백', '천']
  const tenThousandUnit = ['조', '억', '만', '']
  const unit = 10000

  let number = Number(value.replaceAll(',', ''))

  let answer = ''

  while (number > 0) {
    const mod = number % unit
    const modToArray = mod.toString().split('')
    const length = modToArray.length - 1

    const modToKorean = modToArray.reduce((acc, value, index) => {
      const valueToNumber = +value
      if (!valueToNumber) return acc
      // 단위가 십 이상인 '일'글자는 출력하지 않는다. ex) 일십 -> 십
      const numberToKorean = index < length && valueToNumber === 1 ? '' : koreanNumber[valueToNumber]
      return `${acc}${numberToKorean}${tenUnit[length - index]}`
    }, '')

    answer = `${modToKorean}${tenThousandUnit.pop()} ${answer}`
    number = Math.floor(number / unit)
  }

  return answer
}

export const formatPhoneNum = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}

export const formatAddComma = (tutionFee: string, cnt: string) => {
  const numCnt = Number(cnt)
  console.log('tutionFee', tutionFee)
  const removedCommaValue = Number(tutionFee)

  return (removedCommaValue * numCnt).toLocaleString()
}

export const formatDate = (date: string) => {
  const dayList = ['일', '월', '화', '수', '목', '금', '토']
  const dateData = {
    year: Number(date.split('.')[0]),
    month: Number(date.split('.')[1]) - 1,
    date: Number(date.split('.')[2])
  }

  const dayIndex = new Date(dateData.year, dateData.month, dateData.date).getDay()

  const returnData = {
    year: date.split('.')[0],
    month: date.split('.')[1].length === 1 ? '0' + date.split('.')[1] : date.split('.')[1],
    date: date.split('.')[2].length === 1 ? '0' + date.split('.')[2] : date.split('.')[2],
    day: dayList[dayIndex]
  }

  return returnData.year + '.' + returnData.month + '.' + returnData.date + ` (${returnData.day})`
}

export const formatReservationDate = (date: string) => {
  const dateData = {
    year: Number(date.split('.')[0]),
    month: Number(date.split('.')[1]),
    date: Number(date.split('.')[2])
  }
  return `${dateData.year}년 ${dateData.month}월 ${dateData.date}일`
}

export const calculateRervationTime = (openTime: string, closeTime: string) => {
  const startTimeData = {
    hour: Number(openTime.split(':')[0]),
    min: openTime.split(':')[1]
  }

  const endTimeData = {
    hour: closeTime.split(':')[1] === '30' ? Number(closeTime.split(':')[0]) : Number(closeTime.split(':')[0]),
    min: closeTime.split(':')[1]
  }

  const timeList = []

  for (var i = startTimeData.hour; i <= endTimeData.hour; i++) {
    if (i < 10) {
      timeList.push(`0${i}:00`)
      timeList.push(`0${i}:30`)
    } else {
      timeList.push(`${i}:00`)
      timeList.push(`${i}:30`)
    }
  }

  const indexOfOpenTime = timeList.indexOf(openTime)
  const indexOfCloseTime = timeList.indexOf(closeTime)

  return timeList.slice(indexOfOpenTime, indexOfCloseTime + 1)
}

export const getTimeListByHour = (openTime: string, closeTime: string) => {
  const timeList: string[] = []

  const time = {
    open: Number(openTime.split(':')[0]),
    close: Number(closeTime.split(':')[0])
  }
  for (var i = time.open; i < time.close; i++) {
    timeList.push(`${i}`)
  }

  return timeList
}

export const calculateLessonTime = (startTime: string, endTime: string) => {
  const start = {
    hour: Number(startTime.split(':')[0]),
    min: Number(startTime.split(':')[1])
  }

  const end = {
    hour: Number(endTime.split(':')[0]),
    min: Number(endTime.split(':')[1])
  }

  const divideTimeByHalf = {
    hour: (end.hour - start.hour) * 60,
    min: end.min - start.min
  }

  return divideTimeByHalf.hour + divideTimeByHalf.min
}
