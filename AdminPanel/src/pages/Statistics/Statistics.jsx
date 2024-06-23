import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"; // Import necessary components from recharts
import "./Statistics.css";

const Statistics = () => {
  const [productsData, setProductsData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [averageOrderAmount, setAverageOrderAmount] = useState(0);
  const [wrapOrdersCount, setWrapOrdersCount] = useState(0);

  useEffect(() => {
    const fetchProductSalesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/productsales"
        );
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching product sales data:", error);
      }
    };

    const fetchOrderStatusData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/orderstatus"
        );
        setOrderStatusData(response.data);
      } catch (error) {
        console.error("Error fetching order status data:", error);
      }
    };

    const fetchAverageOrderAmount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/averageorderamount"
        );
        setAverageOrderAmount(response.data.averageAmount);
      } catch (error) {
        console.error("Error fetching average order amount:", error);
      }
    };

    const fetchWrapOrdersCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/ordersbyitem/wrap"
        );
        setWrapOrdersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching wrap orders count:", error);
      }
    };

    fetchProductSalesData();
    fetchOrderStatusData();
    fetchAverageOrderAmount();
    fetchWrapOrdersCount();
  }, []);

  // Sample data for income chart (replace with actual data)
  const incomeData = [
    { date: "2023-06-01", income: 1200 },
    { date: "2023-06-02", income: 1500 },
    { date: "2023-06-03", income: 1800 },
    { date: "2023-06-04", income: 1400 },
    { date: "2023-06-05", income: 1600 },
    { date: "2023-06-06", income: 2000 },
  ];

  // Colors for PieChart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="statistics-container">
      <h1>Statistics</h1>
      <div className="chart-container">
        {/* Income per day chart */}
        <div className="chart">
          <h2>Income per Day</h2>
          <LineChart width={600} height={300} data={incomeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Most Sold Products chart */}
        <div className="chart">
          <h2>Most Sold Products</h2>
          <BarChart width={600} height={300} data={productsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Order Status Distribution chart */}
        <div className="chart">
          <h2>Order Status Distribution</h2>
          <PieChart width={600} height={300}>
            <Pie
              data={orderStatusData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {orderStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Average Order Amount chart */}
        <div className="chart">
          <h2>Average Order Amount</h2>
          <BarChart
            width={600}
            height={300}
            data={[{ name: "Average", amount: averageOrderAmount }]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Wrap Orders Count */}
        <div className="chart">
          <h2>Wrap Orders Count</h2>
          <p>Total unique users who ordered wraps: {wrapOrdersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
