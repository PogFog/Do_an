import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams } from "react-router-dom";
import { WrapperTypeProduct } from "./style";

const ProductDetailsPage = () => {
  const { id } = useParams();
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#efefef",
        height: "1000px",
      }}
    >
      <div style={{ width: "1570px", height: "100%", margin: "0 auto" }}>
        <h3 style={{ paddingTop: "10px" }}>
          {" "}
          Trang chủ {"-"} Chi tiết Sản Phẩm
        </h3>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
