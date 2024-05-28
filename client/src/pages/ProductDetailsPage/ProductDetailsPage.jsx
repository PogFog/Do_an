import React, { useEffect, useState } from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { WrapperProducts } from "./style";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  background: #f0f8ff; /* Màu xanh dương nhạt */
  padding: 20px;
  box-sizing: border-box;
`;

const Container = styled.div`
  max-width: 1270px;
  margin: 0 auto;
  overflow: hidden;
`;

const Title = styled.h3`
  padding-top: 10px;
`;

const ProductDetailsPage = () => {
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    console.log("contex", context);
    const res = await ProductService.getAllProduct(limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", limit],
    queryFn: fetchProductAll,
    ...{ retry: 3, retryDelay: 1000, keepPreviousData: true },
  });
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  // const filteredProducts = selectedProduct
  //   ? products?.data?.filter(product => product.type === .type)
  //   : [];
  const { id } = useParams();
  return (
    <Wrapper>
      <Container>
        <Title>Trang chủ - Chi tiết Sản Phẩm</Title>
        <ProductDetailsComponent idProduct={id} />
      </Container>
    </Wrapper>
  );
};

export default ProductDetailsPage;
