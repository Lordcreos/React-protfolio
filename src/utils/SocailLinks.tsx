import { motion, Variants } from 'framer-motion'
import React, { useState } from 'react'

const socailHoverVariants: Variants = {
    visible: { pathLength: [1, 0, 1] },
    hidden: { pathLength: 1, strokeWidth: 2 },
}
const SocailLinks = () => {
    const [gitHubHover, setGitHubHover] = useState(false)
    const [linkedinHover, setLinkedinHover] = useState(false)
    const [instaHover, setInstaHover] = useState(false)


    return (
        <div className="social-links">
            <div className="vertical-line top"></div>
            {/* linkedin */}
            <a href="https://www.linkedin.com/in/leonardo-sanchez-fullstack-developer/" target="_blank" rel="noreferrer">
                <motion.svg
                    onHoverStart={() => setLinkedinHover(true)}
                    onHoverEnd={() => setLinkedinHover(false)}
                    width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        variants={socailHoverVariants}
                        initial="hidden"
                        animate={linkedinHover ? "visible" : ""}
                        d="M26.6667 13.3334C29.3189 13.3334 31.8624 14.3869 33.7378 16.2623C35.6131 18.1377 36.6667 20.6812 36.6667 23.3334L36.6667 35L30 35L30 23.3334C30 22.4493 29.6488 21.6015 29.0237 20.9764C28.3986 20.3512 27.5507 20 26.6667 20C25.7826 20 24.9348 20.3512 24.3097 20.9764C23.6845 21.6015 23.3334 22.4493 23.3334 23.3334L23.3334 35L16.6667 35L16.6667 23.3334C16.6667 20.6812 17.7203 18.1377 19.5956 16.2623C21.471 14.3869 24.0145 13.3334 26.6667 13.3334V13.3334Z" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <motion.path
                        variants={socailHoverVariants}
                        initial="hidden"
                        animate={linkedinHover ? "visible" : ""}
                        d="M9.99998 15L3.33331 15L3.33331 35L9.99998 35L9.99998 15Z" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <motion.path
                        variants={socailHoverVariants}
                        initial="hidden"
                        animate={linkedinHover ? "visible" : ""}
                        d="M6.66665 10C8.5076 10 9.99998 8.50766 9.99998 6.66671C9.99998 4.82576 8.5076 3.33337 6.66665 3.33337C4.8257 3.33337 3.33331 4.82576 3.33331 6.66671C3.33331 8.50766 4.8257 10 6.66665 10Z" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </motion.svg>
            </a>

            {/* github */}
            <a href={"https://github.com/Lordcreos"} target="_blank" rel="noreferrer">
                <motion.svg
                    onHoverStart={() => setGitHubHover(true)}
                    onHoverEnd={() => setGitHubHover(false)}
                    width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                        <motion.path
                            variants={socailHoverVariants}
                            initial="hidden"
                            animate={gitHubHover ? "visible" : ""}
                            d="M26.6666 36.6667L26.6666 30.2167C26.7292 29.422 26.6218 28.6231 26.3517 27.873C26.0815 27.123 25.6549 26.4391 25.1 25.8667C30.3333 25.2834 35.8333 23.3001 35.8333 14.2001C35.8329 11.8731 34.9378 9.63539 33.3333 7.95006C34.0931 5.91424 34.0394 3.66397 33.1833 1.66673C33.1833 1.66673 31.2166 1.08339 26.6666 4.13339C22.8467 3.0981 18.82 3.0981 15 4.13339C10.45 1.08339 8.48331 1.66673 8.48331 1.66673C7.62727 3.66397 7.57355 5.91424 8.33331 7.95006C6.71686 9.64789 5.82085 11.9058 5.83331 14.2501C5.83331 23.2834 11.3333 25.2667 16.5666 25.9167C16.0183 26.4833 15.5954 27.1591 15.3255 27.8999C15.0556 28.6408 14.9447 29.4302 15 30.2167L15 36.6667M15 31.6667C6.66665 34.1667 6.66665 27.5001 3.33331 26.6667L15 31.6667Z" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="40" height="40" fill="white" />
                        </clipPath>
                    </defs>
                </motion.svg>
            </a>

            {/* Whatsapp */}
            <a href="https://api.whatsapp.com/send?phone=593992896292&text=Hola%20%2C%20He%20visto%20tu%20perfil%20y%20me%20gustaria%20...." target="_blank" rel="noreferrer">

                <motion.svg
                    onHoverStart={() => setInstaHover(true)}
                    onHoverEnd={() => setInstaHover(false)}
                    width="35" height="35" viewBox="0 0 50 50 " fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        variants={socailHoverVariants}
                        initial="hidden"
                        animate={instaHover ? "visible" : ""}
                        d="M24,2.5A21.52,21.52,0,0,0,5.15,34.36L2.5,45.5l11.14-2.65A21.5,21.5,0,1,0,24,2.5ZM13.25,12.27h5.86a1,1,0,0,1,1,1,10.4,10.4,0,0,0,.66,3.91,1.93,1.93,0,0,1-.66,2.44l-2.05,2a18.6,18.6,0,0,0,3.52,4.79A18.6,18.6,0,0,0,26.35,30l2-2.05c1-1,1.46-1,2.44-.66a10.4,10.4,0,0,0,3.91.66,1.05,1.05,0,0,1,1,1v5.86a1.05,1.05,0,0,1-1,1,23.68,23.68,0,0,1-15.64-6.84,23.6,23.6,0,0,1-6.84-15.64A1.07,1.07,0,0,1,13.25,12.27Z" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <motion.path
                        variants={socailHoverVariants}
                        initial="hidden"
                        animate={instaHover ? "visible" : ""}
                        d="M25.5208 9.47913L25.5308 9.47913" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </motion.svg>
            </a>

            <div className="vertical-line down"></div>

        </div>

    )
}

export default SocailLinks

