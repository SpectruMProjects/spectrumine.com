export class Death {
  constructor(
    readonly issue: string,
    readonly issuer: string,
    readonly time: number,
    readonly respawnTime: number
  ) {}
}