import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import Modal from '../../Tree/components/Modal';

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * 드래그 오버 이벤트 핸들러
   * @param {Event} event - 드래그 오버 이벤트 객체
   */
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /**
   * 드롭 이벤트 핸들러
   * @param {Event} event - 드롭 이벤트 객체
   */
  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedImage(event.dataTransfer.files[0]);
  };

  /**
   * 클릭 이벤트 핸들러
   */
  const handleClick = () => {
    inputRef.current.click();
  };

  /**
   * 파일 선택 변경 이벤트 핸들러
   * @param {Event} event - 파일 선택 변경 이벤트 객체
   */
  const handleInputChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  /**
   * 취소 버튼 클릭 이벤트 핸들러
   */
  const handleCancel = () => {
    setSelectedImage(null);
  };

  /**
   * 등록 버튼 클릭 이벤트 핸들러
   */
  const handleSubmit = async () => {
    if (!selectedImage) {
      return;
    }
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post(`${process.env.REACT_APP_PROXY}/`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Image upload response:', response);
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  return (
    <div className="imgupload-form">
      {!selectedImage && <span>드래그 혹은 클릭으로 사진을 제출해주세요</span>}
      <div className="imgupload-form-imgzone" onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleClick}>
        {
          selectedImage 
          ? <img src={URL.createObjectURL(selectedImage)} alt="Selected" /> 
          : <FontAwesomeIcon icon={faImage} size="xl" />
        }
      </div>
      <input
        className="imgupload-form-input"
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleInputChange}
      />
      <div className="imgupload-form-button">
        <button type="button" id="left" onClick={handleCancel}>
          취소
        </button>
        <button type="submit" id="right" onClick={openModal}>
          등록
        </button>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="imageupload-form-certification">
          <p>정말 해당 사진으로 분리배출을 인증하시겠습니까?</p>
          <div>
            <button onClick={handleSubmit}>예</button>
            <button onClick={closeModal}>아니요</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageUploadForm;
