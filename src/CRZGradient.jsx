import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SEGMENTS = 18
const COLOR_LEVELS = 3

function hash(p) {
  const x = Math.sin(p.x * 127.1 + p.y * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function valueNoise(p) {
  const i = { x: Math.floor(p.x), y: Math.floor(p.y) }
  const f = { x: p.x - i.x, y: p.y - i.y }
  const u = f.x * f.x * (3 - 2 * f.x)
  const v = f.y * f.y * (3 - 2 * f.y)
  const a = hash({ x: i.x, y: i.y })
  const b = hash({ x: i.x + 1, y: i.y })
  const c = hash({ x: i.x, y: i.y + 1 })
  const d = hash({ x: i.x + 1, y: i.y + 1 })
  return (1 - u) * (1 - v) * a + u * (1 - v) * b + (1 - u) * v * c + u * v * d
}

function smoothstep(e0, e1, x) {
  const t = (x - e0) / (e1 - e0)
  return Math.max(0, Math.min(1, t))
}

function getGradient(uv, t) {
  const c1 = {
    x: 0.15 + Math.sin(t) * 0.06,
    y: 0.82 + Math.cos(t * 0.8) * 0.05,
  }
  const c2 = {
    x: 0.78 + Math.cos(t * 0.7) * 0.05,
    y: 0.45 + Math.sin(t * 0.6) * 0.05,
  }
  const c3 = {
    x: 0.5 + Math.sin(t * 0.5) * 0.06,
    y: 0.6 + Math.cos(t * 0.55) * 0.05,
  }

  const dist = (a, b) => Math.hypot(uv.x - a.x, uv.y - a.y)
  let d1 = dist(uv, c1)
  let d2 = dist(uv, c2)
  let d3 = dist(uv, c3)

  const n1 = valueNoise({ x: uv.x * 10 + t * 0.5, y: uv.y * 10 + t * 0.5 })
  const n2 = valueNoise({ x: uv.x * 12 - t * 0.3 + 7.3, y: uv.y * 12 - t * 0.3 + 7.3 })
  const warp = (n1 + n2) * 0.5 - 0.5
  d1 += warp * 0.1
  d2 += warp * 0.09
  d3 += warp * 0.11

  const m1 = smoothstep(0.32, 0.05, d1) * Math.exp(-d1 * 1.4)
  const m2 = smoothstep(0.36, 0.05, d2) * Math.exp(-d2 * 1.2)
  const m3 = smoothstep(0.28, 0.04, d3) * Math.exp(-d3 * 1.3) * 0.8
  let total = Math.min(1, m1 + m2 + m3)

  const mask = valueNoise({ x: uv.x * 14 + t * 0.4, y: uv.y * 14 + t * 0.4 })
  total *= smoothstep(0.35, 0.75, mask)
  total *= 0.38

  const vignette = 1 - smoothstep(0.5, 1.3, Math.hypot(uv.x - 0.5, uv.y - 0.5))
  total *= vignette

  // #2C442C = rgb(44, 68, 44)
  const r = (44 / 255) * total
  const g = (68 / 255) * total
  const b = (44 / 255) * total
  return [r, g, b]
}

export default function CRZGradient() {
  const meshRef = useRef()

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(1, 1, SEGMENTS, SEGMENTS)
    const count = geom.attributes.position.count
    geom.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    return geom
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const geom = meshRef.current.geometry
    const t = state.clock.elapsedTime * 0.72
    const pos = geom.attributes.position
    const colorAttr = geom.attributes.color
    for (let i = 0; i < pos.count; i++) {
      const uv = { x: pos.getX(i) + 0.5, y: pos.getY(i) + 0.5 }
      const [r, g, b] = getGradient(uv, t)
      colorAttr.setXYZ(i, r, g, b)
    }
    colorAttr.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -1]} scale={[20, 20, 1]}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial vertexColors depthWrite={false} />
    </mesh>
  )
}
