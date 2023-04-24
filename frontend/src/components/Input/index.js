import React from 'react';
import PropTypes from 'prop-types';

import { LabelContainer } from './styled';

export default function Input({ idInput, text, onChange, ...rest }) {
  return (
    <LabelContainer htmlFor={idInput}>
      <span>{text}</span>
      <input id={idInput} onChange={onChange} type={rest.type} name={rest.name} placeholder={rest.placeholder} {...rest} />
    </LabelContainer>
  );
}

Input.propTypes = {
  idInput: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  onChange: null,
};
