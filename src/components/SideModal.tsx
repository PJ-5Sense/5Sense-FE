'use client'
import React, { ReactNode, useState } from 'react'

const SideModal = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="absolute top-0 left-0 w-[480px] h-screen bg-white rounded-tr-[32px] shadow z-[100]">
      <div>test</div>
    </div>
  )
}

export default SideModal
