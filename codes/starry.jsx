
import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Stars } from '@react-three/drei';

const StarField = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <Canvas>
      <Stars radius={50} count={1000} factor={4} fade speed={2} />
    </Canvas>
  </div>
);

export default StarField;
