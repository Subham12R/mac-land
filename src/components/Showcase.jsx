import React from 'react'

const Showcase = () => {
  return (
    <section id="showcase">
        <div className="media">
            <video src="/videos/game.mp4" loop autoPlay muted playsInline />
            <div className="mask">
                <img src="/mask-logo.svg" alt="" />
            </div>
        </div>

        <div className="content">
            <div className="wrapper">
                <div className="lg:max-w-md">
                    <h2>Rocket Chip</h2>

                    <div className="space-y-5 mt-7 pe-5 lg:pe-10"> 
                        <p>
                            Introducing {" "}
                            <span className="text-white">M4, the next generation of Apple Silicon.</span>    
                             M4 powers
                            
                        </p>    
                        <p>
                            It drives Apple Intelligence in iPad Pro, so you can wite, create, and acomplish more with ease. All in a design that's unbelievably thin, light, and powerful.
                        </p>

                        <p>
                            A brand-new display engine delivers breathtaking precision, color accuracy, and brightness. And a next-gen GPU with hardware-accelerated ray tracing brings console-level graphics to your fingertips.
                        </p>

                        <p className='text-primary'>
                            Learn more about Apple Intelligence
                        </p>
                    </div>

                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>4x faster</h3>
                            <p>pro rendering performance than M2</p>
                        </div>


                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>1.5x faster</h3>
                            <p>CPU performance than M2</p>
                        </div>

                    </div>
                    

                </div>
            </div>
        </div>
    </section>
  )
}

export default Showcase