import React from 'react'
import { Environment, Lightformer } from '@react-three/drei'

const StudioLights = () => {
  return (
    <group name="lights">
      {/* Environment lighting for realistic reflections */}
      <Environment resolution={512}>
        {/* Main light sources */}
        <Lightformer 
          form="rect"
          intensity={4}
          position={[10, 5, 5]}
          scale={[10, 10]}
          rotation-y={Math.PI / 4}
          color="#ffffff"
        />
        <Lightformer 
          form="rect"
          intensity={2}
          position={[-10, 5, 5]}
          scale={[10, 10]}
          rotation-y={-Math.PI / 4}
          color="#f0f0f0"
        />
        <Lightformer 
          form="ring"
          intensity={1}
          position={[0, 0, -5]}
          scale={[20, 20]}
          color="#e8e8e8"
        />
        {/* Top fill light */}
        <Lightformer 
          form="rect"
          intensity={3}
          position={[0, 10, 0]}
          scale={[15, 15]}
          rotation-x={-Math.PI / 2}
          color="#ffffff"
        />
      </Environment>

      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Key Light - Main illumination from top-front */}
      <spotLight 
        position={[5, 10, 5]}
        angle={0.4}
        penumbra={0.5}
        decay={2}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      {/* Fill Light - Softer light from opposite side */}
      <spotLight 
        position={[-5, 8, 5]}
        angle={0.5}
        penumbra={0.7}
        decay={2}
        intensity={1}
        color="#f5f5f5"
      />

      {/* Rim Light - Edge lighting from back */}
      <spotLight 
        position={[0, 5, -8]}
        angle={0.6}
        penumbra={0.8}
        decay={2}
        intensity={1.5}
        color="#ffffff"
      />

      {/* Accent Light - Top down for highlights */}
      <directionalLight 
        position={[0, 15, 0]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />

      {/* Side accent lights for depth */}
      <pointLight 
        position={[8, 3, 3]}
        intensity={1}
        decay={2}
        color="#ffffff"
      />
      <pointLight 
        position={[-8, 3, 3]}
        intensity={0.8}
        decay={2}
        color="#f0f0f0"
      />
    </group>
  )
}

export default StudioLights