import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/main/Navbar'
import Image from 'next/image'
import mainlogo from '../assets/logo/mainlogo.svg'
import profie from '../assets/images/profile.png'
import ProfileBtn from '../components/btn/ProfileBtn'
import Header from '@/components/main/Header'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
