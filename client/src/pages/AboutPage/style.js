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
  font-size: 42px; /* Tăng kích thước chữ */
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

export const Paragraph = styled.p`
  font-size: 20px; /* Tăng kích thước chữ */
  line-height: 1.8; /* Tăng khoảng cách dòng */
  color: #555;
  margin-bottom: 20px;
`;

export const ContactInfo = styled.div`
  margin-top: 40px;
  p {
    font-size: 20px; /* Tăng kích thước chữ */
    line-height: 1.8; /* Tăng khoảng cách dòng */
    color: #555;
    margin-bottom: 10px;
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
