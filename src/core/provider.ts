const ctxs: Array<any> = []
function provide<T, R>(ctx: T, body: () => R) {
  ctxs.push(ctx)
  const r = body()
  ctxs.pop()
  return r
}
function load<T>(key: any): T | undefined {
  for (let i = 0; i < ctxs.length; i++) {
    const ctx = (ctxs as any).at((i * -1) - 1)
    if (key in ctx) return ctx[key]
  }
}
export class Provider<T> {
  private _key = Symbol()

  get() {
    return load<T>(this._key)
  }

  static provide<T>(provider: Provider<T>, value: T) {
    return {
      run(block: () => any) {
        return provide({ [provider._key]: value }, block)
      }
    }
  }
}