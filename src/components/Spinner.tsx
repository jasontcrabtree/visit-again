import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframes for the spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the spinner
const StyledSpinner = styled.div`
  border: 3px solid rgba(0,0,0,0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border-left-color: var(--tw-blue-500);

  animation: ${spin} 1.2s linear infinite;
`;

const Spinner = ({ size = 24, colour = "--tw-blue-500" }) => {
    return (
        <StyledSpinner style={{ width: `${size}px`, height: `${size}px`, borderLeftColor: `var(${colour})` }} />
    );
}

export default Spinner;
