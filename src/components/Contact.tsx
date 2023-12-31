import { motion } from "framer-motion"

import { pageTransition, pageVariants } from "../App"
import PageHeading from "../utils/PageHeading"
import SocailLinks from "../utils/SocailLinks"



const Contact = () => {



    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="contact-page" id="contact">
            <PageHeading heading="Contact" />
            <section>
                <div className="contact-content">
                    <h2 className="text-primary">Let's Connect</h2>
                    <p>Have a cool idea for your project? Need reliable partner to improve your product? I am here to help you uncomplicate your product development. </p>
                    <SocailLinks />
                </div>
                {/* <div className="right-side">


                    <form name="contact" method="post" >
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="feild">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter your name" required />
                        </div>
                        <div className="feild">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" placeholder="Enter your email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                        </div>
                        <div className="feild">
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" placeholder="Enter your message" required />
                        </div>
                        <button type="submit" className="btn primary submit-btn">Submit</button>
                    </form>
                </div> */}
            </section>

        </motion.div>
    )
}

export default Contact
