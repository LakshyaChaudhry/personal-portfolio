import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import roboto from "../assets/Roboto_Regular.json?url";
import * as THREE from "three";

/*
 * Big LC letters generated completely in code.
 * Background flips colour with dark-mode toggle.
 */

export default function Hero3D() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();                               // initial check
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true });
    return () => obs.disconnect();
  }, []);

  function RotatingText ({isDark}: {isDark: boolean}) {
    const group = useRef<THREE.Group>(null!);

    /* useFrame runs on every render tick (~60 fps) */
    useFrame((_state, delta) => {
      group.current.rotation.y += delta * 0.5; // 0.5 rad/sec
    });

    return (
        <Center>
          <group ref={group}>
            <Text3D
                font={roboto}
                size={6}
                height={2}
                bevelEnabled
                bevelSize={0.15}
                bevelThickness={0.3}
                curveSegments={12}
            >
                LC
                <meshStandardMaterial
                color={isDark ? "white" : "black"}
                metalness={0.35}
                roughness={0.2}
                />
            </Text3D>
          </group>
        </Center>
      );
  }

  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      <Canvas
        className="!absolute !inset-0 !w-full !h-full"
        camera={{ position: [0, 0, 12] }}   /* back camera up a bit */
      >
        <ambientLight intensity={1} />
        <RotatingText isDark={isDark} />
        <OrbitControls enableZoom={false}/>
      </Canvas>
    </section>
  );
}
