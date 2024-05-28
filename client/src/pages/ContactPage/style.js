import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  width: 1570px;
  padding-bottom: 100px;
  height: 100%;
`;

export const InnerContainer = styled.div`
  margin: 0 auto;
  width: 1270px;
  padding-bottom: 100px;
  height: 100%;
`;

export const Header = styled.h2`
  font-weight: 700;
  font-size: 36px; /* Tăng kích thước chữ */
  margin-bottom: 20px;

  color: #333;
`;

export const Paragraph = styled.p`
  font-size: 20px; /* Tăng kích thước chữ */
  line-height: 1.8; /* Tăng khoảng cách dòng */
  color: #555;
  margin-bottom: 20px;
`;
export const ContactInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-top: 40px;
  border: 2px solid #ccc; /* Thêm border */
  padding: 20px; /* Thêm padding */
  border-radius: 10px; /* Thêm bo góc */
  background-color: #f9f9f9; /* Thêm màu nền nhạt */

  p {
    font-size: 20px; /* Tăng kích thước chữ */
    line-height: 1.8; /* Tăng khoảng cách dòng */
    color: #555;
    margin-bottom: 10px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  svg {
    font-size: 30px;
    color: pink;
  }
`;

export const Footer = styled.footer`
  margin-top: 50px;
  text-align: center;
  p {
    font-size: 18px; /* Tăng kích thước chữ */
    color: #777;
  }
`;
export const ContactInfo1 = styled.div`
  margin-top: 40px;
  p {
    font-size: 20px; /* Tăng kích thước chữ */
    line-height: 1.8; /* Tăng khoảng cách dòng */
    color: #555;
    margin-bottom: 10px;
  }
`;
