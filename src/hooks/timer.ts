import { useEffect, useState } from 'react'

function dateFormat(time: number) {
  let delta = Math.abs(time) / 1000

  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  const seconds = Math.floor(delta % 60)

  const result = []
  result.push(days < 10 ? `0${days}` : days)
  result.push(hours < 10 ? `0${hours}` : hours)
  result.push(minutes < 10 ? `0${minutes}` : minutes)
  result.push(seconds < 10 ? `0${seconds}` : seconds)

  return result.join(':')
}

function formatTimeToRespawn(time: number) {
  const now = Date.now()
  return dateFormat(time - now)
}

export function useTimer(time: number) {
  const [timeToRespawn, setTimeToRespawn] = useState('0:0:0:0')

  useEffect(() => {
    if (Date.now() > time) {
      setTimeToRespawn('0:0:0:0')
      return
    }
    setTimeToRespawn(formatTimeToRespawn(time))
    const id = setInterval(() => {
      if (Date.now() > time) {
        setTimeToRespawn('0:0:0:0')
        clearInterval(id)
        return
      }
      setTimeToRespawn(formatTimeToRespawn(time))
    }, 1000)
    return () => clearInterval(id)
  }, [time])

  return timeToRespawn
}

//1683970696543 - now
//1683997200
