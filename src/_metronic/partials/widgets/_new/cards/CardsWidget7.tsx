import clsx from "clsx";
import { useEffect, useState } from "react";
import { color } from "d3-color";
import LiquidFillGauge from "react-liquid-gauge";
import { interpolateRgb } from "d3-interpolate";

type Props = {
  className: string;
  description: string;
  icon: boolean;
  labelColor: string;
  textColor: string;
};

const CardsWidget7 = ({
  className,
  description,
  labelColor,
  textColor,
}: Props) => {
  const [waterLevel, setWaterLevel] = useState<number | null>(null);
  const [value, setValue] = useState(0);
  // Fetch water level from the API every 5 minutes
  const fetchWaterLevel = async () => {
    try {
      const response = await fetch("http://aplikasi3.gratika.id:1218/latest/");
      const data = await response.json();
      setWaterLevel(data?.water_level); // Assuming the API returns the value with a key 'water_level'
      setValue(data?.water_level.split(".")[0]);
    } catch (error) {
      console.error("Error fetching water level:", error);
    }
  };

  const radius = 100;
  const startColor = "#6495ed"; // cornflowerblue
  const endColor = "#dc143c"; // crimson
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(value / 100);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  useEffect(() => {
    // Fetch the water level immediately when the component is mounted
    fetchWaterLevel();

    // Set up the interval to fetch data every 5 minutes (300,000 ms)
    const interval = setInterval(fetchWaterLevel, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
    >
      <div className="card-custom card-stretch gutter-b pt-5 ">
        <div className="card-title d-flex flex-column">
          <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">
            <LiquidFillGauge
              style={{
                margin: "0 auto 20px auto",
                justifyContent: "center",
                alignItems: "center",
              }}
              width={radius * 2}
              height={radius * 2}
              value={value}
              percent="%"
              textSize={1}
              textOffsetX={0}
              textOffsetY={0}
              textRenderer={(props: any) => {
                const value = Math.round(props.value);
                const radius = Math.min(props.height / 2, props.width / 2);
                const textPixels = (props.textSize * radius) / 2;
                const valueStyle = {
                  fontSize: textPixels,
                };
                const percentStyle = {
                  fontSize: textPixels * 0.6,
                };

                return (
                  <tspan>
                    <tspan className="value" style={valueStyle}>
                      {value}
                    </tspan>
                    <tspan style={percentStyle}>{props.percent}</tspan>
                  </tspan>
                );
              }}
              riseAnimation
              waveAnimation
              waveFrequency={2}
              waveAmplitude={1}
              gradient
              gradientStops={gradientStops}
              circleStyle={{
                fill: fillColor,
              }}
              waveStyle={{
                fill: fillColor,
              }}
              textStyle={{
                fill: color("#444").toString(),
                fontFamily: "Arial",
              }}
              waveTextStyle={{
                fill: color("#fff").toString(),
                fontFamily: "Arial",
              }}
            />
          </span>
          <span className="text-gray-500 pt-5 fw-semibold fs-6">
            Current Water Level
          </span>
        </div>
      </div>
      <div className="card-body d-flex align-items-end pt-0">
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
  );
};

export { CardsWidget7 };
