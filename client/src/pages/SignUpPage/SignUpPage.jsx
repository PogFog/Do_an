import React, { useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imagelogo from "../../assets/images/LOGOHONGPHONGPET.jpeg";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../service/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useEffect } from "react";
const SignUpPage = () => {
  const [isShowPassWord, setIsShowPassWord] = useState(false);
  const [isShowConfirmPassWord, setIsShowPConfirmPassWord] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "ERR") {
        message.error();
      } else {
        message.success();
        handleNavigateSignIn();
      }
    }
  }, [isSuccess]);
  const navigate = useNavigate();
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };
  const navigate1 = useNavigate();
  const handleNavigateHomePage = () => {
    navigate1("/");
  };
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
    console.log("sign-up", email, password, confirmPassword);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#efefef",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "850px",
          height: "450px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
          justifyContent: "space-around",
          gap: "20px",
        }}
      >
        <WrapperContainerLeft>
          <h1 style={{ margin: "0px" }}>Xin chào</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "8px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassWord(!isShowPassWord)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "11px",
                right: "8px",
              }}
            >
              {isShowPassWord ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{ marginBottom: "10px" }}
              placeholder="Password"
              type={isShowPassWord ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPConfirmPassWord(!isShowConfirmPassWord)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "11px",
                right: "8px",
              }}
            >
              {isShowConfirmPassWord ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Confirm password"
              type={isShowConfirmPassWord ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red", marginTop: "10px", display: "block" }}>
              {data?.message}
            </span>
          )}
          {/* <Loading isLoading={isLoading}> */}
          <ButtonComponent
            disabled={
              !email.length || !password.length || !confirmPassword.length
            }
            onClick={handleSignUp}
            size="large"
            styleButton={{
              background: "rgb(255,57,69)",
              height: "50px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "26px 0 10px",
            }}
            textButton={"Đăng ký"}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
            }}
          ></ButtonComponent>
          {/* </Loading> */}
          <p style={{ margin: "0px" }}>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imagelogo}
            preview={false}
            alt="alt-logo"
            height="300px"
            width="300px"
            onClick={handleNavigateHomePage}
            style={{ cursor: "pointer" }}
          />
          {/* <h4>Tìm kiếm thú cưng tại</h4> */}
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
