export class UserItem {
  constructor(
    readonly userId: string,
    readonly item: {
      id: string
      name: string
      description: string
      imgUrl?: string
      meta?: string
    },
    readonly count: number
  ) {}
}
