export class Death {
  constructor(
    readonly time: number,
    readonly respawnTime: number,
    readonly issue: string,
    readonly issuer?: string,
  ) {}
}