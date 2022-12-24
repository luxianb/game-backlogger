import styled from "@emotion/styled";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Page,
  Row,
  Label,
  Input,
  Col,
  Button,
  SteamButton,
  ErrorPrompt,
} from "../components/common";
import Navbar from "../layouts/navbar/Navbar";
import { SteamUserDisplay } from "../components/steam";
import { createUser } from "../utils/apis/user.apis";
import { fetchSteamProfileFromSession } from "../utils/steamTools";

const SignUpPage = () => {
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [steamInfo, setSteamInfo] = useState(null);
  // const [modal, setModal] = useState(null);

  useEffect(() => {
    handleSteamFetch();
  }, []);

  const handleSteamFetch = async () => {
    const data = await fetchSteamProfileFromSession();
    console.log("🚀  data", data);
    if (data) setSteamInfo(data);
  };

  const onSubmit = async (data) => {
    const userData = {
      username: data?.username,
      password: data?.password,
      email: data?.email,
      steamId: steamInfo?.id,
    };
    const res = await createUser(userData);
    console.log("🚀  res", res);
  };

  const renderSteamInfo = () => {
    if (!steamInfo || !Object.keys(steamInfo).length) return;
    return (
      <SteamUserDisplay
        photo={steamInfo?.photos && steamInfo?.photos[2]?.value}
        displayName={steamInfo.displayName}
        id={steamInfo.id}
      />
    );
  };

  return (
    <Page>
      <Title>Create Account</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ gap: ".5rem" }}>
          <span>
            <Label htmlFor={`${id}-username`}>{"Username "}</Label>
            <Input
              {...register("username", {
                required: "*required",
              })}
              type="text"
              id={`${id}-username`}
              error={errors.username}
            />
            {errors.username && (
              <ErrorPrompt>{errors.username?.message}</ErrorPrompt>
            )}
          </span>

          <span>
            <Label htmlFor={`${id}-email`}>{"Email "}</Label>
            <Input
              {...register("email", {
                required: "*required",
              })}
              type="email"
              id={`${id}-email`}
              error={errors.email}
            />
            {errors.email && <ErrorPrompt>{errors.email?.message}</ErrorPrompt>}
          </span>
        </Row>

        <Col>
          <Label htmlFor={`${id}-password`}>{"Password "}</Label>
          <Input
            {...register("password", {
              required: "*required",
            })}
            type="password"
            id={`${id}-password`}
            error={errors.password}
          />
          {errors.password && (
            <ErrorPrompt>{errors.password?.message}</ErrorPrompt>
          )}
        </Col>

        <Col>
          <Label htmlFor={`${id}-rePassword`}>{"Retype password "}</Label>
          <Input
            {...register("rePassword", {
              required: "*required",
            })}
            type="password"
            id={`${id}-rePassword`}
            error={errors.rePassword}
          />
          {errors.rePassword && (
            <ErrorPrompt>{errors.rePassword?.message}</ErrorPrompt>
          )}
        </Col>
        {renderSteamInfo()}
        <SteamButton size="small" />

        <Button type="submit">Submit</Button>
      </Form>
    </Page>
  );
};

export default SignUpPage;

const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    min-width: 300px;
  }
  gap: 0.5rem;
`;
