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
   * 선택한 이미지의 사전 서명된 URL을 가져옵니다.
   * @returns {Promise<string|null>} 사전 서명된 URL이 반환되며, 오류가 발생할 경우 null을 반환합니다.
  */
  const getPresignedUrl = async () => {
    try {
      const token = localStorage.getItem('token');
      const name = selectedImage.name;
      const response = await axios.post(`${process.env.REACT_APP_PROXY}/s3/presigned`, {
        image_name: name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data.presigned_url;
      } else {
        console.log('url 가져오기 실패');
        return null;
      }
    } catch (error) {
      console.error('Presinged_Url 가져오기 실패 :', error);
      return null;
    }
  }

  /**
   * S3 서버에 이미지를 업로드합니다.
   * @param {string} presignedUrl - 사전 서명된 URL
   * @returns {Promise<string>} - 업로드된 이미지의 URL
   * @throws {Error} - 업로드 실패 시 에러가 throw됩니다.
  */
  const postImage = async (presignedUrl) => {
    try {
      const response = await axios.put(presignedUrl, selectedImage,{
        headers :{
          "Content-Type": "image/png",
        }
      });
      return response.config.url.split('?')[0];
    } catch (error) {
      console.error('S3 이미지 업로드 실패:', error);
      throw error;
    }
  };  

  /**
   * 서버에 이미지 URL을 제출합니다.
   * @param {string} img_url - 업로드된 이미지의 URL
   * @returns {Promise<void>}
  */
  const postImgUrl = async (img_url) =>{
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_PROXY}/trees/`, {
        image_url: img_url,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 201){
        alert('분리 배출 인증 완료');
      }else if(response.status === 429){
        alert('이미 분리 배출 인증 3회 진행되었습니다.')
      }
      else{
        console.log('서버 이미지 url 제출 실패');
      }
    } catch (error) {
      console.error('서버 이미지 url 제출 실패', error);
      return null;
    }
  }

  /**
   * 등록 버튼 클릭 이벤트 핸들러입니다.
   * @returns {Promise<void>}
  */
  const handleSubmit = async () => {
    if (!selectedImage) {
      alert('이미지를 선택해주세요!');
      return;
    }
    try {
      const url = await getPresignedUrl();
      if (url) {
        const img_url = await postImage(url);
        if (img_url) {
          postImgUrl(img_url);
        }
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
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
