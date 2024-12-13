import { useEffect, useRef, useState, FC } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSSVariableValue } from '../../../assets/ts/_utils'
import axios from 'axios'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

const MixedWidget8: FC<Props> = ({ className, chartColor, chartHeight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const chartDataRef = useRef<number[]>([])
  const chartCategoriesRef = useRef<string[]>([])

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://aplikasi3.gratika.id:1218/last-hour/')
      const data = response.data.last_hour_data

      // Assuming the API returns averaged data for 5-minute intervals
      const levels = data.map((item: any) => parseFloat(item.water_level.replace('%', '')))
      const timestamps = data.map((item: any) => item.formatted_timestamp)

      // Only update if data has changed
      if (
        JSON.stringify(levels) !== JSON.stringify(chartDataRef.current) ||
        JSON.stringify(timestamps) !== JSON.stringify(chartCategoriesRef.current)
      ) {
        chartDataRef.current = levels
        chartCategoriesRef.current = timestamps
        refreshChart() // Refresh the chart only if the data has changed
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const refreshChart = () => {
    if (!chartRef.current) {
      // console.error("null")
      return
    }

    // Clear any previous chart instance
    chartRef.current.innerHTML = ''

    const chart1 = new ApexCharts(
      chartRef.current,
      chart1Options(chartColor, chartHeight, chartDataRef.current, chartCategoriesRef.current)
    )
    chart1.render()
  }

  // Initialize chart and set up fetch interval
  useEffect(() => {
    const initializeChart = async () => {
      await fetchData()
      // Set an interval to fetch data every 5 minutes (300,000 ms)
      const interval = setInterval(async () => {
        await fetchData()
      }, 300000) // Change this to 300,000 ms (5 minutes) if needed

      // Cleanup function to clear the interval when the component is unmounted
      return () => clearInterval(interval)
    }

    initializeChart()
  }, [chartColor, chartHeight]) // Rerun effect if props change

  return (
    <div className={`card ${className}`}>
      {/* Begin::Header */}
      <div className='card-header border-0 py-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Water Level</span>
          <span className='text-muted fw-semibold fs-7'>Last hour water level</span>
        </h3>
      </div>
      {/* End::Header */}

      {/* Begin::Body */}
      <div className='card-body d-flex flex-column'>
        {/* Chart Container */}
        <div ref={chartRef} className='mixed-widget-5-chart card-rounded-top'></div>
      </div>
      {/* End::Body */}
    </div>
  )
}

const chart1Options = (
  chartColor: string,
  chartHeight: string,
  dataset: number[],
  categories: string[]
): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-800')
  const strokeColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-' + chartColor) as string
  const lightColor = getCSSVariableValue('--bs-' + chartColor + '-light')

  return {
    series: [
      {
        name: 'Water Level (%)',
        data: dataset,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'line', // 'line' chart for water levels
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
    stroke: {
      curve: 'smooth',
      colors: [baseColor],
    },
  }
}

export { MixedWidget8 }
