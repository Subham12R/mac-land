import { PresentationControls } from '@react-three/drei';
import React from 'react'
import MacbookModel14 from '../models/Macbook-14'
import MacbookModel16 from '../models/Macbook-16'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
    if(!group) return;

    group.traverse((child) => {
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, {
                opacity: opacity,
                duration: ANIMATION_DURATION,
                // ease: 'power2.inOut',
            });
        }
    });
}

const moveGroup = (group, distance) => {
    if(!group) return;

    gsap.to(group.position, {
        x: distance,
        duration: ANIMATION_DURATION,
        // ease: 'power2.inOut',
    });
}


const ModelSwitcher = ({scale, isMobile}) => {
  const smallMacBookRef = React.useRef();
  const largeMacBookRef = React.useRef();

  // Fix: scale 0.08 = 16" (large), scale 0.06 = 14" (small)
  const showLargeMacBook = scale === 0.08 || scale === 0.06;

  useGSAP(() => { 
    // Wait for refs to be ready
    if (!smallMacBookRef.current || !largeMacBookRef.current) return;

    if(showLargeMacBook) {
      // Show large (16"), hide small (14")
      moveGroup(largeMacBookRef.current, 0);
      moveGroup(smallMacBookRef.current, -OFFSET_DISTANCE);
      fadeMeshes(largeMacBookRef.current, 1);
      fadeMeshes(smallMacBookRef.current, 0);
    } else {
      // Show small (14"), hide large (16")
      moveGroup(smallMacBookRef.current, 0);
      moveGroup(largeMacBookRef.current, OFFSET_DISTANCE);
      fadeMeshes(smallMacBookRef.current, 1);
      fadeMeshes(largeMacBookRef.current, 0);
    }
  }, [scale, showLargeMacBook]);

  // Initialize positions on mount
  React.useEffect(() => {
    if (smallMacBookRef.current && largeMacBookRef.current) {
      // Set initial positions based on current scale
      if (showLargeMacBook) {
        largeMacBookRef.current.position.x = 0;
        smallMacBookRef.current.position.x = -OFFSET_DISTANCE;
        fadeMeshes(largeMacBookRef.current, 1);
        fadeMeshes(smallMacBookRef.current, 0);
      } else {
        smallMacBookRef.current.position.x = 0;
        largeMacBookRef.current.position.x = OFFSET_DISTANCE;
        fadeMeshes(smallMacBookRef.current, 1);
        fadeMeshes(largeMacBookRef.current, 0);
      }
    }
  }, [ showLargeMacBook ]);

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    // polar: [-Math.PI, Math.PI],
    azimuth: [-Infinity, Infinity],
    config: {mass: 1, friction: 26, tension: 0},
  }
    return (
    <>
        <PresentationControls {...controlsConfig}>
            <group ref={largeMacBookRef}>
                <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
            </group>
        </PresentationControls>
        <PresentationControls {...controlsConfig}>
            <group ref={smallMacBookRef}>
                <MacbookModel14 scale={isMobile ? 0.05 : 0.06} />
            </group>
        </PresentationControls>
    </>
    
  )
}

export default ModelSwitcher