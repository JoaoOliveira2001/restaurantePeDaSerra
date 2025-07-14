import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';

function Mountains() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.2;
  });
  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <mesh position={[-2, 0, 0]}>
        <coneGeometry args={[1, 2, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 0, -1]}>
        <coneGeometry args={[1.5, 3, 4]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <coneGeometry args={[1, 2, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

function Burger() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = -clock.elapsedTime * 0.2;
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Top bun */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
        <meshStandardMaterial color="#d8a658" />
      </mesh>
      {/* Cheese */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
        <meshStandardMaterial color="#e6c15b" />
      </mesh>
      {/* Patty */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.3, 32]} />
        <meshStandardMaterial color="#603913" />
      </mesh>
      {/* Lettuce */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.1, 32]} />
        <meshStandardMaterial color="#3a9b3a" />
      </mesh>
      {/* Bottom bun */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
        <meshStandardMaterial color="#d8a658" />
      </mesh>
    </group>
  );
}

function LogoText() {
  return (
    <Text3D
      font="/helvetiker_regular.typeface.json"
      size={0.8}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.03}
      bevelSize={0.02}
      bevelSegments={5}
    >
      Pé da Serra
      <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
    </Text3D>
  );
}

export default function InteractiveLogo() {
  return (
    <Canvas style={{ width: '100%', height: '400px', background: 'black' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <LogoText />
      <Mountains />
      <Burger />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
