'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Logo from 'public/assets/logo/Logo.png'
import IconNotice from '@/icons/icon/main/Notification.svg'
import IconLogout from '@/icons/icon/main/logout.svg'

export default function PcHeader() {
  const router = useRouter()
  return (
    <div className="absolute w-full lg:block hidden">
      <div className="absolute top-12 left-6">
        <div className="logoBox flex gap-[10px] cursor-pointer" onClick={() => router.push('/home')}>
          <Image src={Logo} alt="logo" width={52} height={52} />
          <span className="text-slate-50 text-xl font-bold leading-[52px]">5Sense</span>
        </div>
      </div>
      <div className="absolute top-[37px] right-6 flex items-center gap-6 cursor-pointer">
        <IconNotice />
        <IconLogout
          width={28}
          height={28}
          onClick={() => {
            typeof window !== undefined && localStorage.clear()
            router.push('/login')
          }}
        />
      </div>
    </div>
  )
}
