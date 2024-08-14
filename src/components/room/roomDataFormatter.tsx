export default function RoomDataFormatter(data: any) {
  for (var i = 0; i < data.length; i++) {
    const test: any = []
    const keys = Object.keys(data[i].workTime)
    for (var j = 0; j < keys.length; j++) {
      const key = keys[j]
      let value = data[i].workTime[key]
      value.time = key
      test.push(value)
    }
    data[i].workTime = test
  }

  for (var j = 0; j < data.length; j++) {
    for (var i = 0; i < data[j].workTime.length; i++) {
      if (data[j].workTime[i].lessonTime > 30) {
        const numOfRemove = data[j].workTime[i].lessonTime / 30
        data[j].workTime.splice(i + 1, numOfRemove - 1)
      }
    }
  }

  if (data.length >= 4) {
    const pushedCount: number = 4 - (data.length % 4)
    for (var i = 0; i < pushedCount; i++) {
      data.push({})
    }
    const result = []
    for (var i = 0; i < data.length; i += 4) {
      result.push([...data.slice(i, i + 4)])
    }
    return result
    //setRoom(result)
  } else if (data.length < 4) {
    const pushedCount: number = 4 - data.length
    for (var i = 0; i < pushedCount; i++) {
      data.push({})
    }
    return [data]
  }
}
