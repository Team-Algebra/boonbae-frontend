import React, { useState } from 'react';

const ModifyInfo = ({ userInfo, logo }) => {
  const [editMode, setEditMode] = useState({
    isNicknameEditMode: false,
    isPasswordEditMode: false,
    inputValue: '',
    editTarget: '',
    selectedImage: null,
  });

  const handleNicknameEdit = () => {
    setEditMode((prevMode) => ({
      ...prevMode,
      isNicknameEditMode: !prevMode.isNicknameEditMode,
      inputValue: '',
      editTarget: '닉네임',
    }));
  };

  const handlePasswordEdit = () => {
    setEditMode((prevMode) => ({
      ...prevMode,
      isPasswordEditMode: !prevMode.isPasswordEditMode,
      inputValue: '',
      editTarget: '비밀번호',
    }));
  };

  const handleProfileImageEdit = () => {
    const fileInput = document.getElementById('profileImageInput');
    fileInput.click();
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setEditMode((prevMode) => ({
      ...prevMode,
      selectedImage: file,
    }));
  };

  const handleSubmit = () => {
    setEditMode((prevMode) => ({
      ...prevMode,
      isNicknameEditMode: false,
      isPasswordEditMode: false,
      editTarget: '',
    }));
  };

  const handleChange = (e) => {
    setEditMode((prevMode) => ({
      ...prevMode,
      inputValue: e.target.value,
    }));
  };

  return (
    <div className="mypage-nav-modifyinfo">
      <div id="header">
        <span>프로필 수정</span>
        <p>분배법칙 대표 프로필을 수정하실 수 있습니다.</p>
      </div>
      <div id="content">
        <div className="mypage-imgwrapper">
          <img src={userInfo.user_img ? userInfo.user_img : logo} alt="프로필 이미지" />
        </div>
        <span>{userInfo.username} 님</span>
        <div className="mypage-nav-modifyinfo-button">
          <button onClick={handleProfileImageEdit}>프로필 이미지 수정</button>
          <button onClick={handleNicknameEdit}>닉네임 수정</button>
          <button onClick={handlePasswordEdit}>비밀번호 수정</button>
        </div>
        {(editMode.isNicknameEditMode || editMode.isPasswordEditMode) && (
          <div className="mypage-nav-modifyinfo-modifyInput">
            <span>{editMode.editTarget} 변경 : </span>
            <input
              type={editMode.editTarget === '비밀번호' ? 'password' : 'text'}
              value={editMode.inputValue}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>저장</button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          id="profileImageInput"
          style={{ display: 'none' }}
          onChange={handleProfileImageChange}
        />
      </div>
    </div>
  );
};

export default ModifyInfo;
