import axios from "axios";

import { useState } from "react";

import { Input } from "./components/Input";

const Add = () => {
    const input_list = [
        { name: "name", type: "text", placeholder: "분리배출 이름을 입력해주세요", add : false, input: 1 },
        { name: "process", type: "text", placeholder: "분리배출 과정을 입력해주세요", add: true, input: 1 },
        { name: "description", type: "text", placeholder: "분리배출 설명을 입력해주세요", add: true, input: 1 },
        { name: "types", type: "text", placeholder: "분리배출 종류를 입력해주세요", add: false, input: 1 },
        { name: "image_url", type: "file", placeholder: "분리배출 이미지를 입력해주세요", add: false, input : 1 },
        { name: "tags", type: "text", placeholder: "분리배출 태그를 입력해주세요", add: true, input : 1 },
    ]

    const [inputs, setInputs] = useState([
        { type: "name", value: "" },
        { type: "process", value: "" },
        { type: "description", value: "" },
        { type: "types", value: "" },
        { type: "image_url", value: "" },
        { type: "tags", value: "" },
    ]);

    const submitHandler = async () => {
        const data = { name: "", process: [], description: [], types: [], image_url: "", tags: [] }
        inputs.map((input) => {
            if (input.type === "name") {
                data.name = input.value;
            } else if (input.type === "process") {
                data.process.push(input.value);
            } else if (input.type === "description") {
                data.description.push(input.value);
            } else if (input.type === "types") {
                data.types.push(input.value);
            } else if (input.type === "image_url") {
                data.image_url = input.value;
            } else if (input.type === "tags") {
                data.tags.push(input.value);
            }
        })
        axios.post(`${process.env.REACT_APP_PROXY}/recycling`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                alert("분리배출 정보 추가에 성공했습니다.")
                console.log(res);
            })
            .catch((err) => {
                alert("분리배출 정보 추가에 실패했습니다.")
                console.log(err);
            })
    }



    return (
        <section className="admin-container">
            {input_list.map((input, index) => (
                <Input key={index} values={inputs} setValues={setInputs} inputConfig={input}
                />
            ))}
            <div className="admin-add-input-wrapper">
                <button className="admin-add-btn" onClick={submitHandler}>추가하기</button>
            </div>
            
        </section>
    )
}

export default Add;