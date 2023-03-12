import React from "react";
const BigBabyText = (props: any) => {
    return (<div>
        <h1 style={{textAlign: "center", fontSize: props.size, fontWeight: 200, margin: props.margin}}>{props.children}</h1>
    </div>);
}

export default BigBabyText;