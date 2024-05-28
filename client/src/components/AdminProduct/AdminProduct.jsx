import React from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Modal, Select, Space } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { getBase64, renderOptions } from "../../utils";
import { WrapperUploadFile } from "./style";
import * as ProductService from "../../service/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useEffect } from "react";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useRef } from "react";

const AdminProduct = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeSelect, setTypeSelect] = useState("");
  const user = useSelector((state) => state?.user);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    countInStock: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    newType: "",
    discount: "",
    selled: "",
    origin: "",
  });
  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    type: "",
    countInStock: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    discount: "",
    selled: "",
    origin: "",
  });
  const [form] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const {
      name,
      type,
      countInStock,
      price,
      description,
      rating,
      image,
      discount,
      selled,
      origin,
    } = data;
    const res = ProductService.createProduct({
      name,
      type,
      countInStock,
      price,
      description,
      rating,
      image,
      discount,
      selled,
      origin,
    });
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });
  const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });
  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        discount: res?.data?.discount,
        selled: res?.data?.selled,
        origin: res?.data?.origin,
      });
    }
  };
  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };
  const handleDeleteManyProducts = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
    ...{ retry: 3, retryDelay: 1000 },
  });
  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
    ...{ retry: 3, retryDelay: 1000 },
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const { data, isLoading, isSuccess } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingdeleted,
    isSuccess: isSuccessdeleted,
  } = mutationDelete;
  const {
    data: dataDeletedMany,
    isLoading: isLoadingdeletedMany,
    isSuccess: isSuccessdeletedMany,
  } = mutationDeleteMany;

  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "OK") {
        message.success();
        handleCancel();
      } else {
        message.error();
      }
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessUpdated) {
      if (dataUpdated?.status === "OK") {
        message.success();
        handleCloseDrawer();
      } else {
        message.error();
      }
    }
  }, [isSuccessUpdated]);
  useEffect(() => {
    if (isSuccessdeleted) {
      if (dataDeleted?.status === "OK") {
        message.success();
        handleCancelDelete();
      } else {
        message.error();
      }
    }
  }, [isSuccessdeleted]);
  useEffect(() => {
    if (isSuccessdeletedMany) {
      if (dataDeletedMany?.status === "OK") {
        message.success();
      } else {
        message.error();
      }
    }
  }, [isSuccessdeletedMany]);
  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      discount: stateProduct.discount,
      selled: stateProduct.selled,
      origin: stateProduct.origin,
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      type: "",
      countInStock: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      discount: "",
      selled: "",
      origin: "",
    });
    form.resetFields();
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      type: "",
      countInStock: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      discount: "",
      selled: "",
      origin: "",
    });
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };

  const renderAction = () => {
    return (
      <div>
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">=1000000",
          value: ">=",
        },
        {
          text: "<=1000000",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        console.log("value", value, record);
        if (value === ">=") {
          return record.price >= 1000000;
        }
        return record.price <= 1000000;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">=3",
          value: ">=",
        },
        {
          text: "<=3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        console.log("value", value, record);
        if (value === ">=") {
          return record.rating >= 3;
        }
        return record.rating <= 3;
      },
    },
    {
      title: "Phân loại",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
      ...getColumnSearchProps("type"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateProductDetails },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };
  return (
    <div>
      <WrapperHeader>Quản lí sản phẩm </WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "60px",
            width: "70px",
            bordeRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <AppstoreAddOutlined style={{ fontSize: "20px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyProducts}
          columns={columns}
          isLoading={isLoadingProducts}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo sản phẩm "
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập vào Tên!" }]}
          >
            <InputComponent
              value={stateProduct.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Loại"
            name="type"
            rules={[{ required: true, message: "Vui lòng nhập vào Loại!" }]}
          >
            <Select
              name="type"
              // defaultValue="lucy"
              // style={{ width: 120 }}
              value={stateProduct.type}
              onChange={handleChangeSelect}
              options={renderOptions(typeProduct?.data?.data)}
            />
          </Form.Item>
          {stateProduct.type === "add_type" && (
            <Form.Item
              label="Phân loại mới"
              name="newType"
              rules={[
                { required: true, message: "Vui lòng nhập vào Phân loại mới!" },
              ]}
            >
              <InputComponent
                value={stateProduct.newType}
                onChange={handleOnchange}
                name="newType"
              />
            </Form.Item>
          )}
          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[{ required: true, message: "Vui lòng nhập vào Số lượng!" }]}
          >
            <InputComponent
              value={stateProduct.countInstock}
              onChange={handleOnchange}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập vào Giá tiền!" }]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnchange}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập vào Mô tả!" }]}
          >
            <InputComponent
              value={stateProduct.description}
              onChange={handleOnchange}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[{ required: true, message: "Vui lòng nhập vào Đánh giá!" }]}
          >
            <InputComponent
              value={stateProduct.rating}
              onChange={handleOnchange}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Giảm giá"
            name="discount"
            rules={[{ required: true, message: "Vui lòng nhập vào Giảm giá!" }]}
          >
            <InputComponent
              value={stateProduct.discount}
              onChange={handleOnchange}
              name="discount"
            />
          </Form.Item>
          <Form.Item
            label="Đẫ bán"
            name="selled"
            rules={[
              { required: true, message: "Vui lòng nhập vào Số lượng đã bán!" },
            ]}
          >
            <InputComponent
              value={stateProduct.selled}
              onChange={handleOnchange}
              name="selled"
            />
          </Form.Item>
          <Form.Item
            label="Xuất xứ"
            name="origin"
            rules={[{ required: true, message: "Vui lòng nhập vào Xuất xứ!" }]}
          >
            <InputComponent
              value={stateProduct.origin}
              onChange={handleOnchange}
              name="origin"
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Vui lòng thêm hình ảnh!" }]}
          >
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
                  style={{
                    height: "60px",
                    width: "60px",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="40%"
      >
        <Form
          name="Update"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          onFinish={onUpdateProduct}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <InputComponent
              value={stateProductDetails.name}
              onChange={handleOnchangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Loại"
            name="type"
            rules={[{ required: true, message: "Please input your Type!" }]}
          >
            <InputComponent
              value={stateProductDetails.type}
              onChange={handleOnchangeDetails}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[
              { required: true, message: "Please input your countInStock!" },
            ]}
          >
            <InputComponent
              value={stateProductDetails.countInstock}
              onChange={handleOnchangeDetails}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[{ required: true, message: "Please input your Price!" }]}
          >
            <InputComponent
              value={stateProductDetails.price}
              onChange={handleOnchangeDetails}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Please input your Description!" },
            ]}
          >
            <InputComponent
              value={stateProductDetails.description}
              onChange={handleOnchangeDetails}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[{ required: true, message: "Please input your Rating!" }]}
          >
            <InputComponent
              value={stateProductDetails.rating}
              onChange={handleOnchangeDetails}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Giảm giá"
            name="discount"
            rules={[{ required: true, message: "Please input your discount!" }]}
          >
            <InputComponent
              value={stateProductDetails.discount}
              onChange={handleOnchangeDetails}
              name="discount"
            />
          </Form.Item>
          <Form.Item
            label="Đã bán"
            name="selled"
            rules={[{ required: true, message: "Please input your selled!" }]}
          >
            <InputComponent
              value={stateProductDetails.selled}
              onChange={handleOnchangeDetails}
              name="selled"
            />
          </Form.Item>
          <Form.Item
            label="Xuất xứ"
            name="origin"
            rules={[{ required: true, message: "Vui lòng nhập vào Xuất xứ!" }]}
          >
            <InputComponent
              value={stateProductDetails.origin}
              onChange={handleOnchangeDetails}
              name="origin"
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Please input your Rating!" }]}
          >
            <WrapperUploadFile
              onChange={handleOnchangeAvatarDetails}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
              {stateProductDetails?.image && (
                <img
                  src={stateProductDetails?.image}
                  style={{
                    height: "60px",
                    width: "60px",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
      <ModalComponent
        title="Xóa sản phẩm "
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <div>Bạn có chắc muốn xóa sản phẩm này không ?</div>
      </ModalComponent>
    </div>
  );
};
export default AdminProduct;
