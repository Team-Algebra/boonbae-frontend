import axios from "axios";

import { useUserStore } from "../../../../../stores/userStore";
import { useEffect } from "react";

export const Input = ({ values, setValues, inputConfig }) => {
    const addInput = (type) => {
        setValues([...values, {
            type: type,
            value: ""
        }]);
    }

    const { user } = useUserStore();
    useEffect(() => {
        console.log(user);
    }, [])

    const hanleChange = (index, val) => {
        const newValues = [...values];
        newValues[index].value = val;
        setValues(newValues);
    }


    const imgUploadHandler = async (e, index) => {
        let file = e.target.files[0];
        // let name = Date.now() + e.target.files[0].name;
        // e.target.files[0].name = name;

        let res = await axios.post(`${process.env.REACT_APP_PROXY}/s3/presigned`, {
            "image_name": e.target.files[0].name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
        })
        
        axios.put(res.data.presigned_url, file, {
            headers: {
                "Content-Type": "image/*",
            }
        })
        .then(res => console.log(res.config.url.split("?")[0]))
            .catch(err => console.log(err));        

        const newValues = [...values];
        newValues[index].value = res.data.presigned_url.split("?")[0];
        console.log(newValues[index].value)
        setValues(newValues);
    }

    return (
        <div className="admin-add-input-wrapper">
            <label>{inputConfig.name}</label><br />
            {values.map((value, index) => {
                return value.type === inputConfig.name && (
                    <input
                        key={index}
                        type={inputConfig.type}
                        placeholder={inputConfig.placeholder}
                        value={
                            inputConfig.name === "image_url" ?
                                "" :
                                value.value
                        }
                        onChange={(e) => {
                            inputConfig.name === "image_url" ?
                                imgUploadHandler(e, index) :
                                hanleChange(index, e.target.value)
                        }}
                    />
                )
            })}

            {inputConfig.add && <button onClick={(e)=>addInput(inputConfig.name)}>+</button>}
        </div>
    )
}