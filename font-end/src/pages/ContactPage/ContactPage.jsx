import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import a7 from "../../assets/images/a7.jpg";
import a8 from "../../assets/images/a8.jpg";
import a9 from "../../assets/images/a9.jpg";
import {
  EnvironmentOutlined,
  PhoneFilled,
  MailFilled,
  FacebookFilled,
  YoutubeFilled,
  InstagramFilled,
  HomeOutlined,
} from "@ant-design/icons";
const AboutPage = () => {
  return (
    <div>
      <div>
        <div
          id="container"
          style={{
            margin: "0 auto",
            width: "1570px",
            paddingBottom: "100px",
            height: "100%",
          }}
        >
          <div style={{ marginTop: "45px" }}>
            <SliderComponent arrImages={[a7, a8, a9]} />
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            margin: "0 auto",
            width: "1270px",
            paddingBottom: "100px",
            height: "100%",
          }}
        >
          <h2
            style={{
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            ĐỊA CHỈ CỦA CHÚNG TÔI
          </h2>
          <p>
            <EnvironmentOutlined style={{ color: "pink" }} /> Địa chỉ: Số 03 -
            Bến trung - Bắc Hồng - Dông Anh - Hà Nội
          </p>
          <div style={{ width: "100%" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2212.0845069467837!2d105.81154572658026!3d21.181515479422654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1713186569933!5m2!1svi!2s"
              style={{
                width: "1270px",
                height: "400px",
                style: "border:0;",
                allowfullscreen: "",
                loading: "lazy",
                referrerpolicy: "no-referrer-when-downgrade",
              }}
            ></iframe>
          </div>
          <h2
            style={{
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            LIÊN LẠC
          </h2>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <HomeOutlined style={{ fontSize: "30px", color: "pink" }} />
              <p>
                Địa chỉ Shop: Số 03 - Bến trung - Bắc Hồng - Dông Anh - Hà Nội
              </p>
            </div>
            <div>
              <PhoneFilled style={{ color: "pink", fontSize: "30px" }} />
              <p>Điện thoại 1: 0327433067</p>
              <p>Điện thoại 2: </p>
            </div>
          </div>
          <p style={{ paddingTop: "20px" }}>
            Được thành lập vào năm 2023, trải qua 1 năm hoạt động Hồng Phong Pet
            đã cung cấp cún các tỉnh thành trên cả nước và trở thành đang trên
            con đường trở thành kênh thú cưng lớn mạnh nhất Việt Nam.
          </p>
          <p>
            Đối với Shop , người thành lập nên Hồng Phong Pet thì chó mèo không
            chỉ là vật nuôi mà còn là người bạn đồng hành trong cuộc sống, vậy
            nên ngoài việc bán chó mèo cảnh, mình đã xây dựng Hồng Phong Pet
            thành một nơi để các bạn yêu cún có thể chia sẻ kinh nghiệm nuôi dạy
            cũng như lưu giữ những khoảnh khắc của bé cưng. Đến nay Hồng Phong
            Pet đang trở thành trở thành cộng đồng thú cưng lớn tại Việt Nam. Đó
            là một điều rất đáng tự hào đối với bản thân mình ,trong tương lai
            mình sẽ luôn phấn đấu cũng như phát triển thêm các dịch vụ khác để
            phục vụ tốt nhẩt cho cộng đồng yêu thú cưng !
          </p>
          <p>
            Trong quá trình hoạt động Hồng Phong Pet luôn làm đúng những gì đã
            cam kết , tư vấn đầy đủ cũng như luôn đảm bảo quyền lợi của khách
            hàng. Trong quá trình hoạt động, Hồng Phong Pet tự hào được khách
            hàng bình chọn là thương hiệu Uy Tín – Chất Lượng và là nơi để các
            bạn yêu thú cưng tìm đến khi có nhu cầu sở hữu một người bạn bốn
            chân.
          </p>
          <p>Liên hệ: Địa chỉ</p>
          <p>Hà Nội: Số 168 Thượng Đình - Thanh Xuân</p>
          <p>Email: hongphongpet2023@gmail.com</p>
          <p>Hotline: 0327.433.067</p>
          <p>Thời gian làm việc</p>
          <p>8:30am - 22:00pm</p>
          <p>Từ thứ 2 đến chủ nhật</p>
          <footer>
            <p>&copy; 2024 Pet Shop. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
