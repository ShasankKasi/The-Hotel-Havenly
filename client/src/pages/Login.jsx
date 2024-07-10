import styled, { keyframes } from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 20px;
  background: linear-gradient(#141e30, #243b55);
`;

const LoginBox = styled.div`
  margin-top: 15px;
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
`;

const LoginHeading = styled.h2`
  margin: 0 0 30px;
  padding: 0;
  color: #00e4f9;
  text-align: center;
`;

const moveRightLeft = keyframes`
  0% {
    transform: translateX(40);
  }
  50% {
    transform: translateX(60px);
  }
  100% {
    transform: translateX(60);
  }
`;

const Disclaimer = styled.div`
  margin-top: 40px;
  font-size: 14px;
  color: #ccc;
  text-align: center;
  animation: ${moveRightLeft} 4s linear infinite;
`;

function Login() {
  return (
    <LoginLayout>
      <Heading as="h1">THE HOTEL HAVENLY</Heading>
      <LoginBox>
        <Logo />
        <LoginHeading>Login to your account</LoginHeading>
        <LoginForm />
      </LoginBox>
      <Disclaimer>👉 Login restricted to authorized hotel staff 👈</Disclaimer>
    </LoginLayout>
  );
}

export default Login;
