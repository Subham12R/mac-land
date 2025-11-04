import React from 'react'
import title from '/title.png'
import video from '/videos/hero.mp4'

const Hero = () => {

  const videoRef = React.useRef(null)

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playBackRate = 2;
    }
  }, [])

  return (
    <section id="hero">
        <div>
            <h1>Apple 3D</h1>
            <img src={title} alt="Mackbook Title Image" />
        </div>

        <video ref={videoRef} src={video} autoPlay muted playsInline />

        <button>Buy</button>
        <p>From $1,599  or $133/mo for 12 months</p>


    </section>
  )
}

export default Hero