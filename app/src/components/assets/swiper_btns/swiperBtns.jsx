import React from 'react'
import {useSwiper} from 'swiper/react'

export default function SwiperBtns(props) {
    const swiper = useSwiper()
  return (
    <div className='text-center relative -top-8 z-10'>
        <button onClick={()=>{
            swiper.slideNext()
            props.slideChange(swiper.activeIndex)
        }} className="font-bold p-[1px] bg-green-500 w-full h-full rounded-lg border border-green-500 text-white hover:bg-white hover:text-black">Continue</button>
    </div>
  )
}