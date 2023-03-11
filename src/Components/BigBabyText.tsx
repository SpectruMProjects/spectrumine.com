import React from "react";
const BigBabyText = (props: any) => {
    return (<div>
        <h1 style={{textAlign: "center", fontSize: props.size}}>{props.children}</h1>
    </div>);
}

export default BigBabyText;