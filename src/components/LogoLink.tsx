'use client'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  className: string
  src: string
  alt: string
}

// link와 active 두가지 기능 필요
export default function LogoLink({ className, src, alt }: Props) {
  return (
    <>
      <Image className={className} src={src} alt={alt} />
    </>
  )
}

// function Avatar({ person, size }) {
//     return (
//       <img
//         className="avatar"
//         src={getImageUrl(person)}
//         alt={person.name}
//         width={size}
//         height={size}
//       />
//     );
//   }
