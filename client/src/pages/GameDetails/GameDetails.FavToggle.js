import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BsStar, BsStarFill } from "react-icons/bs";

export const FavToggle = ({ toggled, onClick, ...props }) => {
  const renderIcon = () => {
    if (toggled) return <BsStarFill />;
    return <BsStar />;
  };

  return (
    <Container onClick={onClick} toggled={toggled} {...props}>
      {renderIcon()}
    </Container>
  );
};
const Container = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: white;
  ${getToggledStyle}
  :hover {
    opacity: 1;
  }
`;

function getToggledStyle({ toggled }) {
  if (toggled)
    return css`
      opacity: 0.9;
    `;
  return css`
    opacity: 0.8;
  `;
}
