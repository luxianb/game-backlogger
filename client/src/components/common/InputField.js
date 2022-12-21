import { Component } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Col } from "./Col";
import { Input } from "./Input";
import { Label } from "./Label";

export class InputField extends Component {
  Input = (props) => <Input {...props} />;

  render() {
    const { label, rest, containerStyle, labelStyle } = this.props;

    return (
      <Container style={containerStyle}>
        {label && <Label style={labelStyle}>{label}</Label>}
        <this.Input {...rest} />
      </Container>
    );
  }
}

const Container = styled(Col)`
  ${getDirectionStyles}
`;

function getDirectionStyles({ direction }) {
  switch (direction) {
    case "horizontal":
      return css`
        flex-direction: row;
        justify-content: center;
      `;
    case "veritcal":
    default:
      return css`
        flex-direction: column;
      `;
  }
}
