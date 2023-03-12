import React from "react";
const BigBabyText = (props: any) => {
    return (<div>
        <h1 style={{textAlign: "center", fontSize: props.size, fontWeight: 600, margin: props.margin}}>{props.children}</h1>
    </div>);
}

export default BigBabyText;