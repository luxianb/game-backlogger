import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Home, GameController, Person } from "akar-icons";
import { BiAward, BiLogIn, BiLogOut } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

import { useStore } from "../../store";
import { logoutUser } from "../../utils/apis/user.apis";

const NavLink = ({ href, children, type, current, ...props }) => {
  return <Clickable {...props}>{children}</Clickable>;
};

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = useStore((state) => state.access_token);
  const removeToken = useStore((state) => state.removeToken);

  const handleLogout = async () => {
    await logoutUser();
    removeToken();
    navigate("/");
  };

  const renderNavLinks = () => {
    const links = [{ href: "/", element: <Home size="1.5rem" /> }];

    if (authenticated) {
      links.push(
        { type: "link", href: "/profile", element: <BiAward size="1.5rem" /> },
        {
          type: "link",
          href: "/profile",
          element: <GameController size="1.5rem" />,
        },
        { type: "link", href: "/profile", element: <Person size="1.5rem" /> },
        {
          type: "button",
          onClick: handleLogout,
          element: <BiLogOut size="1.5rem" />,
        }
      );
    } else {
      links.push({ href: "/login", element: <BiLogIn size="1.5rem" /> });
    }

    return links.map((link, index) => {
      const { element, ...props } = link;

      return (
        <NavLink
          {...props}
          key={`link-${index}`}
          onClick={props?.onClick ? props?.onClick : () => navigate(link?.href)}
          active={link?.href === location.pathname}
        >
          {element}
        </NavLink>
      );
    });
  };

  return <Container>{renderNavLinks()}</Container>;
};

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 16px;
  background-color: #292f3b;
`;

function getActiveStyle({ active }) {
  if (active)
    return css`
      color: #0bb0f2;
    `;
  return css`
    color: inherit;
  `;
}
const Clickable = styled.div`
  ${getActiveStyle}
  cursor: pointer;
  :hover {
    color: #0bb0f2;
  }
`;
