export class HatProduct {
  constructor(
    readonly id: string,
    readonly price: string,
    readonly name: string,
    readonly descriptions: string,
    readonly previewUrl?: string
  ) {}
}