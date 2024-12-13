import clsx from 'clsx'
import { useEffect, useState } from 'react'

type Props = {
  className: string
  description: string
  icon: boolean
  labelColor: string
  textColor: string
}

const CardsWidget7 = ({ className, description, labelColor, textColor }: Props) => {
  const [waterLevel, setWaterLevel] = useState<number | null>(null)

  // Fetch water level from the API every 5 minutes
  const fetchWaterLevel = async () => {
    try {
      const response = await fetch('http://aplikasi3.gratika.id:1218/latest/')
      const data = await response.json()
      setWaterLevel(data.water_level) // Assuming the API returns the value with a key 'water_level'
    } catch (error) {
      console.error('Error fetching water level:', error)
    }
  }

  useEffect(() => {
    // Fetch the water level immediately when the component is mounted
    fetchWaterLevel()

    // Set up the interval to fetch data every 5 minutes (300,000 ms)
    const interval = setInterval(fetchWaterLevel, 10000)

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <span className='fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2'>
            {waterLevel !== null ? waterLevel : 'Loading...'}
          </span>
          <span className='text-gray-500 pt-1 fw-semibold fs-6'>Current Water Level</span>
        </div>
      </div>
      <div className='card-body d-flex align-items-end pt-0'>
      {/* <div className='d-flex align-items-center flex-column mt-3 w-100'>
        <div className='d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2'>
          <span>43 Pending</span>
          <span>72%</span>
        </div>

        <div className='h-8px mx-3 w-100 bg-white bg-opacity-50 rounded'>
          <div
            className='bg-white rounded h-8px'
            role='progressbar'
            style={{width: '72%'}}
            aria-valuenow={50}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      </div> */}
    </div>
    </div>
    
    
  )
}

export { CardsWidget7 }
