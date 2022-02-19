import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import "App.scss";

import {useSelector} from "react-redux";
import {RootState} from "store";
import {Link} from 'react-router-dom';


interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="navbar">
      {authenticated ? (
        <div className="nav-content">
          <Link to="/home" className="insta-logo">Instakilogram</Link>

          <div className="nav-icons">
            <Link to="/addPost"><i className="far fa-plus-square"/></Link>
            {/*<i className="far fa-heart"/>*/}

          </div>
        </div>
      ) : (
        <div className="nav-content">
          <p className="insta-logo">Instakilogram</p>
          <InstagramIcon fontSize="large" />
        </div>
      )}
    </div>
  );
};
