import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import { Header } from "./components/Header";

import "../../styles/Fund.css"
import { Body } from "./components/Body";

const FundDetail = () => {
    const { fundPk } = useParams();
    console.log(fundPk)

    const [fund, setFund] = useState({
        title: "",
        first_category_name: "",
    });


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/funding/${fundPk}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                console.log(res.data)
                setFund(res.data);
            })
        .catch(err=>{alert("펀딩 상세정보를 불러오는데 실패하였습니다!")})
    }, [])


    return (
        <section className="fund-detail-container">
            <Header fund={fund} />
            <Body fund={fund} />
            <hr />
            <section className="fund-content">
                {fund.description}
            </section>
        </section>
    )
}

export default FundDetail;