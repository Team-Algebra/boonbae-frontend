import React from 'react';
import ImageUploadForm from './components/ImgaeUploadForm';
import '../../styles/Certification.css'

const Certification = () => {
  return (
    <div className='tree-certification'>
      <div className='tree-certification-title'>분리배출 인증</div>
      <ImageUploadForm/>
      <p>
        등록 1회당 경험치 5%, 에코 포인트 5pt가 쌓입니다.
        <br/>
        중복이나 도용 시 포인트가 회수되고 정지당할 수 있습니다.
      </p>
    </div>
  );
};

export default Certification;