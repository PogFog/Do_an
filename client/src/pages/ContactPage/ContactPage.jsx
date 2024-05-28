import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import a10 from "../../assets/images/anhs1.jpg";
import a11 from "../../assets/images/anhs2.jpg";
import {
  EnvironmentOutlined,
  PhoneFilled,
  MailFilled,
  FacebookFilled,
  YoutubeFilled,
  InstagramFilled,
  HomeOutlined,
} from "@ant-design/icons";
import {
  Container,
  InnerContainer,
  Header,
  Paragraph,
  ContactInfo,
  IconWrapper,
  Footer,
  ContactInfo1,
} from "./style";

const AboutPage = () => {
  return (
    <div>
      <Container>
        <div style={{ marginTop: "45px" }}>
          <SliderComponent arrImages={[a11, a10]} />
        </div>
      </Container>
      <InnerContainer>
        <Header>ĐỊA CHỈ CỦA CHÚNG TÔI</Header>
        <Paragraph>
          <EnvironmentOutlined style={{ color: "pink", marginRight: "10px" }} />
          Địa chỉ: Số 03 - Bến trung - Bắc Hồng - Đông Anh - Hà Nội
        </Paragraph>
        <div style={{ width: "100%" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2212.0845069467837!2d105.81154572658026!3d21.181515479422654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1713186569933!5m2!1svi!2s"
            style={{
              width: "1270px",
              height: "400px",
              border: "0",
              allowfullscreen: "",
              loading: "lazy",
              referrerpolicy: "no-referrer-when-downgrade",
            }}
          ></iframe>
        </div>
        <Header>LIÊN LẠC</Header>
        <ContactInfo>
          <IconWrapper>
            <HomeOutlined />
            <p>
              Địa chỉ Shop: Số 03 - Bến trung - Bắc Hồng - Đông Anh - Hà Nội
            </p>
          </IconWrapper>
          <IconWrapper>
            <PhoneFilled />
            <p>Điện thoại 1: 0327433067</p>
            <p>Điện thoại 2: 0327433067</p>
          </IconWrapper>
        </ContactInfo>
        <Paragraph>
          Được thành lập vào năm 2023, trải qua 1 năm hoạt động Hồng Phong Pet
          đã cung cấp cún các tỉnh thành trên cả nước và đang trên con đường trở
          thành kênh thú cưng lớn mạnh nhất Việt Nam.
        </Paragraph>
        <Paragraph>
          Đối với Shop, người thành lập nên Hồng Phong Pet thì chó mèo không chỉ
          là vật nuôi mà còn là người bạn đồng hành trong cuộc sống, vậy nên
          ngoài việc bán chó mèo cảnh, mình đã xây dựng Hồng Phong Pet thành một
          nơi để các bạn yêu cún có thể chia sẻ kinh nghiệm nuôi dạy cũng như
          lưu giữ những khoảnh khắc của bé cưng. Đến nay Hồng Phong Pet đang trở
          thành cộng đồng thú cưng lớn tại Việt Nam. Đó là một điều rất đáng tự
          hào đối với bản thân mình, trong tương lai mình sẽ luôn phấn đấu cũng
          như phát triển thêm các dịch vụ khác để phục vụ tốt nhất cho cộng đồng
          yêu thú cưng!
        </Paragraph>
        <Paragraph>
          Trong quá trình hoạt động, Hồng Phong Pet luôn làm đúng những gì đã
          cam kết, tư vấn đầy đủ cũng như luôn đảm bảo quyền lợi của khách hàng.
          Trong quá trình hoạt động, Hồng Phong Pet tự hào được khách hàng bình
          chọn là thương hiệu Uy Tín – Chất Lượng và là nơi để các bạn yêu thú
          cưng tìm đến khi có nhu cầu sở hữu một người bạn bốn chân.
        </Paragraph>
        <hr></hr>
        <ContactInfo1>
          <Paragraph>
            <b>Liên hệ : Địa chỉ</b>
          </Paragraph>
          <Paragraph>
            <b>Hà Nội: </b>Số 168 Thượng Đình - Thanh Xuân
          </Paragraph>
          <Paragraph>
            <b>Email: </b>hongphongpet2023@gmail.com
          </Paragraph>
          <Paragraph>
            <b>Hotline: </b>0327.433.067
          </Paragraph>
          <Paragraph>
            <b>Thời gian làm việc</b>
          </Paragraph>
          <Paragraph>8:30am - 22:00pm</Paragraph>
          <Paragraph>Từ thứ 2 đến chủ nhật</Paragraph>
        </ContactInfo1>
      </InnerContainer>
    </div>
  );
};

export default AboutPage;
