'use client'
import Link from 'next/link'
import openBook from '@/assets/icons/open-book.svg'
import home from '@/assets/icons/home.svg'
import user from '@/assets/icons/user.svg'
import receipt from '@/assets/icons/receipt.svg'
import profileCard from '@/assets/icons/profile-card.svg'
import rectangle from '@/assets/images/Rectangle.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Router } from 'next/router'
import path from 'path'

type Menu = {
  id: string
  src: string
  slug: string
  title: string
  avtive: boolean
}

const menu: Menu[] = [
  {
    id: '0',
    src: home,
    slug: '/home',
    title: '메인 홈',
    avtive: false
  },
  {
    id: '1',
    src: openBook,
    slug: '/class',
    title: '클래스 관리',
    avtive: false
  },
  {
    id: '2',
    src: user,
    slug: '/student',
    title: '수강생 관리',
    avtive: false
  },
  {
    id: '3',
    src: profileCard,
    slug: '/instructor',
    title: '강사 관리',
    avtive: false
  },
  {
    id: '4',
    src: receipt,
    slug: '/pay',
    title: '청구/납부',
    avtive: false
  }
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex w-[720px] xl:w-[879px] gap-[1px]">
      {menu.map(menu => (
        <Link href={`${menu.slug}`} key={menu.id}>
          <div
            className={`flex justify-center w-[135px] h-14  ${
              pathname.includes(menu.slug)
                ? 'w-[170px] xl:w-[205px]'
                : 'w-[135px] xl:w-[168px] bg-primary-400'
            } xl:h-[70px] rounded-tl-xl rounded-tr-xl translate-y-[14px] xl:translate-y-[17px]`}
          >
            <div className="content w-[135px] h-[42px] xl:w-[168px] xl:h-[54px] flex justify-center items-center gap-[10px]">
              <Image
                className="top-4 left-[37.5px]"
                src={menu.src}
                alt={menu.title}
              />
              <span
                className={`leading-[60px] text-primary-300 font-bold text-[13px] xl:text-base`}
              >
                {menu.title}
              </span>
            </div>
          </div>
          {pathname.includes(menu.slug) ? (
            <div className="absolute top-[124px] lg:top-0 translate-y-2 z-30">
              <Image
                src={rectangle}
                alt="active"
                className="w-[177px] h-[50px] xl:w-[220px] xl:h-[62px]"
              />
              <div className="content w-[135px] h-[42px] xl:w-[205px] xl:h-[54px] flex justify-center items-center gap-[10px] translate-y-[-42px] xl:translate-y-[-54px]">
                <Image src={menu.src} alt={menu.title} />
                <span className="bold-500 text-base xl:text-lg leading-[42px] xl:leading-[60px]">
                  {menu.title}
                </span>
              </div>
            </div>
          ) : (
            ''
          )}
        </Link>
      ))}
    </div>
  )
}
