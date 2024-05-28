import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import ServicePage from "../pages/ServicePage/ServicePage";
import OrderSucessOnline from "../pages/OrderSuccessOnline/OrderSuccessOnline";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/details-order/:id",
    page: DetailsOrderPage,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/product-details/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/orderSuccess",
    page: OrderSucess,
    isShowHeader: true,
  },
  {
    path: "/orderSuccessOnline",
    page: OrderSucessOnline,
    isShowHeader: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
  },
  {
    path: "/about",
    page: AboutPage,
    isShowHeader: true,
  },
  {
    path: "/service",
    page: ServicePage,
    isShowHeader: true,
  },
  {
    path: "/contact",
    page: ContactPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
