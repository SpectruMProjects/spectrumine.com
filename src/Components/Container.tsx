import classes from "./Container.module.css";

const Containter = (props: any) => {
    return(
    <div className={classes.divblockup}>
    <div className={classes.divblock} style={{width: props.width, height: props.height}}>
        {props.children}
    </div>
    </div>);
}

export default Containter;