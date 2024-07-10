import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
  cursor: pointer;
`;

const Img = styled.img`
  height: 12rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const src = !isDarkMode ? "2.jpg" : "/5.jpeg";
  return (
    <StyledLogo onClick={() => navigate("about")}>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
