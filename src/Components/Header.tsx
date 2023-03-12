import classes from "./Header.module.css";

const Header = (props: any) => {
    return(<div className={classes.head}><h1 className={classes.h1}>SpectruMine.com</h1><h1 className={classes.h1} style={{textAlign: "right"}}>Платформа серверов Minecraft</h1></div>);
}
export default Header;