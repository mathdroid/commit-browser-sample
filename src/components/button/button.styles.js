import styled from "react-emotion";

const ButtonStyles = styled.button`
  border: ${props => ("border" in props ? props.border : "solid 1px black")};
  background: ${props => ("background" in props ? props.background : "unset")};
  color: ${props => ("color" in props ? props.color : "black")};
  padding: ${props =>
    "size" in props
      ? props.size === "small"
        ? "0.5rem 1rem"
        : "1rem 2rem"
      : "1rem 2rem"};
  font-family: inherit;
  font-size: 1.2rem;
  line-height: 1.5;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.8;
  }

  &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  &:active {
    transform: scale(0.99);
  }
`;

export default ButtonStyles;
