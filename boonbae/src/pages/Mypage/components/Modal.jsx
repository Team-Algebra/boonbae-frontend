import React from "react";
import "../../../styles/Modal.css";
import "../../../styles/Payment.css";
import Payment from "./Payment";
import PayWarning from "../../../assets/payWarning.png";
import {useUserStore} from '../../../stores/userStore';

const Modal = ({ isOpen, closeModal, chargePointStat, setChargePointStat }) => {

  const {username} = useUserStore();

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={isOpen ? "modal-open" : "modal-close"}>
      <div className="modal-background"></div>
      <div className="modal-content payment-modal">
        <button
          onClick={() => {
            setChargePointStat(0);
            closeModal();
          }}
        >
          X
        </button>
        <div>
          {chargePointStat === 0 ? (
            <Payment
              setChargePointStat={setChargePointStat}
              orderName={"포인트 충전"}
              nickname={username}
            />
          ) : chargePointStat === 1 ? (
            <>
              <div className="payment-warning-image-wrapper">
                <img
                  className="payment-warning-image"
                  src={PayWarning}
                  alt="경고"
                />
              </div>
              <div className="payment-h1" style={{ marginTop: "80px" }}>
                결제가 완료되지 않았습니다!
              </div>
              <button
                className="payment-secondary-button"
                style={{ marginTop: "140px" }}
                onClick={refreshPage}
              >
                확인
              </button>
            </>
          ) : (
            <>
              <div className="payment-h1" style={{ marginTop: "80px" }}>
                충전이 완료되었습니다!
              </div>

              <button
                className="payment-secondary-button"
                style={{ marginTop: "280px" }}
                onClick={refreshPage}
              >
                확인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
