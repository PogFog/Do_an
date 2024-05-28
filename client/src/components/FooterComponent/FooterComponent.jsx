import React from "react";
import home from "../../assets/images/home-icon-1.png";
import zalo from "../../assets/images/zalo-icon-1.png";
import facebook from "../../assets/images/mess-icon-1.png";
import call from "../../assets/images/call-icon-1.png";
import { Link, Navigate } from "react-router-dom";
import { FooterStyle, LiStyle } from "./style";
import {
  EnvironmentOutlined,
  PhoneFilled,
  MailFilled,
  FacebookFilled,
  YoutubeFilled,
  InstagramFilled,
} from "@ant-design/icons";
import anhFooter from "../../assets/images/anhfooter.png";
import { useNavigate } from "react-router-dom";

const FooterComponent = () => {
  const navigate = useNavigate();
  const NavigateAbout = () => {
    navigate(`/about`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div>
        <img src={anhFooter} alt="Footer Image" />
      </div>
      <div
        style={{
          margin: "0 auto",
          width: "1270px",
          paddingBottom: "100px",
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "18px",
              color: "#333",
            }}
          >
            Liên lạc
          </h2>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <EnvironmentOutlined style={{ color: "pink" }} /> Địa chỉ: Bến trung
            - Bắc Hồng - Đông Anh - Hà Nội
          </p>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <PhoneFilled style={{ color: "pink" }} /> Điện thoại: 0327433067
          </p>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <MailFilled style={{ color: "pink" }} /> Email:
            <a
              href="mailto:contact.7uptheme@gmail.com"
              style={{ textDecoration: "none", color: "#333" }}
            >
              {" "}
              phong123hong@gmail.com
            </a>
          </p>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "18px",
              color: "#333",
            }}
          >
            Theo dõi
          </h2>
          <a href="https://www.facebook.com/PogFoq" target="_blank">
            <FacebookFilled style={{ fontSize: "30px" }} />
          </a>{" "}
          <a
            href="https://www.youtube.com/channel/UC-6O2pR9-s7tN_UE9UMSweQ"
            target="_blank"
          >
            <YoutubeFilled style={{ fontSize: "30px", color: "#FF0000" }} />
          </a>{" "}
          <a href="https://www.instagram.com/pogfogg/" target="_blank">
            <InstagramFilled style={{ fontSize: "30px", color: "#EA4874" }} />
          </a>
        </div>
        <div>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "18px",
              color: "#333",
            }}
          >
            Hỗ trợ
          </h2>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              cursor: "pointer",
              color: "#333",
            }}
            onClick={NavigateAbout}
          >
            Về chúng tôi
          </p>
          <a
            href="https://www.phukienthucungdep.com/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "#333",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
            }}
          >
            Nhập đồ xỉ thú cưng
          </a>
        </div>
        <div>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "18px",
              color: "#333",
            }}
          >
            Địa chỉ
          </h2>
          <div style={{ paddingBottom: "25%", position: "relative" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d930.0727718691838!2d105.81206317765219!3d21.1805924737085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1712478053151!5m2!1svi!2s"
              style={{
                width: "350px",
                height: "200px",
                style: "border:0;",
                allowfullscreen: "",
                loading: "lazy",
                referrerpolicy: "no-referrer-when-downgrade",
              }}
            ></iframe>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
          marginBottom: "71px",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "16px",
        }}
      >
        © 2024 - HongPhongPet, All rights reserved
      </div>
      <div>
        <FooterStyle>
          <ul>
            <LiStyle>
              <Link to="/">
                <img src={home} alt="Home Icon" width="50px" height="50px" />
              </Link>
            </LiStyle>
            <LiStyle>
              <a href="https://zalo.me/0327433067" target="_blank">
                <img src={zalo} alt="Zalo Icon" width="50px" height="50px" />
              </a>
            </LiStyle>
            <LiStyle>
              <a href="https://www.facebook.com/PogFoq/" target="_blank">
                <img
                  src={facebook}
                  alt="Facebook Icon"
                  width="50px"
                  height="50px"
                />
              </a>
            </LiStyle>
            <LiStyle>
              <a href="tel://0327433067">
                <img src={call} alt="Call Icon" width="50px" height="50px" />
              </a>
            </LiStyle>
          </ul>
        </FooterStyle>
      </div>
    </>
  );
};
export default FooterComponent;
