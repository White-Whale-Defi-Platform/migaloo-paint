'use client'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useCountUp } from 'react-countup'
import { heightAtom } from '@/state'
import { STATUS_ANIMATION_DURATION } from '@/constants'

const Status = (): JSX.Element => {
  const { height, loading, error } = useRecoilValue(heightAtom)
  const [animate, setAnimate] = useState(false)

  const counterRef = useRef(null)
  const { update } = useCountUp({ ref: counterRef, start: 0, end: height, separator: '', duration: 2 })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (loading) {
      setAnimate(true)
    } else if (animate) {
      timeoutId = setTimeout(() => {
        update(height)
        setAnimate(false)
      }, STATUS_ANIMATION_DURATION)
    }
    update(height)
    return () => { clearTimeout(timeoutId) }
  }, [loading, animate, height, update])

  return (
    <div className="flex flex-row items-center justify-between gap-1">
      <span ref={counterRef} className={`text-neutral-300 ${animate ? 'opacity-90' : 'opacity-60'} transition-opacity duration-500 ease-in-out text-xs`} />
      <svg className={`animate-spin h-4 w-4 ${error === null ? 'text-green-500' : 'text-red-500'}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="5" fill="currentColor" />
        <circle cx="10" cy="10" r="9" fill="none" strokeLinecap="round" strokeWidth="2" stroke="currentColor" strokeDasharray="10" strokeDashoffset="0" className={`${animate ? 'opacity-75' : 'opacity-0'} transition-opacity duration-500 ease-in-out`} />
      </svg>
    </div>
  )
}

export default Status
