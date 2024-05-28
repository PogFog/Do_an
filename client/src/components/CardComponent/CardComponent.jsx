import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReporText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    selled,
    discount,
    id,
  } = props;
  const navigate = useNavigate();
  const handleDetalisProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{ width: 240 }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={image} />}
      onClick={() => countInStock !== 0 && handleDetalisProduct(id)}
      disabled={countInStock === 0}
    >
      {/* <img src={logo} style={{width:'68px', height:'14px', position:'absolute', top:-1,left:-1,borderTopLeftRadius:'3px'}}/> */}
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReporText>
        <span style={{ marginRight: "4px" }}>
          <span>
            {rating}{" "}
            <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
          </span>
        </span>
        <WrapperStyleTextSell>| Đã bán {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReporText>
      <WrapperPriceText>
        <span style={{ marginRight: "5px" }}>{convertPrice(price)}</span>
        <WrapperDiscountText>-{discount}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};
export default CardComponent;
