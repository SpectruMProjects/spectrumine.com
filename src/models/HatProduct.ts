export class HatProduct {
  constructor(
    readonly id: string,
    readonly price: string,
    readonly name: string,
    readonly description: string,
    readonly gLTFUrl: string,
    readonly previewUrl?: string
  ) {}
}
