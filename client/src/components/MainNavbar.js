import React, { Component } from "react";
import { Navbar, NavItem, NavLink } from "reactstrap";
import { NavLink as NLink, Link } from "react-router-dom"; // Be careful, NavLink is already exported from 'reactstrap'
// import logo from "../logo.svg";
import api from "../api";
import { Media } from 'reactstrap';
import { Profile } from './pages/Profile';



export default class MainNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  handleLogoutClick(e) {
    api.logout();
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  /* Set the width of the side navigation to 250px */
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("openNavbar").style.color = "white";
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("openNavbar").style.color = "#818181";
  }

  render() {
    return (
      <Navbar>
        <NavItem>
          <NavLink className="getHome" tag={NLink} to="/">
            IMMERSE
          </NavLink>
        </NavItem>
        {/* //trying to implement the new navbar */}
        <div id="mySidenav" className="sidenav">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={e => this.closeNav(e)}
          >
            &times;
          </a>
          <NavItem>
            <NavLink tag={NLink} to="/spots">
              Spots
            </NavLink>
          </NavItem>
          {!api.isLoggedIn() && (
            <NavItem>
              <NavLink tag={NLink} to="/signup">
                Signup
              </NavLink>
            </NavItem>
          )}
          {!api.isLoggedIn() && (
            <NavItem>
              <NavLink tag={NLink} to="/login">
                Login
              </NavLink>
            </NavItem>
          )}
          {api.isLoggedIn() && (
            <NavItem>
              <NavLink tag={NLink} to="/add-spot">
                Add your spot
              </NavLink>
            </NavItem>
          )}
          {api.isLoggedIn() && (
            <NavItem>
              <NavLink tag={NLink} to="/profile">
                Your Profile
              </NavLink>
            </NavItem>
          )}
          {api.isLoggedIn() && (
            <NavItem>
              <NavLink
                tag={Link}
                to="/"
                onClick={e => this.handleLogoutClick(e)}
              >
                Logout
              </NavLink>
            </NavItem>
          )}
        </div>
        <div>
        {api.isLoggedIn() && (
          <Media>
        <Media href="/Profile">
          <Media object src={{}}  alt="Generic placeholder image" />
        </Media>
        </Media>)}
        <span id="openNavbar" onClick={e => this.openNav(e)}>
          MENU
        </span>
        </div>
        {/* <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page --> */}
        <div id="main" />
      </Navbar>
    );
  }
}
