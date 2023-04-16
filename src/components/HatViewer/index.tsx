import { useLayoutEffect, useRef } from 'react'
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three'
import { makeObjectMovable } from './makeObjectMovable'

interface Props {
  width?: number
  height?: number
}

export default function HatViewer({ width = 400, height = 400 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const viewer = new Viewver(width, height, ref.current)
    viewer.start()

    makeObjectMovable(viewer.domElement, viewer.hat)

    return () => viewer.destroy()
  }, [])

  return <canvas style={{ width, height }} ref={ref}></canvas>
}

function createHatObj() {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new Mesh(geometry, material)

  return cube
}

class Viewver {
  private readonly scene: Scene
  private readonly camera: PerspectiveCamera
  readonly hat: Mesh<BoxGeometry, MeshBasicMaterial>
  private readonly renderer: WebGLRenderer

  get domElement() {
    return this.renderer.domElement
  }

  constructor(width: number, height: number, element: HTMLCanvasElement) {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75)
    this.renderer = new WebGLRenderer()

    this.hat = createHatObj()
    this.scene.add(this.hat)

    this._initCamera()
    this._initRenderer(width, height, element)
  }

  private _initCamera() {
    this.camera.position.z = 2
  }

  private _initRenderer(
    width: number,
    height: number,
    element: HTMLCanvasElement
  ) {
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.setSize(width, height)
    element.replaceWith(this.renderer.domElement)
  }

  destroy() {
    try {
      this.camera.remove()
      this.hat.remove()
      this.scene.remove()
      this.renderer.dispose()
    } catch (e) {}
  }

  start() {
    this.draw()
  }

  private draw() {
    requestAnimationFrame(this.draw.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}
