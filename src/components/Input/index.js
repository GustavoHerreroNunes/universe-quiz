import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const InputText = styled.input`
  width: 100%;
  margin-bottom: 25px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.contrastText};
  outline: 0;
  background-color: inherit;
`;
export default function Input({ type, name, onChange, placeholder }){
  return(
    <div>
      <InputText type={type} name={name} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}

Input.defaultProps ={
    value: ''
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
