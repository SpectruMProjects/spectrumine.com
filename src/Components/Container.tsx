import React from 'react';
import classes from "./Container.module.css"
const Container = (props: any) => {
    let isScaled = React.useState(false);
    const privateOnClick = (_props : any) =>
    {
        isScaled[1](true);
        if(props.onClick) {
        props.onClick(_props)
        }
        setInterval(() => {
            if(isScaled[0]) isScaled[1](false);
        }, 500);
    }
    return(<div onClick={privateOnClick} style={{transform: isScaled[0] ? "scale(0.9)" : undefined}} className={classes.container}>{props.children}</div>)
}
export default Container