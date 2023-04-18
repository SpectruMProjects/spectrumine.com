export class HatProduct {
  constructor(
    readonly id: string,
    readonly price: string,
    readonly name: string,
    readonly description: string,
    readonly objUrl: string,
    readonly mtlUrl: string,
    readonly previewUrl?: string
  ) {}
}
