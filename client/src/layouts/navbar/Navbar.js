import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Button } from "../../components/common";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { logoutUser } from "../../utils/apis/user.apis";

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = useStore((state) => state.access_token);
  const removeToken = useStore((state) => state.removeToken);

  const handleLogout = async () => {
    await logoutUser();
    removeToken();
  };

  return (
    <Container>
      <Link to="/">Home</Link>
      <NavContainer></NavContainer>
      <NavContainer direction="right">
        {authenticated ? (
          <>
            <Button label="Log Out" onClick={handleLogout} />
          </>
        ) : (
          <>
            <Button label="Sign Up" onClick={() => navigate("/signUp")} />
            <Button label="Log In" onClick={() => navigate("/logIn")} />
          </>
        )}
      </NavContainer>
    </Container>
  );
};

export default Navbar;

const Container = styled.header`
  display: flex;
  flex-direction: row;
  background-color: white;
  left: 0;
  right: 0;
  padding: 0 2rem;
  height: 60px;
  align-items: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 0.5rem;
  ${getNavContainerDirectionStyle}
`;

function getNavContainerDirectionStyle({ direction }) {
  switch (direction) {
    case "right":
      return css`
        justify-content: flex-end;
      `;
    case "left":
    default:
      return css`
        justify-content: flex-start;
      `;
  }
}
