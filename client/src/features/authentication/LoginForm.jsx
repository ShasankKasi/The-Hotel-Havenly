import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogin from "./useLogin";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const UserBox = styled.div`
  position: relative;
  margin-bottom: 30px;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  padding-left: 20px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;

  &:focus,
  &:not(:placeholder-shown) {
    background: transparent;
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
`;

const SubmitButton = styled(Button)`
  position: relative;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #03e9f4;

  &:hover {
    background: #03e9f4;
    color: #fff;
    border: none;
  }

  span {
    position: absolute;
    display: block;
  }

  span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
  }

  span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: 0.25s;
  }

  span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: 0.5s;
  }

  span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: 0.75s;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("thehotelhavenly@gmail.com");
  const [password, setPassword] = useState("test@123");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <UserBox>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          placeholder=" "
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="email">Email address</Label>
      </UserBox>
      <UserBox>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          placeholder=" "
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>
      </UserBox>
      <SubmitButton type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {isLoading ? <SpinnerMini /> : "Submit"}
      </SubmitButton>
    </Form>
  );
}

export default LoginForm;
