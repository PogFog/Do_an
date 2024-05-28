import { Col } from "antd";
import styled from "styled-components";

export const WrapperProducts1 = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
`;
export const WrapperNavbar = styled(Col)`
  background: #fff;
  margin-right: 10px;
  padding: 10px;
  border-radius: 4px;
  height: fit-content;
  margin-top: 20px;
  width: 200px;
  height: 50%;
`;
export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
`;
export const WrapperLableText = styled.h4`
  color: rgb(56, 56, 61);
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;
export const WrapperTextValue = styled.span`
  color: rgb(56, 56, 61);
  font-size: 14px;
  font-weight: 400;
`;
export const WrapperContent = styled.div`
  display: flex;
  //   align-items: center;
  flex-direction: column;
  gap: 30px;
`;
export const WrapperContent1 = styled.div`
  display: flex;
  //   align-items: center;
  flex-direction: column;
  gap: 35px;
  font-size: 16px;
  font-weight: 500;
`;
export const WrapperTextPrice = styled.div`
  borderradius: 10px;
  color: rbg(56, 56, 61);
  backgroundcolor: rgb(238, 238, 238);
  width: fit-content;
  padding: 4px;
`;
export const NoProductsMessage = styled.div`
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  color: #ff4d4f;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  font-size: 16px;
`;
