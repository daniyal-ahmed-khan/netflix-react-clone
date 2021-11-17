import React, { useEffect, useState } from "react";
import "./Nav.css";
function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
        className="nav_logo"
        alt="netflix logo"
      />

      <img
        src="https://alfafafoods.com/wp-content/uploads/2020/10/PngJoy_gray-circle-login-user-icon-png-transparent-png_2750635-1.png"
        className="nav_avatar"
        alt="netflix logo"
      />
    </div>
  );
}

export default Nav;
