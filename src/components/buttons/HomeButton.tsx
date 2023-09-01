import React from "react";
import { styled } from "styled-components";

const ButtonContainer = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
  font-weight: 600;
`;

const HomeButton = () => {
  return <ButtonContainer>&larr;</ButtonContainer>;
};

export default HomeButton;
