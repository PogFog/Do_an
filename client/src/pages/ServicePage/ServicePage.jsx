import React from "react";
import {
  Container,
  Header,
  Paragraph,
  Question,
  Highlight,
  UnorderedList,
  ListItem,
  ImageGallery,
  Image,
} from "./style";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
const AboutPage = () => {
  return (
    <Container>
      <Header>DỊCH VỤ KHÁCH SẠN THÚ CƯNG CHÓ MÈO TẠI HỒNG PHONG PET</Header>
      <Question>Bạn đang quá bận rộn với công việc? KPI thì ngập đầu?</Question>
      <Question>Bạn chuẩn bị có chuyến công tác ngắn ngày?</Question>
      <Question>Bạn đang lên lịch đi du lịch, về quê thăm người thân?</Question>
      <Question>Bạn muốn đưa thú cưng đi cùng nhưng lại sợ bất tiện?</Question>
      <Question>Bạn đang không biết phải gửi bé cưng của mình ở đâu?</Question>
      <Paragraph>
        Bạn yên tâm, dịch vụ lưu trú khách sạn với{" "}
        <Highlight>Hồng Phong Pet</Highlight> sẽ giúp bạn chăm sóc các bé yêu.
      </Paragraph>
      <Paragraph>
        Con cưng vui khoẻ, thoải mái như ở nhà với{" "}
        <Highlight>Dịch Vụ Lưu Trú Khách Sạn</Highlight> cho chó mèo tại shop.
        Chăm sóc con tận tâm và chu đáo nhất là điều mà{" "}
        <Highlight>Hồng Phong Pet</Highlight> muốn mang đến cho các bé khi lưu
        trú tại khách sạn chó mèo của Hồng Phong Pet.
      </Paragraph>
      <Paragraph>Những đặc quyền cho con:</Paragraph>
      <UnorderedList>
        <ListItem>
          Không gian phòng rộng rãi, sạch sẽ với đầy đủ tiện nghi: thiết kế sang
          trọng, nhiều đồ dùng vui chơi, máy lạnh,... đặc biệt có camera 24/7
          tiện theo dõi từng bé.
        </ListItem>
        <ListItem>
          Chế độ ăn uống phù hợp với mỗi bé, được cung cấp theo menu đầy đủ dinh
          dưỡng để các bé có đầy năng lượng để vui chơi.
        </ListItem>
        <ListItem>
          Nhân viên túc trực để tiện theo dõi tình hình sức khoẻ, ăn uống của
          các bé.
        </ListItem>
        <ListItem>
          Các bé được trải nghiệm không gian vui chơi tại phòng hotel mỗi ngày
          riêng biệt từng phòng ra chơi.
        </ListItem>
        <ListItem>
          Hình ảnh, video clip của các bé sẽ được lưu lại và cập nhật hàng ngày.
        </ListItem>
      </UnorderedList>
      <ImageGallery>
        <Image src={img1} alt="Pet 1" />
        <Image src={img2} alt="Pet 2" />
        <Image src={img3} alt="Pet 3" />
      </ImageGallery>
    </Container>
  );
};

export default AboutPage;
