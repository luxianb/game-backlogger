import styled from "@emotion/styled";
import { Input } from "./Input";
import { Row } from "./Row";
import { IoSearch } from "react-icons/io5";
import { hexToRGBA } from "../../utils/tools";
import { useEffect, useId, useRef, useState } from "react";
import { css } from "@emotion/react";

export const SearchInput = (props) => {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const containerRef = useRef();

  const handleFocus = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  useEffect(() => {
    if (!containerRef.current) return;
    if (focused) containerRef.current.focus();
  }, [focused]);

  return (
    <Container focused={focused}>
      <Label htmlFor={id}>
        <IoSearch />
      </Label>
      <StyledInput {...props} {...handleFocus} id={id} />
    </Container>
  );
};

const Container = styled(Row)`
  min-width: unset;
  border-radius: 0.25rem;
  border: none;
  background-color: ${hexToRGBA(`#263238`, 1)};
  align-items: center;
  gap: 0.5rem;
  ${({ focused }) =>
    focused &&
    css`
      outline: 1px solid #1e88e5;
    `}
`;
const Label = styled.label`
  padding: 0.5rem;
  padding-right: 0;
  padding-left: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledInput = styled(Input)`
  border-radius: unset;
  border: none;
  background-color: unset;
  :focus-visible {
    outline: none;
  }
`;
