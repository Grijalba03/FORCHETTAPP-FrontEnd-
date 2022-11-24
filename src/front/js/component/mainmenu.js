import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "../../styles/mainmenu.css";

export const MainMenu = () => {
  const [isOpen, setIsopen] = useState(false);

  const menu = () => {
    // isOpen === true ? setIsopen(false) : setIsopen(true);
    setIsopen(!isOpen);
  };

  return (
    <div className="container-menu">
      <div className="text-center">
        <button
          type="button"
          onClick={menu}
          className="btn btn-primary rounded-circle"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <p>Menu</p>
      </div>
      <div className="text-center">
        <i className="fa-regular fa-circle-user iconmod"></i>
      </div>
      <div className="text-center">
        <i className="fa-solid fa-user-plus iconmod"></i>
      </div>
      <div className="text-center">
        <i className="fa-solid fa-right-to-bracket iconmod"></i>
      </div>
      <div className="text-center">
        <i className="fa-solid fa-heart iconmod"></i>
      </div>

      <div className={`sidebar ${isOpen == true ? "active" : ""}`}>
        <div className="sd-header">
          <h3 className="mb-0">Main Menu</h3>
          <div className="btn btn-primary" onClick={menu}>
            <i className="fa fa-times"></i>
          </div>
        </div>
        <div className="sd-body">
          <ul>
            <li>
              <Link to="/register" className="sd-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/register" className="sd-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="sd-link">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/register" className="sd-link">
                Random
              </Link>
            </li>
            <h4>Categories</h4>
            <li>
              <Link to="/register" className="sd-link">
                Breakfast
              </Link>
            </li>
            <li>
              <Link to="/register" className="sd-link">
                Lunch
              </Link>
            </li>
            <li>
              <Link to="/register" className="sd-link">
                Brunch
              </Link>
            </li>
            <li>
              <Link to="/register" className="sd-link">
                Dinner
              </Link>
            </li>
            <li>
              <Link to="/register" className="sd-link">
                Salads
              </Link>
            </li>
            <li>
              <Link to="/register" className="sd-link">
                View more...
              </Link>
            </li>
            <h4>Extra</h4>
            <li>
              <Link to="/register" className="sd-link">
                blablablah
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
        onClick={menu}
      ></div>
    </div>
  );
};

// ReactDOM.render(<MainMenu />, document.getElementById("app"));