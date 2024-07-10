import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { useNavigate, useLocation } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Roboto", sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.2rem 2.4rem;
  }
`;

const Branding = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-primary)" : "var(--color-text)"};
  text-decoration: ${({ $isActive }) => ($isActive ? "overline" : "none")};
  text-decoration-color: ${({ $isActive }) =>
    $isActive ? "var(--color-accent)" : "transparent"};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.8)};
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route) => location.pathname.includes(route);

  return (
    <StyledHeader>
      <Branding
        onClick={() => navigate("about")}
        $disabled={isActive("about")}
        $isActive={isActive("about")}
      >
        About Us
      </Branding>
      <Branding
        onClick={() => navigate("gallery")}
        $disabled={isActive("gallery")}
        $isActive={isActive("gallery")}
      >
        Gallery
      </Branding>
      <NavItems>
        <UserAvatar />
        <HeaderMenu />
      </NavItems>
    </StyledHeader>
  );
}
