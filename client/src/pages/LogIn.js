import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Page,
  Input,
  Label,
  Button,
  Row,
  ErrorPrompt,
} from "../components/common";
import Navbar from "../layouts/navbar/Navbar";
import { authUser } from "../utils/apis/user.apis";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

export const LogInPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const payload = { username: data?.username, password: data?.password };
    const res = await authUser(payload);

    if (res.access_token) {
      useStore.setState({ access_token: res.access_token });
      navigate("/profile");
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <Page>
      <Navbar />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: "center" }}>Sign In</h1>
        <Row>
          <span>
            <Label>Username</Label>
            <Input {...register("username")} type="text" />
          </span>
          <span>
            <Label>Password</Label>
            <Input {...register("password")} type="password" />
          </span>
        </Row>
        {error && <ErrorPrompt>{error}</ErrorPrompt>}
        <Button label="Login" type="submit" />
      </Form>
    </Page>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;
