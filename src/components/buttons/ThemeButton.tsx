import React from "react";
import { IFunctionProps } from "../../myTypes";
import { styled } from "styled-components";
import { lightTheme } from "../../theme";

const ThemeSwitchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    visibility: hidden;
  }
`;

const ThemeSwitchLabel = styled.label`
  position: absolute;
  top: 0;
  left: 1rem;
  width: 50px;
  height: 26px;
  background-color: ${(props) =>
    props.theme === lightTheme ? "#ccc" : "#718093"};
  border-radius: 13px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ThemeSwitchSlider = styled.div`
  content: "";
  display: block;
  width: 22px;
  height: 22px;
  background-color: ${(props) =>
    props.theme === lightTheme ? "#fff" : "#7f8fa6"};
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s, background-color 0.3s;
  transform: translateX(
    ${(props) => (props.theme === lightTheme ? "24px" : "0")}
  );
`;

const ThemeButton = ({ toggleTheme }: IFunctionProps) => {
  return (
    <ThemeSwitchContainer>
      <input type="checkbox" id="theme-toggle" onChange={toggleTheme} />
      <ThemeSwitchLabel htmlFor="theme-toggle">
        <ThemeSwitchSlider />
      </ThemeSwitchLabel>
    </ThemeSwitchContainer>
  );
};

export default ThemeButton;
