import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";

class UserChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelMonth: [],
      totalPriceDataByMonth: {},
      totalPriceDataByYear: {},
      totalProductsDataByMonth: {},
      bestSellingProducts: [], // Thêm state để lưu trữ dữ liệu sản phẩm bán chạy
      selectedYear: new Date().getFullYear(),
    };
  }

  componentDidMount() {
    this.fetchTotalPriceData();
    this.fetchBestSellingProducts(); // Gọi hàm để lấy dữ liệu sản phẩm bán chạy
  }

  fetchTotalPriceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/order/get-total`
      );
      const orders = response.data;
      const {
        totalPriceDataByMonth,
        totalPriceDataByYear,
        totalProductsDataByMonth,
      } = this.calculateTotalPrice(orders);
      const labelMonth = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
      this.setState({
        totalPriceDataByMonth,
        totalPriceDataByYear,
        totalProductsDataByMonth,
        labelMonth,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchBestSellingProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/order/get-best-selling`
      );
      this.setState({ bestSellingProducts: response.data });
    } catch (error) {
      console.error("Error fetching best-selling products data:", error);
    }
  };

  calculateTotalPrice = (orders) => {
    let totalPriceDataByMonth = {};
    let totalPriceDataByYear = {};
    let totalProductsDataByMonth = {};
    orders.forEach((order) => {
      const year = order.year;
      const month = order.month - 1;
      if (!totalPriceDataByMonth[year]) {
        totalPriceDataByMonth[year] = new Array(12).fill(0);
        totalProductsDataByMonth[year] = new Array(12).fill(0);
      }
      totalPriceDataByMonth[year][month] += order.totalAmount;
      totalProductsDataByMonth[year][month] += order.totalProducts;

      if (!totalPriceDataByYear[year]) {
        totalPriceDataByYear[year] = 0;
      }
      totalPriceDataByYear[year] += order.totalAmount;
    });
    return {
      totalPriceDataByMonth,
      totalPriceDataByYear,
      totalProductsDataByMonth,
    };
  };

  handleYearChange = (event) => {
    this.setState({ selectedYear: event.target.value });
  };

  render() {
    const {
      totalPriceDataByMonth,
      totalPriceDataByYear,
      totalProductsDataByMonth,
      labelMonth,
      selectedYear,
      bestSellingProducts, // Lấy dữ liệu sản phẩm bán chạy từ state
    } = this.state;
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14,
            },
          },
        },
      },
    };

    const monthChartData = {
      labels: labelMonth,
      datasets: [
        {
          label: `Tổng giá trị đơn hàng theo tháng năm ${selectedYear}`,
          data: totalPriceDataByMonth[selectedYear] || new Array(12).fill(0),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 3,
        },
        {
          label: `Số lượng sản phẩm bán được theo tháng năm ${selectedYear}`,
          data: totalProductsDataByMonth[selectedYear] || new Array(12).fill(0),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 3,
        },
      ],
    };

    const yearLabels = Object.keys(totalPriceDataByYear);
    const yearChartData = {
      labels: yearLabels,
      datasets: [
        {
          label: "Tổng giá trị đơn hàng theo năm",
          data: yearLabels.map((year) => totalPriceDataByYear[year]),
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          borderColor: "rgb(153, 102, 255)",
          borderWidth: 3,
        },
      ],
    };

    const bestSellingProductsData = {
      labels: bestSellingProducts.map((product) => product.name),
      datasets: [
        {
          label: "Số lượng bán trong ngày",
          data: bestSellingProducts.map((product) => product.totalSold),
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 3,
        },
      ],
    };

    const labelSelectStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    };

    const yearLabelStyle = {
      marginRight: "10px",
    };

    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Chọn năm:</label>
          <select
            value={selectedYear}
            onChange={this.handleYearChange}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              minWidth: "100px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "14px",
            }}
          >
            {Object.keys(totalPriceDataByMonth).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div style={{ width: "70%", height: "500px", margin: "0 auto" }}>
          <Bar options={options} data={monthChartData} />
        </div>
        <div style={{ width: "70%", height: "500px", margin: "0 auto" }}>
          <Bar options={options} data={yearChartData} />
        </div>
        <div style={{ width: "70%", height: "500px", margin: "0 auto" }}>
          <Bar options={options} data={bestSellingProductsData} />
        </div>
      </div>
    );
  }
}

export default UserChart;
