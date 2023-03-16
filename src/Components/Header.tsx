import classes from "./Header.module.css";
import NavBar from "./NavBar";

const Header = (props: any) => {
    return(<div className={classes.head}><h1 className={classes.items}>SpectruMine.com</h1><div className={classes.navbar}><NavBar/></div></div>);
}
export default Header;