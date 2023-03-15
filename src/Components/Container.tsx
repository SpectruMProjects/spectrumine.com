import React from 'react';
import classes from "./Container.module.css"
const Container = (props: any) => {
    let isScaled = React.useState(false);
    function privateOnClick(_props: any)
    {
        if(onclick)
        props.onClick(_props);
    }
    return( 
    <div 
        onMouseDown={()=>isScaled[1](true)}
        onMouseUp={()=>isScaled[1](false)}
        onClick={(_props) => {privateOnClick(_props)}}
        style={{transform: isScaled[0] ? "scale(0.9)" : undefined}} 
        className={classes.container}>{props.children}</div>)
}
export default Container