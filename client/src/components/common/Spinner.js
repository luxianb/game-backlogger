import styled from "@emotion/styled";
import { Col } from "./Col";
import { ImSpinner8 } from "react-icons/im";

export const Spinner = ({ size, color, ...props }) => {
  return (
    <Container {...props}>
      <ImSpinner8 color={color} size={size} />
    </Container>
  );
};

const Container = styled(Col)`
  justify-content: center;
  align-items: center;
  animation: spin 600ms linear infinite;
  font-size: 30px;
  color: #40c4ff;
  width: fit-content;
  @keyframes spin {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;
