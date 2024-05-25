import React from "react";
import home from "../../assets/images/home-icon-1.png";
import zalo from "../../assets/images/zalo-icon-1.png";
import facebook from "../../assets/images/mess-icon-1.png";
import call from "../../assets/images/call-icon-1.png";
import { Link } from "react-router-dom";
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

const FooterComponent = () => {
  return (
    <>
      <div>
        <img src={anhFooter}></img>
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
          <h2>Liên lạc</h2>
          <p>
            <EnvironmentOutlined style={{ color: "pink" }} /> Địa chỉ: Bến trung
            - Bắc Hồng - Dông Anh - Hà Nội
          </p>
          <p>
            <PhoneFilled style={{ color: "pink" }} /> Điện thoại: 0327433067
          </p>
          <p>
            <MailFilled style={{ color: "pink" }} /> Email:
            <a href="mailto:contact.7uptheme@gmail.com">
              {" "}
              phong123hong@gmail.com
            </a>
          </p>
          <h2>Theo dõi</h2>
          <a href="https://www.facebook.com/PogFoq">
            <FacebookFilled />
          </a>{" "}
          <a href="https://www.youtube.com/channel/UC-6O2pR9-s7tN_UE9UMSweQ">
            <YoutubeFilled />
          </a>{" "}
          <a href="https://www.instagram.com/pogfogg/">
            <InstagramFilled />
          </a>
        </div>
        <div>
          <h2>Hỗ trợ</h2>
        </div>
        <div>
          <h2>Địa chỉ</h2>
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
      <FooterStyle>
        <ul>
          <LiStyle>
            <Link to="/">
              <img src={home} width="50px" height="50px"></img>
            </Link>
          </LiStyle>
          <LiStyle>
            <a href="https://zalo.me/0327433067">
              <img src={zalo} width="50px" height="50px"></img>
            </a>
          </LiStyle>
          <LiStyle>
            <a href="https://www.facebook.com/PogFoq/">
              <img src={facebook} width="50px" height="50px"></img>
            </a>
          </LiStyle>
          <LiStyle>
            <a href="tel://0327433067">
              <img src={call} width="50px" height="50px"></img>
            </a>
          </LiStyle>
        </ul>
      </FooterStyle>
    </>
  );
};
export default FooterComponent;
