import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
import { isMobile } from "../utils/constants";

interface INavLink {
  title: string;
  path: string;
}

interface Props {
  resumeUrl: string;
}

const activeLink = (pathname: string, elementPath: string): string => {
  if (pathname === elementPath) return "navlink active";
  else return "navlink";
};

const menuStyles: React.CSSProperties = {
  position: "fixed",
  top: "1rem",
  right: "1rem",
  backgroundColor: "rgba(0,0,0,.4)",
  borderRadius: "50%",
  height: "50px",
  width: "50px",
};

// const navLinks: INavLink[] = [
//     {
//         title: "Home",
//         path: "/"
//     },
//     {
//         title: "Projects",
//         path: "/project"
//     },
//     {
//         title: "About",
//         path: "/about"
//     },
//     {
//         title: "Contact",
//         path: "/contact"
//     },
// ]

const navLinks: INavLink[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Navbar: React.FC<Props> = ({ resumeUrl }) => {
  const [ref, inView] = useInView();
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => {
    setIsMenuBtnClicked(false);
  };

  return (
    <nav ref={ref}>
      <Link to="/">
        <div className="logo">Leo</div>
      </Link>
      <ul className={isMenuBtnClicked ? "nav-links active" : "nav-links"}>
        {navLinks.map(({ path, title }) => (
          <li
            className={activeLink(pathname, path)}
            onClick={closeMenu}
            key={title}
          >
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>

      <div className="nav-buttons">
        {!isMobile && (
          // <Link to="/project" >
          //     <button className="btn outlined-primary">Projects</button>
          // </Link>
          <Link to="/contact">
            <button className="btn outlined-primary">Contact</button>
          </Link>
        )}
        <a href={resumeUrl}>
          <button className="btn primary">Resume</button>
        </a>
      </div>
      {isMobile && (
        <div
          style={!inView ? menuStyles : {}}
          className="hamburger-menu-button"
          onClick={() => setIsMenuBtnClicked(!isMenuBtnClicked)}
        >
          <div
            className={
              isMenuBtnClicked ? "hamburger-menu open" : "hamburger-menu"
            }
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
