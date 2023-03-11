import classes from "./Container.module.css";

const Containter = (props: any) => {
    return(
    <div className={classes.divblockup}>
    <div className={classes.divblock} style={{maxWidth: props.width, maxHeight: props.height}}>
        {props.children}
    </div>
    </div>);
}

export default Containter;