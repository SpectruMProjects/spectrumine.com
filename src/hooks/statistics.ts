import { statistics } from "@/api";
import { Death, HardcoreStatistics } from "@/models";
import { useEffect, useState } from "react";

type State = 
  ['ok', HardcoreStatistics] |
  ['loading'] |
  ['error', 'UserNotFound' | 'error']

interface ApiData {
  lastServerTime: 0,
  timeOnServer: 0,
  deaths: {
    deathIssue: string,
    deathIssuer: string,
    deathTime: number,
    timeToRespawn: number
  }[]  
}

function mapApiToStats(data: ApiData): HardcoreStatistics {
  return new HardcoreStatistics(
    data.lastServerTime,
    data.timeOnServer,
    data.deaths.map(death => new Death(
      death.deathIssue,
      death.deathIssuer,
      death.deathTime,
      Date.now() - death.timeToRespawn
    ))
  )
}

export function useUserHardcoreStatistics(username: string): State {
  const [state, setState] = useState<State>(['loading'])

  useEffect(() => {
    setState(['loading'])
    statistics(username).then(res => {
      switch (res.code) {
        case 'ok':
          setState(['ok', mapApiToStats(res.data)])  
          break

        case 'UserNotFound':
          setState(['ok', new HardcoreStatistics()])
          break
        
        default:
          setState(['error', 'error'])
          break
      }
    })
  }, [username])

  return state
}