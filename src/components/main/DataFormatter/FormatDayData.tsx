interface IProps {
  startTime: string
}

export default function FormatDayData(data: any) {
  const formatData = []
  for (var i = 0; i < data.length; i++) {
    const sortedData = data[i].sort(
      (a: any, b: any) => Number(a.startTime.split(':')[0]) - Number(b.startTime.split(':')[0])
    )
    const filterData = []
    if (sortedData.length !== 0) {
      filterData.push(sortedData[0])
      /* 중복된 객체 필터링 */
      for (var j = 1; j < sortedData.length; j++) {
        const target = filterData[filterData.length - 1]
        if (target.id !== sortedData[j].id || target.startTime !== sortedData[j].startTime) {
          filterData.push(sortedData[j])
        }
      }
      const dayLessonData = []
      for (var k = 0; k < filterData.length; k++) {
        if (dayLessonData.length === 0) {
          dayLessonData.push({
            startTime: filterData[k].startTime,
            data: [
              {
                teacher: filterData[k].teacher,
                room: filterData[k].room,
                name: filterData[k].name,
                type: filterData[k].type
              }
            ]
          })
        } else {
          /* 같은 시간에 다른 클래스인 경우 */
          if (dayLessonData[dayLessonData.length - 1].startTime === filterData[k].startTime) {
            dayLessonData[dayLessonData.length - 1].data.push({
              teacher: filterData[k].teacher,
              room: filterData[k].room,
              name: filterData[k].name,
              type: filterData[k].type
            })
          } else {
            /* 다른 시간에 다른 클래스인 경우 */
            dayLessonData.push({
              startTime: filterData[k].startTime,
              data: [
                {
                  teacher: filterData[k].teacher,
                  room: filterData[k].room,
                  name: filterData[k].name,
                  type: filterData[k].type
                }
              ]
            })
          }
        }
      }
      formatData.push(dayLessonData)
    } else {
      formatData.push([])
    }
  }

  return formatData
}
