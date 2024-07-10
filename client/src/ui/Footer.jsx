import { MdOutlineCall } from "react-icons/md";
import styled from "styled-components";
import { IoMdMail } from "react-icons/io";

const fontFamily = "'Roboto', sans-serif";

const StyledFooter = styled.footer`
  background-color: var(--color-grey-800);
  color: var(--color-grey-100);
  padding: 1rem;
  text-align: center;
  grid-column: span 2;
  font-family: ${fontFamily};
`;

const Copyright = styled.p`
  margin-bottom: 1rem;
  font-family: ${fontFamily}; 
`;

const ContactInfo = styled.div`
  font-size: 0.9rem;
  font-family: ${fontFamily}; 
`;

const Email = styled.a`
  color: var(--color-primary);
  text-decoration: none;
  margin-left: 0.5rem;
  font-family: ${fontFamily}; 
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Copyright>
        &copy; 2024 The Hotel Havenly Ltd. All rights reserved
      </Copyright>
      <ContactInfo>
        <MdOutlineCall/> : +91 9885291225 |
        <Email href="mailto:thehotelhavenly@gmail.com">
          {" "}
          <IoMdMail/> : Thehotelhavenly@gmail.com
        </Email>
      </ContactInfo>
    </StyledFooter>
  );
}
