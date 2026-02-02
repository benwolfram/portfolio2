import { Canvas } from '@react-three/fiber'
import CRZGradient from './CRZGradient'

export default function Scene() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#000' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'fixed', inset: 0, display: 'block', zIndex: 0 }}
      >
        <CRZGradient />
      </Canvas>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontFamily: "'Herokid', sans-serif",
            fontSize: 'clamp(2.25rem, 9vw, 5.5rem)',
            fontWeight: 'normal',
            letterSpacing: '-0.02em',
            color: '#7A9A7A',
            textTransform: 'uppercase',
            textAlign: 'left',
            lineHeight: 0.92,
            display: 'inline-block',
          }}
        >
          <span style={{ display: 'block' }}>BEN</span>
          <span style={{ display: 'block' }}>WOLFRAM</span>
        </h1>
      </div>
    </div>
  )
}
