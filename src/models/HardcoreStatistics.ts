import { Death } from './Death'

export class HardcoreStatistics {
  readonly lastDeath?: Death
  
  constructor(
    readonly lastServerTime: number = 0,
    readonly timeOnServer: number = 0,
    readonly deaths: Death[] = []
  ) {
    for(const death of deaths) {
      if ((this.lastDeath?.time ?? 0) < death.time) {
        this.lastDeath = death
      }
    } 
  }
}