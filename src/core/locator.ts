import { Provider } from "./provider"

export class Locator {
  private _fabrics = new Map()

  fabric(key: any, fabric: (locator: Locator) => any) {
    if (this._fabrics.has(key)) 
      throw new DependencyAlreadyRegisteredError(key)
    this._fabrics.set(key, fabric)
  }

  singleton(key: any, fabric: (locator: Locator) => any) {
    let t: any
    this.fabric(key, () => {
      if (!t) t = fabric(this)
      return t
    })
  }

  get<T>(key: any): T {
    if (!(this._fabrics.has(key)))
      throw new DependencyNotFoundError(key)
    return this._fabrics.get(key)
  }

  use(locator: Locator) {
    for (const key of locator._fabrics.keys()) {
      this._fabrics.set(
        key, 
        locator._fabrics.get(key)
      )
    }
  }
}

export class DependencyAlreadyRegisteredError extends Error {
  constructor(readonly dname: any) {
    super(`Dependency ${dname} already registered`)
  }
}

export class DependencyNotFoundError extends Error {
  constructor(readonly dname: any) {
    super(`Dependency ${dname} not found`)
  }
}

const provider = new Provider<Locator>()
export function createLocator(builder: () => void): Locator {
  const locator = new Locator()
  provider.provide(locator).run(builder)
  return locator
}
export function localLocator() {
  return provider.get()
}
export function fabric(key: any, fabric: (locator: Locator) => any) {
  localLocator()?.fabric(key, fabric)
}
export function singleton(key: any, fabric: (locator: Locator) => any) {
  localLocator()?.singleton(key, fabric)
}
export function use(locator: Locator) {
  localLocator()?.use(locator)
}
