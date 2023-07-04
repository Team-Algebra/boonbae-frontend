import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Comments } from "./components/Comments";

import "../../styles/Info.css";

const Info = () => {
    return (
        <section className="info">  
            <Header />
            <Body />
            <Comments />
        </section>
        
    )
}

export default Info;