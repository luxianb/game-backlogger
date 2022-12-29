import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Home, GameController, Person } from "akar-icons";
import React from "react";
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
        {
          type: "link",
          href: "/profile",
          element: <GameController size="1.5rem" />,
        },
        {
          type: "link",
          href: "/achievements",
          element: <BiAward size="1.5rem" />,
        },
        // {
        //   type: "link",
        //   href: "/profile",
        //   element: <Person size="1.5rem" />,
        // },
        {
          type: "button",
          separator: true,
          onClick: handleLogout,
          element: <BiLogOut size="1.5rem" />,
        }
      );
    } else {
      links.push({
        href: "/login",
        separator: true,
        element: <BiLogIn size="1.5rem" />,
      });
    }

    return links.map((link, index) => {
      const { element, separator, ...props } = link;

      return (
        <React.Fragment key={`link-${index}`}>
          {separator && <Separator />}
          <NavLink
            {...props}
            onClick={
              props?.onClick ? props?.onClick : () => navigate(link?.href)
            }
            active={link?.href === location.pathname}
          >
            {element}
          </NavLink>
        </React.Fragment>
      );
    });
  };

  return <Container>{renderNavLinks()}</Container>;
};

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-radius: 16px;
  background-color: #292f3b;
  align-items: center;
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
  padding: 0 1.5rem;
  :hover {
    color: #0bb0f2;
  }
`;
const Separator = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 70%;
  margin: -0.25rem 0;
`;
