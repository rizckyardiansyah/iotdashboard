import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../helpers'

type Props = {
  className: string
}

const EngageWidget10 = ({className}: Props) => {
  const [waterLevel, setWaterLevel] = useState(0) // Initial progress value

  // Fetch water level from the API
  const fetchWaterLevel = async () => {
    try {
      const response = await axios.get('http://aplikasi3.gratika.id:1218/latest/')
      const data = response.data

      // Assuming `water_level` is the parameter returned by the API
      if (data && data.water_level !== undefined) {
        setWaterLevel(data.water_level)
      }
    } catch (error) {
      console.error('Error fetching water level:', error)
    }
  }

  // Fetch data every 2 minutes
  useEffect(() => {
    fetchWaterLevel() // Initial fetch

    const interval = setInterval(() => {
      fetchWaterLevel()
    }, 1 * 60 * 1000) // 2 minutes

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  // Dynamic background color based on water level
  const getColor = (level: number) => {
    if (level < 30) return '#FF0000' // Red for low levels
    if (level < 70) return '#FFFF00' // Yellow for medium levels
    return '#00FF00' // Green for high levels
  }

  return (
    <div className={`card card-flush ${className}`}>
      <div
        className='card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0'
      >
        <div className='mx-auto my-5' style={{width: '200px'}}>
          <h2 className='text-center'>Water Level</h2>
          <div
            style={{
              height: `${waterLevel}`, // Height proportional to water level
              width: '100%',
              backgroundColor: getColor(waterLevel), // Dynamic color
              transition: 'height 0.5s, background-color 0.5s', // Smooth transitions
              borderRadius: '10px',
            }}
          ></div>
          <p className='text-center fs-2hx fw-bold text-primary mt-3'>
            {waterLevel}%
          </p>
        </div>
      </div>
    </div>
  )
}

export {EngageWidget10}
