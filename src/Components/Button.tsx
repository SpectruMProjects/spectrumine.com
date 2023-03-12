import classes from "./Button.module.css"
const Button = (props: any) => {

    return(<button className={classes.button} onClick={props.onClick} style={{width: props.width, height: props.height}}>{props.children}</button>);
}
export default Button;