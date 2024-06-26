import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
  height: 64px;
  width: 64px;
`;
export const WrapperStyleColImage = styled(Col)`
  flex-basis: unset;
  display: flex;
`;
export const WrapperStyleNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 300;
  line-height: 32px;
  word-break: breack-word;
  font-family: script;
`;
export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;
export const WrapperPriceProduct = styled.div`
  background: rgb(250, 250, 250);
  border-radius: 4px;
`;

export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  padding: 10px;
  margin-top: 10px;
`;
export const WrapperAddressProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ;ellipsisl
  };
  span.change-address{
    color:rgb(11,116,229);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  };
`;
export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 120px;
  border: 1px solid #efefef;
  boder-radius: 4px;
  justify-content: space-between;
`;

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number-outlined {
    width: 40px;
    border-top: none;
    border-bottom: none;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
`;
export const WrapperStyle = styled.p`
  font-size: 16px;
`;
export const WrapperStyle2 = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: black;
  font-weight: 500;
`;

export const WrapperStyle3 = styled.span`
  border: 1px solid #e5e5e5;
  padding: 3px;
  border-radius: 5px;
`;
export const WrapperProducts = styled.div`
  display: flex;
  gap: 26px;
  margin-top: 20px;
  flex-wrap: wrap;
`;
export const TitleProduct = styled.div`
  fontsize: 2em;
  margin: 20px 0;
  color: #ff69b4;

  font-size: 30px;
  font-weight: 1000;
`;
