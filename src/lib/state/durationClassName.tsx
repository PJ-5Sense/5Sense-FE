import { atom } from 'recoil'

export const durationClassName = atom<string>({
  key: 'durationClassName',
  default: ''
})
