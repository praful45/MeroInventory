import { ShoppingCartOutlined, UsergroupAddOutlined, AppstoreOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import { Container, Navbar } from "react-bootstrap";
// import { Bar } from 'react-chartjs-2';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie,  Legend, Cell } from 'recharts';
import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [categoryCount, setCategoryCount] = useState();
  const salesData = [
    { name: 'Remaining Quantity', remainingQuantity: 100, soldQuantity: 75 },
    { name: 'Sold Quantity', remainingQuantity: 200, soldQuantity: 150 },

  ];
  const data = [
    { name: 'Laptop', quantity: 20 },
    { name: 'Speaker', quantity: 15 },
    { name: 'Camera', quantity: 10 },
    { name: 'Drone', quantity: 8 },
    { name: 'Computer', quantity: 12 },
    { name: 'Mobile', quantity: 25 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF4D4F'];
  const colorIndex = [
    { name: 'Remaining Quantity', color: '#1890ff' },
    { name: 'Sold Quantity', color: '#f5222d' },
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallcategories');
      console.log(response.data);
      setCategoryCount(response.data.length); // Set the category count
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories(); // Fetch categories and update the count on component mount
  }, []);


  return (
    <div>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <UsergroupAddOutlined style={{
              color: "#52c41a",
              backgroundColor: "rgba(0,255,0,0,0.5)",
              borderRadius: 20,
              fontSize: 46,
              padding: 12,
              height: 40,
              width: 200,

            }}
            />} title={"Total vendors"} value={1234} />
        <DashboardCard
          icon={<AppstoreOutlined style={{
            color: "#f5222d",
            backgroundColor: "rgba(0,255,0,0,0.5)",
            borderRadius: 20,
            fontSize: 46,
            padding: 12,
            height: 20,
            width: 200

          }} />} title={"Total Categories"} value={categoryCount} />
        <DashboardCard
          icon={<ShoppingCartOutlined style={{
            color: "#1890ff",
            backgroundColor: "rgba(0,255,0,0,0.5)",
            borderRadius: 20,
            fontSize: 46,
            padding: 12,
            height: 40,
            width: 200

          }} />} title={"Total Products"} value={1234} />
        <DashboardCard icon={<CreditCardOutlined style={{
          color: "#8c8c8c",
          backgroundColor: "rgba(0,255,0,0,0.5)",
          borderRadius: 20,
          fontSize: 46,
          padding: 12,
          height: 40,
          width: 200

        }} />} title={"Total sales"} value={1234} />
      </Space>
      <Navbar style={{ background: '#AFD3E2' }}>
        <Container>
          <b>Welcome to Mero Inventory</b>
        </Container>
      </Navbar>
      <div className="graph">
        <div>
          <Typography.Title level={4}>Sales Report</Typography.Title>
          <ResponsiveContainer width="76%" height={325}>
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="remainingQuantity" fill="#1890ff" name="Remaining Quantity" />
              <Bar dataKey="soldQuantity" fill="#f5222d" name="Sold Quantity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
        <Typography.Title level={4}>Product Report</Typography.Title>
      <Card style={{ margin: '5px', border: '1px solid black', borderRadius: 8,width:600 }}>
        <PieChart width={375} height={250}>
          <Pie
            dataKey="quantity"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={(entry) => entry.name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Card>
        </div>
      </div>
    </div>

  );
}




function DashboardCard({ title, value, icon }) {
  return (
    // <Card>
    //   <Space direction="horizontal">
    //     {icon}
    //     <Statistic title={title} value={value}/>
    //   </Space>
    // </Card>
    <Card style={{ margin: '14px', border: '1px solid black', borderRadius: 8 }}>
      <Space direction="horizontal">
        {/* <div style={{ backgroundColor: 'rgba(0, 255, 0, 0.5)', borderRadius: 20 }}> */}
        {icon}
        {/* </div> */}
        <Statistic title={title} value={value} />
        {/* <Bar data={data} options={{}} /> */}
        {/* <Statistic title={<Typography.Text style={{ fontSize: 18 }}>{title}</Typography.Text>} value={<Typography.Text style={{ fontSize: 24 }}>{value}</Typography.Text>} /> */}
      </Space>
    </Card>
  );
}

export default Dashboard;







