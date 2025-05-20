import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Environment, Center } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type { FC } from "react"
import { GLTFLoader } from "three-stdlib"
import * as THREE from "three"

const LCModel: FC = () => {
  const ref = useRef<THREE.Group>(null!)
  const gltf = useLoader(GLTFLoader, "LCLogoV1.glb")

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5 // X-axis rotation
    }
  })

  return <primitive object={gltf.scene} ref={ref} scale={0.75} />
}

const LCViewer: FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <Center>
          <LCModel />
        </Center>
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

export default LCViewer
