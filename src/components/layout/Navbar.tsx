'use client'
import Link from 'next/link'
import openBook from '@/assets/icons/open-book.svg'
import home from '@/assets/icons/home.svg'
import user from '@/assets/icons/user.svg'
import receipt from '@/assets/icons/receipt.svg'
import profileCard from '@/assets/icons/profile-card.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const menu = [
  {
    id: 0,
    src: home,
    slug: '/home',
    title: '메인 홈'
  },
  {
    id: 1,
    src: openBook,
    slug: '/class',
    title: '클래스 관리'
  },
  {
    id: 2,
    src: user,
    slug: '/student',
    title: '수강생 관리'
  },
  {
    id: 3,
    src: profileCard,
    slug: '/instructor',
    title: '강사 관리'
  },
  {
    id: 4,
    src: receipt,
    slug: '/pay',
    title: '청구/납부'
  }
]
// flex하면 부모 크기에 맞춰지나?
export default function Navbar() {
  const pathname = usePathname()
  const isActive = useState(false)
  console.log(pathname)

  return (
    <div className="flex w-[720px] xl:w-[879px] translate-y-[16px]">
      {menu.map(menu => (
        <Link
          className={`link ${
            pathname.includes(menu.slug)
              ? 'nav-active'
              : 'bg-primary-400 text-primary-200 text-base rounded-tl-xl rounded-tr-xl'
          } relative flex justify-center w-[168px] h-[70px] leading-[60px] text-center font-bold font-['Pretendard']`}
          href={`${menu.slug}`}
          key={menu.id}
        >
          <Image
            className="relative w-[20px] h-[20px] top-[20px] right-[10px]"
            src={menu.src}
            alt={menu.slug}
          />
          {menu.title}
        </Link>
      ))}
    </div>
  )
}
