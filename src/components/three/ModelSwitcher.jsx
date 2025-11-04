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
            if (!child.material.transparent) {
                child.material.transparent = true;
            }
            gsap.to(child.material, {
                opacity: opacity,
                duration: ANIMATION_DURATION,
                ease: 'power2.inOut',
            });
        }
    });
}

const moveGroup = (group, distance) => {
    if(!group) return;

    gsap.to(group.position, {
        x: distance,
        duration: ANIMATION_DURATION,
        ease: 'power2.inOut',
    });
}


const ModelSwitcher = ({scale, isMobile}) => {
  const smallMacBookRef = React.useRef();
  const largeMacBookRef = React.useRef();
  const isInitialized = React.useRef(false);

  // Fix: scale 0.08 = 16" (large), scale 0.06 = 14" (small)
  // Handle mobile adjustment: if scale is 0.05 (0.08 - 0.03) or 0.03 (0.06 - 0.03), treat as their base values
  const actualScale = isMobile ? (scale < 0.06 ? 0.06 : 0.08) : scale;
  const showLargeMacBook = actualScale === 0.08;

  // Initialize positions on mount only once
  React.useEffect(() => {
    if (smallMacBookRef.current && largeMacBookRef.current && !isInitialized.current) {
      // Calculate initial scale correctly based on current props
      const initialActualScale = isMobile ? (scale < 0.06 ? 0.06 : 0.08) : scale;
      const initialShowLarge = initialActualScale === 0.08;
      
      // Set initial positions without animation
      if (initialShowLarge) {
        largeMacBookRef.current.position.x = 0;
        smallMacBookRef.current.position.x = -OFFSET_DISTANCE;
        // Set initial opacity directly without animation
        largeMacBookRef.current.traverse((child) => {
          if(child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 1;
          }
        });
        smallMacBookRef.current.traverse((child) => {
          if(child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        });
      } else {
        smallMacBookRef.current.position.x = 0;
        largeMacBookRef.current.position.x = OFFSET_DISTANCE;
        // Set initial opacity directly without animation
        smallMacBookRef.current.traverse((child) => {
          if(child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 1;
          }
        });
        largeMacBookRef.current.traverse((child) => {
          if(child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        });
      }
      isInitialized.current = true;
    }
  }, []); // Only run once on mount

  useGSAP(() => { 
    // Wait for refs to be ready and initialization complete
    if (!smallMacBookRef.current || !largeMacBookRef.current || !isInitialized.current) return;

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

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
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