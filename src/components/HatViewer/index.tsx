import { useLayoutEffect, useRef } from 'react'
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  Mesh
} from 'three'
import { GLTFLoader, OrbitControls } from '@/core'

interface Props {
  url: string
}

export default function HatViewer({ url }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    let isWork = true
    const width = ref.current.parentElement?.offsetWidth ?? 400
    const height = ref.current.parentElement?.offsetHeight ?? 400

    const scene = new Scene()
    const camera = new PerspectiveCamera(75, width / height)
    const renderer = new WebGLRenderer({
      alpha: true,
      canvas: ref.current
    })

    const light = new AmbientLight('white', 1)
    scene.add(light)

    camera.position.x = -3

    renderer.setClearColor(0x000000, 0)
    renderer.setSize(width, height)

    ref.current.replaceWith(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    const gLTFLoader = new GLTFLoader()

    let hat: Mesh
    loadGLTF(gLTFLoader, url)
      .then((gFTL) => {
        if (!isWork) return
        // console.log(gFTL)
        const root = gFTL.scene
        const { x, y, z } = root.position
        hat = root
        controls.target.set(x, y, z)
        controls.update()
        // const mixer = new AnimationMixer(root)
        // console.log(gFTL.animations)

        scene.add(root)
      })
      .catch(console.error)

    let draw = () => {
      requestAnimationFrame(draw)
      if (hat) {
        // hat.rotation.x += 0.01
        hat.rotation.y += 0.02
        // hat.rotation.z += 0.01
      }
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
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={ref} />
    </div>
  )
}

function loadGLTF(loader: GLTFLoader, url: string) {
  return new Promise<any>((res, rej) => {
    loader.load(url, res, () => {}, rej)
  })
}
