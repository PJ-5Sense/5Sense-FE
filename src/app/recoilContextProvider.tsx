'use client'

import { RecoilRoot, atom } from 'recoil'
/* export const testState = atom({
  key: 'test',
  default: 0
}) */

/* export const nameState = atom({
  key: 'name',
  default: ''
}) */

export const dateSideTab = atom({
  key: 'slideTab',
  default: 'translate-x-0'
})

export default function RecoidContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  return <RecoilRoot>{children}</RecoilRoot>
}
