import { useParams } from "react-router-dom";

import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Comments } from "./components/Comments";

import axios from "axios";

import "../../styles/Info.css";
import { useEffect, useState } from "react";

const Info = () => {

    const { infoid } = useParams();

    const [item, setItem] = useState({})
    useEffect(() => {
        console.log("fetching data...")
        
        axios.get(`${process.env.REACT_APP_PROXY}/recycling/${infoid}`)
            .then(res => {
                console.log(res.data)
                setItem(res.data)
            })
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