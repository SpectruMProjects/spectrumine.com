import BigBabyText from "./BigBabyText";
import Container from "./Container";
import classes from "./ServerContainer.module.css"

const ServerContainer = (props: any) => {
    let title = props.title ? props.title : "Сервер";
    let discription = props.discription ? props.discription : "В разработке...";
    let additional : Array<string> = props.additional ? props.additional : null;
    function AdditionalDiscr(element : string)
    {
        return (<div className={classes.additional}>{element}</div>);   
    }
    return(<Container>
        <div className={classes.main} style={{backgroundImage: `url("${process.env.PUBLIC_URL}/${props.background}")`}}><div>
        <BigBabyText>{title}</BigBabyText>
        <p style={{fontSize: "1dvw"}}>{discription}</p>
        </div>
        <div className={classes.additionalup}>{additional != null && additional.map(x => AdditionalDiscr(x))}</div>
        </div>
    </Container>);
}
export default ServerContainer;