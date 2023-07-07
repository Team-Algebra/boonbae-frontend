import { useParams } from "react-router-dom";

import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Comments } from "./components/Comments";

import "../../styles/Info.css";
import { useEffect, useState } from "react";

const Info = () => {

    const { infoid } = useParams();

    const [item, setItem] = useState({})
    useEffect(() => {
        console.log("fetching data...")
        fetch(`${process.env.REACT_APP_PROXY}/recycling/${infoid}`)
            .then(res => res.json())
            .then(data => {setItem(data);});
    }, [infoid])

    return (
        <section className="info">  
            <Header item={item} />
            <Body item={item} />
            <Comments item_id={infoid}/>
        </section>
        
    )
}

export default Info;