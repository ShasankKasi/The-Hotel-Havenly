import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  padding-right: 5vh;
  position: relative;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }

  &:hover::after {
    content: ${(props) => (props.$show ? `"${props.$show}"` : "''")};
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-grey-100);
    padding: 1rem 0.8rem;
    border-radius: 0.4rem;
    font-size: 0.9rem;
    color: var(--color-grey-800);
    white-space: nowrap;
    z-index: 1;
  }
`;

export default ButtonIcon;
