import { Row } from "antd";
import styled from "styled-components";
const googleFontsLink = document.createElement("link");
googleFontsLink.href =
  "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
googleFontsLink.rel = "stylesheet";
document.head.appendChild(googleFontsLink);

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #ff9999;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  width: 1570px;
  padding: 15px 0;
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
  font-family: "Parisienne", cursive;
  font-weight: bold;
  text-decoration: none;
`;
export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  font-size: 12px;
`;
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`;
export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: #ee8888;
    font-weight: bold;
  }
`;
export const UlStyle = styled.div`
  display: block;
  width: 100%;
`;
export const LiStyle = styled.li`
  width: 25%;
  list-style: none;
  float: left;
  text-align: center;
  font-size: 13.5px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #5a20c1;
    font-weight: bold;
    font-size: 15px;
  }
`;
