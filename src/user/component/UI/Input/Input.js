import React from 'react';
import { InputBox } from './input.style';

function Input({...rest}) {
    return (
      <InputBox 
      {...rest}
      />
     
    );
}

export default Input;