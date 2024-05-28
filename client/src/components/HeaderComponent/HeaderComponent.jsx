import { Badge, Col, Flex, Popover } from "antd";
import React, { useState } from "react";
import {
  LiStyle,
  UlStyle,
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import Search from "antd/es/input/Search";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { useEffect } from "react";
import { logDOM } from "@testing-library/react";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = (isHiddenSearch = false, isHiddenCart = false) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [search, setSearch] = useState("");
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const navigate1 = useNavigate();
  const handleNavigateHomePage = () => {
    navigate1("/");
  };
  const dispatch = useDispatch();
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    localStorage.removeItem("access_token");
    dispatch(resetUser());
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);
  const handleNavigatePets = () => {
    navigate("/");
  };
  const handleNavigateAbout = () => {
    navigate("/about");
  };
  const handleNavigateContact = () => {
    navigate("/contact");
  };
  const handleNavigateService = () => {
    navigate("/service");
  };
  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quảng lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng Xuất
      </WrapperContentPopup>
    </div>
  );
  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#ff9999",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenCart && isHiddenSearch ? "space-between" : "unset",
        }}
      >
        <Col span={2}>
          <WrapperTextHeader
            onClick={handleNavigateHomePage}
            style={{ cursor: "pointer" }}
          >
            HONGPHONGPET
          </WrapperTextHeader>
        </Col>
        <Col span={7}>
          <UlStyle>
            <ul>
              <LiStyle onClick={handleNavigatePets}>THÚ CƯNG</LiStyle>
              <LiStyle onClick={handleNavigateService}>DỊCH VỤ</LiStyle>
              <LiStyle onClick={handleNavigateAbout}>GIỚI THIỆU</LiStyle>
              <LiStyle onClick={handleNavigateContact}>LIÊN HỆ</LiStyle>
            </ul>
          </UlStyle>
        </Col>
        {isHiddenSearch && (
          <Col span={6}>
            <ButtonInputSearch
              size="large"
              bordered={false}
              textButton="Tìm kiếm"
              placeholder="Nhập để tìm kiếm....."
              onChange={onSearch}
              backgroundColorButton="#5a20c1"
            />
          </Col>
        )}
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng nhập/Đăng ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          {isHiddenCart && (
            <div
              onClick={() => navigate("/order")}
              style={{ cursor: "pointer" }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};
export default HeaderComponent;
