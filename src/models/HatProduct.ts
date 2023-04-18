export class HatProduct {
  constructor(
    readonly id: string,
    readonly price: string,
    readonly name: string,
    readonly description: string,
    readonly fbxUrl: string,
    readonly previewUrl?: string
  ) {}
}
