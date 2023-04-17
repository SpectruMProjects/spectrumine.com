import { useLayoutEffect, useRef, useState } from 'react'
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight
} from 'three'
import { OBJLoader, OrbitControls } from '@/core'

interface Props {
  width?: number
  height?: number
}

export default function HatViewer({ width = 400, height = 400 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [[w, h]] = useState([width, height])

  useLayoutEffect(() => {
    if (!ref.current) return
    let isWork = true

    const scene = new Scene()
    const camera = new PerspectiveCamera(75)
    const renderer = new WebGLRenderer()
    const light = new DirectionalLight('white', 2)

    camera.position.x = 2
    light.position.set(3, 5, 7)

    renderer.setClearColor(0xffffff, 0)
    renderer.setSize(w, h)
    scene.add(light)

    ref.current.replaceWith(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    const objLoader = new OBJLoader()
    loadObj(objLoader, '/models/test_hat.obj').then((hat) => {
      if (!isWork) return
      scene.add(hat)

      const { x, y, z } = hat.position
      controls.target.set(x, y, z)
      controls.update()
    })

    let draw = () => {
      requestAnimationFrame(draw)
      renderer.render(scene, camera)
    }
    draw()

    return () => {
      isWork = false
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

function loadObj(loader: OBJLoader, url: string) {
  return new Promise<Mesh>((r, rj) => {
    loader.load(url, r, () => {}, rj)
  })
}
