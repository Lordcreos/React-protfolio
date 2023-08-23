import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../App";

import ExperiencesList, { ExperienceArray } from "../utils/Experience";
import PageHeading from "../utils/PageHeading";
import ProfilePic from "../utils/profile.jpg";
import SkillsContainer from "../utils/SkillsContainer";



function myAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const frontEndSkills: Array<string> = [
    "HTML,Css,JS", "Typescript", "React.js", "Redux", "Scss", "React Bootstrap", "Framer Motion", "Material UI", "Styled Components", "Next.js ", "Tailwind CSS"
]
const backEndSkills: Array<string> = [
    "Nodejs", "Typescript", "Expressjs", "Mongo DB", "REST APIs", "Graphql"
]
const toolsUsed: Array<string> = [
    "NPM and Yarn", "Git", "Figma", "VS Code", "Postman", "Netlify", "Azure"
]
const otherSkills: Array<string> = [
    "Mobile First design", "Responsive Web Design", "SEO", "Agile Methodology", "Scrum", "Jira"
]

const experienceArray = [
    {
        company: "Pickatale (Part Time)",
        experience: "Mar. 2023 - present",
        list: [
            "Architected scalable front-end in React and back-end in Node.js and MongoDB",
            "Implemented new features in the online book creation platform used by 50k+ customers",
            "Fixed critical bugs in the production environment through diligent debugging"
        ],
        designation: "Full Stack Developer"
    },
    {
        company: "Kruger Corp (Part Time)",
        experience: "Jun, 2022 - May, 2023",
        list: [
            "Incorporated third-party APIs into the web application for data exchange and real-time updates",
            "Wrote unit tests for components using Jest  to ensure code quality and reliability",
            "Developed an interactive data visualization dashboard using React,js and Tailwind to display real-time data",
            "Developed a custom UI library that increased developer productivity and code reuse",
            "Implemented a single-page application using React and Redux that improved overall performance and usability"
        ],
        designation: "Full Stack Developer"
    },
    {
        company: "Jalasoft",
        experience: "Aug. 2021 - Jan. 2023",
        list: [
            "Developed and shipped new video interviewing product feature used by 100+ clients",
            "Debugged integration issues between front-end, APIs and third-party tools",
            "Documented complex workflows with clear diagrams and step-by-step instructions"
        ],
        designation: "Full Stack Developer"
    },
    {
        company: "STB Technology",
        experience: "Dec. 2019 - Nov. 2020",
        list: [
            "Created responsive interfaces and redesigned company homepage",
            "Coordinated usability testing and bug fixes",
            "Proficient in JavaScript, React",
            "Managed project and web strategy planning",
            "Built reusable code to minimize costs"
        ],
        designation: "Frontend Developer"
    },
    {
        company: "ORESA IMAGINATION",
        experience: "Apr. 2018 - Apr. 2019",
        list: [
            "Contributed to back-end APIs and experience",
            "Developed e-commerce and inventory management systems",
            "Conferred with front-end developers on algorithms and flowcharts",
            "Wrote clean code for functional, sustainable web applications",
            "Upgraded interfaces and improved performance of existing software"
        ],
        designation: "Backend Developer"
    }
];


const About = () => {

    // const { docs: any } = []


    return (
        <motion.div
            className="about-page" id="about"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <PageHeading heading="About" />
            <section>
                <div className="profile-pic">
                    <img src={ProfilePic} alt="profile-pic" />
                </div>
                <div className="description">
                    <div className="job-title">
                        <h2 className="text-primary">
                           FullStack Developer
                    </h2>
                    </div>
                    <div className="bio">
                        <div>
                            <strong><span className="text-primary">&#x25B6;</span> Age</strong>
                            <p>{myAge("1996-08-21")}</p>
                        </div>
                        <div>
                            <strong><span className="text-primary">&#x25B6;</span> Education</strong>
                            <p>BSc Computer Science</p>
                        </div>
                        <div>
                            <strong><span className="text-primary">&#x25B6;</span> Email</strong>
                            <p>leonardosanchez4h@hotmail.com</p>
                        </div>
                        <div>
                            <strong><span className="text-primary">&#x25B6;</span> City</strong>
                            <p>Quito,Ecuador</p>
                        </div>
                    </div>

                    <div className="skills">
                        <div className="heading">
                            <svg className="line-two" width={"2%"} height="3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 3L985 2.99991" stroke="#efefef" strokeWidth="2" />
                            </svg>
                            <h2 className="text-primary">Skills</h2>
                            <svg className="line-two" width="100%" height="3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 3L985 2.99991" stroke="#efefef" strokeWidth="2" />
                            </svg>
                        </div>

                        <div className="container-skills">
                            <SkillsContainer skillType="Frontend" skillsList={frontEndSkills} />
                            <SkillsContainer skillType="Backend" skillsList={backEndSkills} />
                            <SkillsContainer skillType="Tools used" skillsList={toolsUsed} />
                            <SkillsContainer skillType="Other skills" skillsList={otherSkills} />
                        </div>

                        <div className="heading">
                            <svg className="line-two" width={"2%"} height="3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 3L985 2.99991" stroke="#efefef" strokeWidth="2" />
                            </svg>
                            <h2 className="text-primary">Experience</h2>
                            <svg className="line-two" width="100%" height="3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 3L985 2.99991" stroke="#efefef" strokeWidth="2" />
                            </svg>
                        </div>
                        
                        <ExperiencesList experiences = {experienceArray}/>



                    </div>

                </div >
            </section >
        </motion.div >

    )
}

export default About
