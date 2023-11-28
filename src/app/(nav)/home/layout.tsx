import MainBox from '@/components/mainPage/MainBox'
import WriteBox from '@/components/mainPage/WriteBox'

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full 2xl:p-12 xl:p-12 lg:p-6 md:p-12 p-6">
      <MainBox />
      {children}
      <WriteBox />
    </div>
  )
}
