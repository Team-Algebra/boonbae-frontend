import React, { useState } from "react";
import Modal from "./components/Modal";

const SampleChargePoint = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // 0: 결제 전, 1: 결제 실패, 2: 결제 성공
  const [chargePointStat, setChargePointStat] = useState(0);

  return (
    <>
      <button onClick={openModal}> 충전하기 </button>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        chargePointStat={chargePointStat}
        setChargePointStat={setChargePointStat}
      />
    </>
  );
};

export default SampleChargePoint;
