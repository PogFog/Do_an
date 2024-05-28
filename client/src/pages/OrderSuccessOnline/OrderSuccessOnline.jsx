import React from "react";
import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperCountOrder,
  WrapperItemOrder,
  WrapperItemOrderInfo,
} from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";

const OrderSucess = () => {
  const navigate = useNavigate();
  const naigate1 = () => {
    navigate("/");
  };
  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Đơn hàng đặt thành công</h3>
        <button onClick={naigate1}>Quay lại trang chủ</button>
      </div>
    </div>
  );
};

export default OrderSucess;
