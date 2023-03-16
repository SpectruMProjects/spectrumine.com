import React from "react";
import { Link } from "react-router-dom"
import classes from "./NavBar.module.css";
import "./NavBar.module.css"
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
const NavBar = () => {
    return(<div style={{position: "fixed", right: "0px"}}>
        <Menu menuButton={<MenuButton>Menu</MenuButton>}>
            <MenuItem className={classes.MenuItem}>Hello</MenuItem>
            <MenuItem className={classes.MenuItem}>Item2</MenuItem>
            <MenuItem className={classes.MenuItem}>Item3</MenuItem>
            <MenuItem className={classes.MenuItem}>Item4</MenuItem>
        </Menu>
        </div>);
}
export default NavBar;