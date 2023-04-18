import { useLayoutEffect, useRef, useState } from 'react'
import {
  // BoxGeometry,
  Mesh,
  // MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  Color,
  NearestFilter,
  MeshPhongMaterial,
  ColorRepresentation,
  BufferGeometry,
  BoxGeometry,
  Material
} from 'three'
import { OBJLoader, OrbitControls, MTLLoader } from '@/core'

interface Props {
  objUrl: string
  mtlUrl: string

  width?: number
  height?: number
}

export default function HatViewer({
  objUrl,
  mtlUrl,

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

    const objLoader = new OBJLoader()
    const mtlLoader = new MTLLoader()

    loadMTL(mtlLoader, mtlUrl)
      .then((mtl) => {
        if (!isWork) return
        mtl.preload()
        for (const material of Object.values(mtl.materials) as any[]) {
          material.transparent = true
          if (material?.map?.magFilter) material.map.magFilter = NearestFilter
        }
        objLoader.setMaterials(mtl)

        loadObj(objLoader, objUrl)
          .then((hat) => {
            if (!isWork) return
            scene.add(hat)

            const { x, y, z } = hat.position
            controls.target.set(x, y, z)
            controls.update()
          })
          .catch(console.error)
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
  }, [mtlUrl, objUrl])

  return (
    <div>
      <canvas style={{ width: w, height: h }} ref={ref} />
    </div>
  )
}

function hsl(h: number, s: number, l: number) {
  return new Color().setHSL(h, s, l)
}

function makeCube(geometry: BufferGeometry, color: ColorRepresentation) {
  const material = new MeshPhongMaterial({
    color,
    opacity: 0.5,
    transparent: true
  })

  const cube = new Mesh(geometry, material)

  return cube
}

function loadObj(loader: OBJLoader, url: string) {
  return new Promise<Mesh>((r, rj) => {
    loader.load(
      url,
      r,
      () => {},
      (...args: any) => {
        console.error(args)
        rj(...args)
      }
    )
  })
}

function loadMTL(loader: MTLLoader, url: string) {
  return new Promise<any>((r, rj) => {
    loader.load(
      url,
      r,
      () => {},
      (...args: any) => {
        console.error(args)
        rj(...args)
      }
    )
  })
}
