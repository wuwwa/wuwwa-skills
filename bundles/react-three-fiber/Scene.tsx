import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <div style={{ height: 280 }} aria-label="Example 3D cube">
      <Canvas
        fallback={<p>3D preview is unavailable in this browser.</p>}
        camera={{ position: [3, 2, 4] }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[4, 5, 3]} intensity={2} />
        <mesh rotation={[0.3, 0.5, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="slateblue" />
        </mesh>
      </Canvas>
    </div>
  );
}
