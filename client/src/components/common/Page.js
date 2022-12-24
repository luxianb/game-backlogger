import styled from "@emotion/styled";
import { Navigation } from "../../layouts/navbar/Navigation";
import { useElementSize } from "../../utils/hooks/useElementSize";

export const Page = ({ children }) => {
  const [navRef, navWidth] = useElementSize("width");
  const [pageRef, pageWidth] = useElementSize("width");

  const getStyle = () => {
    const styles = {};
    if (!navWidth || !pageWidth) {
      styles.maxWidth = "unset";
      return styles;
    }

    styles.maxWidth = pageWidth - navWidth;
    return styles;
  };

  return (
    <Container ref={pageRef}>
      <NavContainer ref={navRef}>
        <Navigation style={{ position: "sticky" }} />
      </NavContainer>
      <Content style={getStyle()}>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas: "nav content";
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  width: 100vw;
  background-color: #24282f;
  color: white;

  box-sizing: border-box;
`;
const NavContainer = styled.div`
  grid-area: "nav";
  padding: 1rem;
`;
const Content = styled.main`
  grid-area: "content";
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: auto;
`;
