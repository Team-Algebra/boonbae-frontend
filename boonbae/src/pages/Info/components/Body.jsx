import { useEffect, useState } from "react"

export const Body = ({ item }) => {
    
    const [itemInfo, setItemInfo] = useState({ process : [], detail : []});


    useEffect(() => {
        console.log(item)
        if (item.name === undefined || !(item.process instanceof Object)) return;
        setItemInfo({process: item.process, detail: item.description})

    }, [item])

    return (
        <section className="info-body">
            <div className="info-body-way">
                <div>버리는 법</div>
                <ol>
                    {itemInfo.process.map((process, idx) => { return <li key={idx}>{process}</li>})}
                </ol>
            </div>
            <div className="info-body-details">
                <div>상세 설명</div>
                <ol>
                    {itemInfo.detail.map((detail, idx) => { return <li key={idx}>{detail}</li>})}
                </ol>
            </div>
        </section>
    )
}