import React from 'react';

const SignupInputField = ({
    type,
    name,
    autoComplete,
    placeholder,
    value,
    onChange,
    buttonLabel,
    isButtonDisabled,
    onButtonClick,
  }) => {
  return (
    <div className="signup-input">
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {buttonLabel && (
        <button
          className="signup-inputbtn"
          type='button'
          disabled={isButtonDisabled}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </button>
      )}
  </div>
  );
};

export default SignupInputField;