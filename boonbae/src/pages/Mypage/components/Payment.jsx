import { useState } from "react";
import "../../../styles/Payment.css";
import axios from "axios";
import TossImg from "../../../assets/toss.png";
import KakaoImg from "../../../assets/kakao.png";
import TossImgDisabled from "../../../assets/toss_disabled.png";
import KakaoImgDisabled from "../../../assets/kakao_disabled.png";

const Payment = ({ setChargePointStat, orderName, nickname }) => {
  const [paymentMethod, setPaymentMethod] = useState("kakaopay");
  const [paymentAmount, setPaymentAmount] = useState("1000");

  const chargeEcoPoint = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_PROXY}/point`,
        {
          amount: paymentAmount / 100,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setChargePointStat(2);
      } else {
        console.error("결제 실패 : ", response.status);
        setChargePointStat(1);
      }
    } catch (error) {
      console.error("결제 실패 : 서버 통신 오류", error);
      setChargePointStat(1);
    }
  };

  const handlePayment = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp80111716"); // 가맹점 식별코드 반드시 env처리

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: paymentMethod,
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: paymentAmount, // 결제금액
      name: orderName, // 주문명
      buyer_name: nickname, // 구매자 이름
      buyer_tel: "", // 구매자 전화번호
      buyer_email: "", // 구매자 이메일
      buyer_addr: "", // 구매자 주소
      buyer_postcode: "", // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, error_msg } = response;

    if (success) {
      chargeEcoPoint();
    } else {
      console.error(error_msg);
      setChargePointStat(1);
    }
  }

  return (
    <>
      <h1 className="payment-h1">에코포인트 충전하기</h1>
      <div className="payment-amount-wrapper">
        {["1000", "3000", "5000", "10000"].map((value) => (
          <div
            key={value}
            className={
              value === paymentAmount
                ? "payment-amount"
                : "payment-amount-click"
            }
            onClick={() => setPaymentAmount(value)}
          >
            <p> {value}원</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="payment-h2">결제방식</h2>
        <div className="payment-method-wrapper">
          <div
            className={
              paymentMethod === "kakaopay"
                ? "payment-method-kakao"
                : "payment-method"
            }
            onClick={() => setPaymentMethod("kakaopay")}
          >
            <div
              style={{
                width: paymentMethod === "kakaopay" ? "90px" : "70px",
                height: paymentMethod === "kakaopay" ? "90px" : "70px",
                marginLeft: "auto",
                marginRight: "auto",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={paymentMethod === "kakaopay" ? KakaoImg : KakaoImgDisabled}
                style={{ width: "101%", height: "auto" }}
              />
            </div>
          </div>
          <div
            className={
              paymentMethod === "tosspay"
                ? "payment-method-toss"
                : "payment-method"
            }
            onClick={() => setPaymentMethod("tosspay")}
          >
            <div
              style={{
                width: "110px",
                height: "110px",
                marginLeft: "auto",
                marginRight: "auto",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={paymentMethod === "tosspay" ? TossImg : TossImgDisabled}
                style={{ width: "101%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="payment-button" onClick={handlePayment}>
        충전하기
      </button>
    </>
  );
};

export default Payment;
