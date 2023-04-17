import { useLayoutEffect, useRef, useState } from 'react'
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three'
import { OrbitControls } from '@/core'

interface Props {
  width?: number
  height?: number
}

export default function HatViewer({ width = 400, height = 400 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [[w, h]] = useState([width, height])

  useLayoutEffect(() => {
    if (!ref.current) return
    const scene = new Scene()
    const camera = new PerspectiveCamera(75)
    const renderer = new WebGLRenderer()

    const hat = createHatObj()
    scene.add(hat)

    camera.position.x = 2

    renderer.setClearColor(0xffffff, 0)
    renderer.setSize(w, h)

    ref.current.replaceWith(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    const { x, y, z } = hat.position
    controls.target.set(x, y, z)
    controls.update()

    let draw = () => {
      requestAnimationFrame(draw)
      renderer.render(scene, camera)
    }
    draw()

    return () => {
      draw = () => {}
      try {
        renderer.dispose()
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  return (
    <div>
      <canvas style={{ width: w, height: h }} ref={ref} />
    </div>
  )
}

function createHatObj() {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new Mesh(geometry, material)

  return cube
}

class Viewier {
  private readonly scene: Scene
  private readonly renderer: WebGLRenderer
  private isStopped = false

  readonly camera: PerspectiveCamera
  readonly hat: Mesh<BoxGeometry, MeshBasicMaterial>

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
    this.isStopped = true
    try {
      this.renderer.dispose()
    } catch (e) {
      console.error(e)
    }
  }

  start() {
    this.draw()
  }

  private draw() {
    if (this.isStopped) return
    requestAnimationFrame(this.draw.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}
