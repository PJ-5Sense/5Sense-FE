import { dateDataType } from '@/components/common/calendar/datePicker/dayDatePIcker'

export default function WeekDataFormatter(data: any, dateData: dateDataType) {
  const formatData = []
  for (var i = 0; i < data.length; i++) {
    const filterData = []
    const targetData = data[i]
    if (targetData.length !== 0) {
      const sortedData = targetData.sort(
        (a: any, b: any) => Number(a.startTime.split(':')[0]) - Number(b.startTime.split(':')[0])
      )
      filterData.push(sortedData[0])
      for (var j = 0; j < sortedData.length; j++) {
        const target = filterData[filterData.length - 1]
        if (target.id !== sortedData[j].id || target.startTime !== sortedData[j].startTime) {
          filterData.push(sortedData[j])
        }
      }
      data[i] = filterData
    }
  }
  const startDay = new Date(dateData.year, dateData.month, 0).getDay()
  for (var i = 0; i <= startDay; i++) {
    formatData.push({})
  }
  for (var i = 0; i < data.length; i++) {
    formatData.push(data[i])
  }
  const result: any = []
  for (var i = 0; i < formatData.length; i += 7) {
    result.push(formatData.slice(i, i + 7))
  }

  let resultList: {
    time: string
    classData: {
      index: number
      data: {
        id: string
        lessonTime: number
        name: string
        startTime: string
        type: string
        teacher: string
        studentNum: string
      }[]
    }[]
  }[][] = []
  console.log(result)
  for (var k = 0; k < result.length; k++) {
    let list: {
      time: string
      classData: {
        index: number
        data: {
          id: string
          lessonTime: number
          name: string
          startTime: string
          type: string
          teacher: string
          studentNum: string
        }[]
      }[]
    }[] = []

    for (var i = 0; i < result[k].length; i++) {
      for (var j = 0; j < result[k][i].length; j++) {
        if (list.filter(item => item.time === result[k][i][j].startTime).length === 0) {
          list.push({ time: result[k][i][j].startTime, classData: [] })
        }
        const timeIndex = list.findIndex(item => item.time === result[k][i][j].startTime)
        if (list[timeIndex].classData.filter(item => item.index === i).length !== 0) {
          list[timeIndex].classData[list[timeIndex].classData.length - 1].data.push({
            id: result[k][i][j].id,
            lessonTime: result[k][i][j].lessonTime,
            name: result[k][i][j].name,
            startTime: result[k][i][j].startTime,
            type: result[k][i][j].type,
            teacher: result[k][i][j].teacher,
            studentNum: result[k][i][j].numberOfStudents
          })
        } else {
          list[timeIndex].classData.push({
            index: i,
            data: [
              {
                id: result[k][i][j].id,
                lessonTime: result[k][i][j].lessonTime,
                name: result[k][i][j].name,
                startTime: result[k][i][j].startTime,
                type: result[k][i][j].type,
                teacher: result[k][i][j].teacher,
                studentNum: result[k][i][j].numberOfStudents
              }
            ]
          })
        }
      }
    }
    resultList.push(list)
  }

  for (var i = 0; i < resultList.length; i++) {
    resultList[i].sort(
      (a: { time: string }, b: { time: string }) => Number(a.time.split(':')[0]) - Number(b.time.split(':')[0])
    )
  }

  for (var k = 0; k < resultList.length; k++) {
    for (var i = 0; i < resultList[k].length; i++) {
      for (var j = 0; j < 7; j++) {
        if (resultList[k][i].classData.filter(item => item.index === j).length === 0) {
          resultList[k][i].classData.push({ index: j, data: [] })
        }
      }
      resultList[k][i].classData.sort((a: any, b: any) => a.index - b.index)
    }
  }
  return resultList
}
