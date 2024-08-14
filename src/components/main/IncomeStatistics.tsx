import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function IncomeStatistics({ props }: any) {
  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: [40, 40, 15],
        backgroundColor: ['#9B81FE', '#D3C4F9', '#E5E7EB'],
        borderColor: ['#FFF'],
        borderWidth: 1,
        spacing: 3
      }
    ]
  }

  return <Doughnut data={data}></Doughnut>
}
