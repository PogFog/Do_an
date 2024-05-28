import { Col, Image, InputNumber, Rate, Row } from "antd";
import React, { useEffect } from "react";
import imageProduct from "../../assets/images/a1.jpg";
import imageProductSmall from "../../assets/images/a4.jpg";
import {
  TitleProduct,
  WrapperAddressProduct,
  WrapperBtnQualityProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperProducts,
  WrapperQualityProduct,
  WrapperStyle,
  WrapperStyle2,
  WrapperStyle3,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import CardComponent from "../CardComponent/CardComponent";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };

  const { isLoading, data: productsDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    ...{ enabled: !!idProduct },
  });
  console.log("productsDetails", productsDetails);
  console.log("location", location);

  const handleAddOderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productsDetails?.name,
            amount: numProduct,
            image: productsDetails?.image,
            price: productsDetails?.price,
            product: productsDetails?._id,
            discount: productsDetails?.discount,
            countInStock: productsDetails?.countInStock,
          },
        })
      );
    }
  };
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const res = await ProductService.getAllProduct(limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const { data: products } = useQuery({
    queryKey: ["products", limit],
    queryFn: fetchProductAll,
    ...{ retry: 3, retryDelay: 1000, keepPreviousData: true },
  });
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  const filteredProducts =
    products?.data?.filter(
      (product) =>
        product.type === productsDetails?.type &&
        product._id !== productsDetails?._id
    ) || [];
  const getRandomProducts = (products, n) => {
    const randomProducts = [];
    const numProducts = Math.min(n, products.length);
    const shuffledProducts = products.sort(() => Math.random() - 0.5);
    for (let i = 0; i < numProducts; i++) {
      randomProducts.push(shuffledProducts[i]);
    }
    return randomProducts;
  };
  const randomfilteredProducts = getRandomProducts(filteredProducts, 6);

  return (
    <div>
      <Row style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
        <Col
          span={10}
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "20px" }}
        >
          <Image
            src={productsDetails?.image}
            alt="Image Product"
            preview={false}
          />
          <Row
            style={{ paddingTop: "10px", justifyContent: "space-between" }}
          ></Row>
        </Col>
        <Col span={14} style={{ paddingLeft: "20px" }}>
          <WrapperStyleNameProduct>
            {productsDetails?.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate
              allowHalf
              defaultValue={productsDetails?.rating}
              value={productsDetails?.rating}
            />
            <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productsDetails?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <div>
            <WrapperStyle>
              <WrapperStyle2>Giảm giá: </WrapperStyle2>
              <WrapperStyle3>{productsDetails?.discount}%</WrapperStyle3>
            </WrapperStyle>
            <WrapperStyle>
              <WrapperStyle2>Xuất xứ: </WrapperStyle2>
              <WrapperStyle3>{productsDetails?.origin}</WrapperStyle3>{" "}
            </WrapperStyle>
            <WrapperStyle>
              <WrapperStyle2>Mô tả: </WrapperStyle2>
              <WrapperStyle3>{productsDetails?.description}</WrapperStyle3>
            </WrapperStyle>
            <WrapperStyle>
              <WrapperStyle2>Số lượng hiện có tại shop :</WrapperStyle2>{" "}
              <WrapperStyle3>{productsDetails?.countInStock}</WrapperStyle3>
            </WrapperStyle>
          </div>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className="address">{user?.address}</span> -
            <span className="change-address" style={{ cursor: "pointer" }}>
              {" "}
              Đổi địa chỉ
            </span>
          </WrapperAddressProduct>
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("decrease")}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                size="medium"
                onChange={onChange}
                defaultValue={1}
                value={numProduct}
                max={idProduct?.countInStock}
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("increase")}
              >
                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              onClick={handleAddOderProduct}
              textButton={"Chọn mua"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: 500,
              }}
            ></ButtonComponent>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "#fff",
                height: "48px",
                width: "220px",
                border: "2px solid rgb(13,92,182)",
                borderRadius: "4px",
              }}
              textButton={"Mua trả sau"}
              styleTextButton={{
                color: "rgb(13,92,182)",
                fontSize: "15px",
                fontWeight: 400,
              }}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
      <TitleProduct>Sản phẩm liên quan</TitleProduct>
      <WrapperProducts>
        {[...randomfilteredProducts]?.map((product) => {
          return (
            <CardComponent
              key={product._id}
              countInStock={product.countInStock}
              description={product.description}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
              type={product.type}
              selled={product.selled}
              discount={product.discount}
              id={product._id}
            />
          );
        })}
      </WrapperProducts>
    </div>
  );
};

export default ProductDetailsComponent;
