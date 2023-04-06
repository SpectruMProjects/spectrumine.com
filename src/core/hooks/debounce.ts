import { useEffect, useState } from "react";

export function useDebounce<T>(
  callback: (t: T) => void, 
  delay: number,
  dependency: T
) {
  const [prev, setPrev] = useState<number | undefined>(undefined)
  
  useEffect(() => {
    clearTimeout(prev)

    const timeout = setTimeout(() => {
      callback(dependency)
    }, delay)
    setPrev(timeout)

    return () => {
      clearTimeout(timeout)
    }
  }, [dependency])
}