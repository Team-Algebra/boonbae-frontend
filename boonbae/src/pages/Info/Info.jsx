import { useParams } from "react-router-dom";

import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Comments } from "./components/Comments";

import "../../styles/Info.css";

const Info = () => {

    const { infoid } = useParams();

    return (
        <section className="info">  
            <Header />
            <Body />
            <Comments item_id={infoid}/>
        </section>
        
    )
}

export default Info;