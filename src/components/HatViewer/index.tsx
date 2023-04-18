import { useLayoutEffect, useRef, useState } from 'react'
import {
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  Color
} from 'three'
import { OrbitControls } from '@/core'
import { FBXLoader } from '@/core/threejs/FBXLoader'

interface Props {
  url: string
  width?: number
  height?: number
}

export default function HatViewer({
  url,

  width = 400,
  height = 400
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [[w, h]] = useState([width, height])

  useLayoutEffect(() => {
    if (!ref.current) return
    let isWork = true

    const scene = new Scene()
    const camera = new PerspectiveCamera(75)
    const renderer = new WebGLRenderer({
      alpha: true,
      canvas: ref.current
    })

    const topLight = new DirectionalLight('wheat')
    topLight.position.set(0, 100, 0)

    const bottomLight = new DirectionalLight('gray')
    bottomLight.position.set(0, -100, 0)

    const keyLight = new DirectionalLight(new Color('hsl(30, 100%, 75%)'), 1)
    keyLight.position.set(-100, 0, 100)

    const fillLight = new DirectionalLight(
      new Color('hsl(240, 100%, 75%)'),
      0.75
    )
    fillLight.position.set(100, 0, 100)

    const backLight = new DirectionalLight(0xffffff, 1)
    backLight.position.set(100, 0, -100).normalize()

    scene.add(topLight)
    scene.add(bottomLight)
    scene.add(keyLight)
    scene.add(fillLight)
    scene.add(backLight)

    camera.position.x = -2

    renderer.setClearColor(0x000000, 0)
    renderer.setSize(w, h)

    ref.current.replaceWith(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(1, 1, 1)
    controls.update()

    const fbxLoader = new FBXLoader()

    loadFbx(fbxLoader, url)
      .then((mesh) => {
        if (!isWork) return
        scene.add(mesh)
        const { x, y, z } = mesh.position
        controls.target.set(x, y, z)
        controls.update()
      })
      .catch(console.error)

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
  }, [url])

  return (
    <div>
      <canvas style={{ width: w, height: h }} ref={ref} />
    </div>
  )
}

function loadFbx(loader: FBXLoader, url: string) {
  return new Promise<Mesh>((res, rej) => {
    loader.load(url, res, () => {}, rej)
  })
}
