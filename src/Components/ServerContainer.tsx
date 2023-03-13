import BigBabyText from "./BigBabyText";
import Container from "./Container";

const ServerContainer = (props: any) => {
    let title = props.title ? props.title : "Title";
    let description = props.description ? props.description : "Description";
    return(<Container>
        <div style={{padding: "0 1dvw"}}>
        <BigBabyText>{title}</BigBabyText>
        <p style={{fontSize: "1dvw"}}>{description}</p>
        </div>
    </Container>);
}
export default ServerContainer;