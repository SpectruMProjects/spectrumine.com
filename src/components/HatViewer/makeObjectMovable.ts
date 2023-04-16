const ROTATION_SPEED = 100 // less is more speed

class MouseMoveable {
  private mouseX = 0
  private mouseY = 0

  constructor(private readonly mesh: THREE.Mesh) {}

  readonly onMove = (e: MouseEvent) => {
    this.mesh.rotation.y += (e.clientX - this.mouseX) / ROTATION_SPEED
    this.mesh.rotation.x += (e.clientY - this.mouseY) / ROTATION_SPEED

    this.mouseX = e.clientX
    this.mouseY = e.clientY
  }

  readonly onDown = (e: MouseEvent) => {
    document.addEventListener('mousemove', this.onMove)
    document.addEventListener('mouseup', this.onUp)

    this.mouseX = e.clientX
    this.mouseY = e.clientY
  }

  readonly onUp = (e: MouseEvent) => {
    e.preventDefault()
    document.removeEventListener('mousemove', this.onMove)
    document.removeEventListener('mouseup', this.onUp)
  }
}

export class ScreenMoveable {
  private mouseX = 0
  private mouseY = 0

  constructor(private readonly mesh: THREE.Mesh) {}

  readonly onMove = (e: TouchEvent) => {
    e.preventDefault()

    this.mesh.rotation.y +=
      (e.touches[0].clientX - this.mouseX) / ROTATION_SPEED
    this.mesh.rotation.x +=
      (e.touches[0].clientY - this.mouseY) / ROTATION_SPEED

    this.mouseX = e.touches[e.touches.length - 1].clientX
    this.mouseY = e.touches[e.touches.length - 1].clientY
  }

  onDown(e: TouchEvent) {
    document.addEventListener('touchmove', this.onMove.bind(this))
    document.addEventListener('touchend', this.onUp.bind(this))

    this.mouseX = e.touches[e.touches.length - 1].clientX
    this.mouseY = e.touches[e.touches.length - 1].clientY
  }

  onUp(e: TouchEvent) {
    e.preventDefault()
    document.removeEventListener('touchmove', this.onMove.bind(this))
    document.removeEventListener('touchend', this.onUp.bind(this))
  }
}

export function makeObjectMovable(element: HTMLElement, mesh: THREE.Mesh) {
  const mouse = new MouseMoveable(mesh)
  const screen = new ScreenMoveable(mesh)

  element.addEventListener('mousedown', mouse.onDown.bind(mouse))
  element.addEventListener('touchstart', screen.onDown.bind(screen))
}
