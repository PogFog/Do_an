import React, { useState } from "react";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate, Slider } from "antd";

const NavbarComponent = () => {
  const onChange = () => {};
  // Khởi tạo state để lưu giá trị của slider
  const [range, setRange] = useState([10000, 20000000]);

  // Hàm xử lý khi giá trị slider thay đổi
  const handleChange = (value) => {
    setRange(value);
  };
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          console.log("check", option);
          return (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span>{`tu ${option} sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };
  // Hàm xử lý khi giá trị slider thay đổi
  return (
    <div>
      <WrapperLableText>Lable</WrapperLableText>
      <WrapperContent>
        {renderContent("text", ["tu lanh", "tv", "maygiat"])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ])}
      </WrapperContent>
      <WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>
      <br></br>
      <WrapperContent>Giá tiền</WrapperContent>
      <div>
        <Slider
          min={10000}
          max={20000000}
          range
          defaultValue={[10000, 20000000]}
          onChange={handleChange}
        />
        <div>
          Gia tiền từ: {range[0]} - {range[1]}
        </div>
      </div>
    </div>
  );
};
export default NavbarComponent;
