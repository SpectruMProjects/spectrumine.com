import classes from "./Header.module.css";

const Header = (props: any) => {
    return(<div className={classes.head}><h1 className={classes.h1}>SpectruMine.com</h1><h1 className={classes.h1}>Here will be nav</h1></div>);
}
export default Header;