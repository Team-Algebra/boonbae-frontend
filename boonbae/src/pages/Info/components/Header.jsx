import { useState, useEffect } from "react"

export const Header = ({ item }) => {
    const [itemInfo, setItemInfo] = useState({ item_name: "", item_tags: [], item_type: "", item_views: 0,});
    
    useEffect(() => {
        if(item.name === undefined) return;
        setItemInfo({
            item_name: item.name, item_tags: item.tags,
            item_type: item.types, item_views: item.viewCnt,
            item_img : item.imageUrl
        })
    }, [item])


    return (
        <section className="info-header">
                
            <div className="info-header-item">
                <div className="info-header-img-wrapper">
                    <img className="info-header-img" src={itemInfo.item_img == "string" ? "https://via.placeholder.com/150" : itemInfo.item_img} />
                </div>
                <div className="info-header-item-title">
                    <div>{ itemInfo.item_name }</div>
                    <div>{ itemInfo.item_tags.join(" ") }</div>
                </div>
            </div>
            <div className="info-header-detail">
                <div className="info-header-type">{itemInfo.item_type}</div>
                <div className="info-header-view">조회수 : { itemInfo.item_views}</div>
            </div>

        </section>
    )
}