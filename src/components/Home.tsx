import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { pageTransition, pageVariants } from "../App";
import { isMobile } from "../utils/constants";
import SocailLinks from "../utils/SocailLinks";
import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import { readFileSync } from "fs";

interface Props {
  resumeUrl: string;
}

const Home: React.FC<Props> = ({ resumeUrl }) => {


  const line1 = "Hi,";
  const line2 = "I'm Leonardo";
  const line3 = "Web Developer";
  const line4 = "Full Stack developer | MERN stack developer";

  const textHoverVariants: Variants = {
    visible: { y: 0, scaleY: 1 },
    hover: {
      y: [-1, 2, -3, 1, 0],
      scaleY: [1, 1.2, 0.7, 1, 1.1],
      color: "#0ee958",
    },
    transition: { type: "spring" },
  };

  const fileName = 'Leonardo_Sanchez_-_Full_Stack_Developer .pdf';

  const handleDownloadResume = () => {
      const link = document.createElement('a');
      link.href = process.env.PUBLIC_URL + '/' + fileName;
      link.target = '_blank'; 
      link.download = fileName;
      link.click();
  };

  return (
    <>
      <motion.div
        className="home-page"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <section className="landing-left-section">
          <div className="text">
            <h1>
              {line1.split("").map((char: string, idx) => (
                <motion.span
                  initial="visible"
                  whileHover="hover"
                  variants={textHoverVariants}
                  key={idx}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <h1>
              {line2.split("").map((char: string, idx) => {
                if (char === "L")
                  return (
                    <motion.span
                      initial={{ y: -230, x: -100, scaleY: 0.8, opacity: 0 }}
                      animate={{
                        y: [-230, 5, -2, 3, 0],
                        x: [-100, 5, -2, 3, 0],
                        scaleY: [1, 0.5, 1.2, 0.8, 1],
                        opacity: 1,
                      }}
                      transition={{ type: "spring", duration: 1, delay: 1.2 }}
                      className="logo"
                      key={idx}
                    >
                      {char}
                    </motion.span>
                  );
                else if (char === "m")
                  return (
                    <motion.span
                      initial="visible"
                      whileHover="hover"
                      variants={textHoverVariants}
                      key={idx}
                    >
                      {char}&nbsp;
                    </motion.span>
                  );
                else
                  return (
                    <motion.span
                      initial="visible"
                      whileHover="hover"
                      variants={textHoverVariants}
                      key={idx}
                    >
                      {char}
                    </motion.span>
                  );
              })}
            </h1>
            <h1>
              {line3.split("").map((char: string, idx) => {
                if (char !== "b")
                  return (
                    <motion.span
                      initial="visible"
                      whileHover="hover"
                      variants={textHoverVariants}
                      key={idx}
                    >
                      {char}
                    </motion.span>
                  );
                else
                  return (
                    <motion.span
                      initial="visible"
                      whileHover="hover"
                      variants={textHoverVariants}
                      key={idx}
                    >
                      {char}&nbsp;
                    </motion.span>
                  );
              })}
            </h1>
            <p>
              {line4.split("").map((char: string, idx) => {
                if (char !== "k" && char !== "r" && char !== "|")
                  return (
                    <motion.span
                      initial="visible"
                      whileHover="hover"
                      variants={textHoverVariants}
                      key={idx}
                    >
                      {char}
                    </motion.span>
                  );
                else
                  return (
                    <motion.span
                      initial="visible"
                      whileHover="hover"
                      variants={textHoverVariants}
                      key={idx}
                    >
                      {char}&nbsp;
                    </motion.span>
                  );
              })}
            </p>
          </div>
          <div className="action-buttons">
            {/* <Link to="/project">
              <button className="btn primary">Projects</button>
            </Link> */}
            <Link to="/contact">
              <button className="btn primary">Contact</button>
            </Link>
            <button
              className="btn outlined-primary"
              onClick={handleDownloadResume}
            >
              Resume
            </button>
          </div>
        </section>
        {!isMobile && (
          <div className="landing-right-section">
            <motion.svg
              animate={{ rotateZ: -2 }}
              transition={{
                type: "power",
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                times: [0, 0.2, 1],
              }}
              width="352"
              height="400"
              viewBox="0 0 125 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ fill: "none", x: 25 }}
                animate={{ fill: "black", x: 0 }}
                transition={{ duration: 1, type: "spring" }}
                d="M102.89 99.51H57.24v-82c0-1.24-1-2.24-2.24-2.24H33.11c-1.24 0-2.24 1-2.24 2.24v100.96c0 1.24 1 2.24 2.24 2.24h69.79c1.24 0 2.24-1 2.24-2.24v-16.72a2.251 2.251 0 0 0-2.25-2.24z"
                fill="black"
              />
              <motion.path
                initial={{
                  strokeWidth: 2,
                  pathLength: 1,
                  stroke: "white",
                  pathOffset: 0,
                }}
                animate={{ x: 0, pathLength: 0, pathOffset: 2 }}
                transition={{
                  duration: 10,
                  type: "tween",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 1,
                  delay: 2,
                }}
                d="M102.89 99.51H57.24v-82c0-1.24-1-2.24-2.24-2.24H33.11c-1.24 0-2.24 1-2.24 2.24v100.96c0 1.24 1 2.24 2.24 2.24h69.79c1.24 0 2.24-1 2.24-2.24v-16.72a2.251 2.251 0 0 0-2.25-2.24z"
                fill="#0ee958"
              />
            </motion.svg>
          </div>
        )}

        <SocailLinks />
      </motion.div>
      {/* <Projects /> */}
      <About />
      <Contact />
    </>
  );
};

export default Home;
