import styled from "@emotion/styled";
import { ArrowLeft } from "akar-icons";

export const BackButton = ({ onClick, style, ...props }) => {
  return (
    <Container onClick={onClick} style={style} {...props}>
      <ArrowLeft size="1.5rem" />
    </Container>
  );
};

const Container = styled.div`
  z-index: 10;
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
