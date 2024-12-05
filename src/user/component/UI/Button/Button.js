import React from 'react';
import { BaseButton, PrimereyBtn, SecondaryBtn } from './button.style';

function Button({children,btntype="primerey", buttonDisabled='false',...rest}) {
    console.log(btntype);
    const handleButtonType = () => {
        switch (btntype) {
          case 'primerey':
            return PrimereyBtn;
          case 'secondrey':
            return SecondaryBtn;
          default:
            return PrimereyBtn;
        }
      }
      const CheckButtonType = handleButtonType()
    return (
        <CheckButtonType disabled={buttonDisabled} {...rest}>
        {children}
      </CheckButtonType>
    );
}

export default Button;
