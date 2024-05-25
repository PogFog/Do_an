import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import { axiosJWT } from "../../service/UserService";

class UserChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelMonth: [],
      totalPriceData: [],
    };
  }

  componentDidMount() {
    this.fetchTotalPriceData();
  }

  fetchTotalPriceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/order/get-total`
      );
      const orders = response.data;
      console.log("response.data", response.data);
      const totalPriceData = this.calculateTotalPriceByMonth(orders);
      const labelMonth = totalPriceData.map((_, index) => `Tháng ${index + 1}`);
      this.setState({ totalPriceData, labelMonth });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  calculateTotalPriceByMonth = (orders) => {
    const totalPriceByMonth = new Array(12).fill(0);
    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      totalPriceByMonth[month] += order.totalPrice;
    });
    return totalPriceByMonth;
  };

  render() {
    const { totalPriceData, labelMonth } = this.state;
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
    const chartData = {
      labels: labelMonth,
      datasets: [
        {
          label: "Tổng giá trị đơn hàng",
          data: totalPriceData,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 3,
        },
      ],
    };
    return <Line options={options} data={chartData} />;
  }
}

export default UserChart;
