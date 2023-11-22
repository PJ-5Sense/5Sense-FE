/* 'use client'

import { testState, nameState } from '../../recoilContextProvider'
import { useRecoilValue, useRecoilState } from 'recoil' */

export default function HomePage() {
  //const [test, setTest] = useRecoilState(testState)
  //const [name, setName] = useRecoilState(nameState)

  return (
    <section>
      {/* {test}
      <button
        onClick={() => {
          setTest(test + 1)
        }}
      >
        +
      </button>
      <input
        type="text"
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
      />
      {name} */}
      <div>메인 홈 페이지</div>
    </section>
  )
}
