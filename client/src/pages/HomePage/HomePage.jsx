import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  TitleProduct,
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import a7 from "../../assets/images/a7.jpg";
import a8 from "../../assets/images/a8.jpg";
import a9 from "../../assets/images/a9.jpg";
import a10 from "../../assets/images/anhs1.jpg";
import a11 from "../../assets/images/anhs2.jpg";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [typeProducts, setTypeProducts] = useState([]);
  const fetchProductAll = async (context) => {
    console.log("contex", context);
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    ...{ retry: 3, retryDelay: 1000, keepPreviousData: true },
  });
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  console.log("products", products);

  const sortedProducts = products?.data?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const newestProducts = sortedProducts?.slice(0, 6);
  const sortedProducts1 = products?.data?.sort((a, b) => b.selled - a.selled);

  // Lấy ra 5 sản phẩm bán chạy nhất
  const bestSellingProducts = sortedProducts1?.slice(0, 6);
  const productsByType = {};

  // Lấy ra các sản phẩm theo loại "Chó" và "Mèo"
  const dogProducts =
    products?.data?.filter((product) => product.type === "Chó") || [];
  const catProducts =
    products?.data?.filter((product) => product.type === "Mèo") || [];
  const accessoryProducts =
    products?.data?.filter((product) => product.type === "Phụ kiện thú cưng") ||
    [];
  const petFood =
    products?.data?.filter(
      (product) => product.type === "Thực phẩm thú cưng"
    ) || [];
  // Hàm lấy ra n sản phẩm ngẫu nhiên từ một mảng sản phẩm
  const getRandomProducts = (products, n) => {
    const randomProducts = [];
    const numProducts = Math.min(n, products.length);
    const shuffledProducts = products.sort(() => Math.random() - 0.5);
    for (let i = 0; i < numProducts; i++) {
      randomProducts.push(shuffledProducts[i]);
    }
    return randomProducts;
  };

  // Lấy ra 3 sản phẩm ngẫu nhiên từ mỗi loại type
  const randomDogProducts = getRandomProducts(dogProducts, 6);
  const randomCatProducts = getRandomProducts(catProducts, 6);
  const randomAccessoryProducts = getRandomProducts(accessoryProducts, 6);
  const randomPetFood = getRandomProducts(petFood, 6);
  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ width: "1570px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#efefef" }}
      >
        <div
          id="container"
          style={{
            margin: "0 auto",
            width: "1570px",
            paddingBottom: "100px",
            height: "100%",
          }}
        >
          <SliderComponent arrImages={[a11, a10, a7, a8, a9]} />
          {/* <WrapperProducts>
            {products?.data?.map((product) => {
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
          </WrapperProducts> */}
          <TitleProduct>SẢN PHẨM MỚI</TitleProduct>
          <WrapperProducts>
            {newestProducts?.map((product) => {
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
          <TitleProduct>SẢN PHẨM NỔI BẬT</TitleProduct>
          <WrapperProducts>
            {bestSellingProducts?.map((product) => {
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
          <TitleProduct> SHOP BÁN CHÓ MÈO CẢNH </TitleProduct>
          <WrapperProducts>
            {[...randomDogProducts, ...randomCatProducts].map((product) => (
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
            ))}
          </WrapperProducts>
          <TitleProduct> PHỤ KIỆN THÚ CƯNG </TitleProduct>
          <WrapperProducts>
            {[...randomAccessoryProducts, ...randomPetFood].map((product) => (
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
            ))}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textButton="Xem thêm"
              type="outline"
              styleButton={{
                border: "1px solid #ff9999",
                color: `${
                  products?.total === products?.data?.length
                    ? "#ccc"
                    : "#ff9999"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              styleTextButton={{
                fontWeight: "500",
                color: products?.total === products?.data?.length && "#DDD",
              }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};
export default HomePage;
