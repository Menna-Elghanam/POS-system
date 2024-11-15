// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const fetchDashboard = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('http://localhost:5000/dashboard', {
//                     headers: { Authorization: token }
//                 });
//                 setMessage(response.data.message);
//             } catch (error) {
//                 setMessage('You need to log in');
//             }
//         };
//         fetchDashboard();
//     }, []);

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="p-8 space-y-4 text-center bg-white rounded shadow-md">
//                 <h2 className="text-2xl font-bold text-gray-700">Dashboard</h2>
//                 <p className="text-gray-600">{message}</p>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState } from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import '../index.css';

Chart.register(...registerables);

const Dashboard = () => {
    const [salesData] = useState({
        daily: 450,
        weekly: 3200,
        monthly: 12500
    });

// Sales Line Chart Data (Blue color scheme)
const salesLineChartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
        {
            label: 'Daily Sales ($)',
            data: [300, 450, 500, 600, 550, 700, 750],
            borderColor: '#3b82f6', /* Soft blue */
            backgroundColor: 'rgba(59, 130, 246, 0.15)', /* Light blue fill */
            fill: true,
            tension: 0.4, /* Smoother line */
        }
    ]
};

// Monthly Revenue Bar Chart Data (Green color scheme)
const monthlyRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Monthly Revenue ($)',
            data: [5000, 7000, 8000, 12000, 11000, 9000, 15000],
            backgroundColor: '#10b981', /* Soft green */
        }
    ]
};

// Customer Traffic Line Chart Data (Purple color scheme)
const customerTrafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Customer Traffic',
            data: [150, 200, 250, 180, 220, 300, 350],
            borderColor: '#8b5cf6', /* Soft purple */
            backgroundColor: 'rgba(139, 92, 246, 0.15)', /* Light purple fill */
            fill: true,
            tension: 0.4,
        }
    ]
};

// Orders by Category Pie Chart Data (Unified shades of teal)
const ordersByCategoryData = {
    labels: ['Food', 'Beverages', 'Desserts', 'Other'],
    datasets: [
        {
            data: [65, 20, 10, 5],
            backgroundColor: ['#14b8a6', '#0d9488', '#0f766e', '#155e63'], /* Teal tones */
        }
    ]
};

// Order Status Stacked Bar Chart Data (Blue and teal shades)
const orderStatusData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Completed',
            data: [60, 80, 70, 90, 85, 95, 100],
            backgroundColor: '#22c55e', /* Green for completed */
        },
        {
            label: 'Pending',
            data: [20, 25, 15, 10, 20, 15, 5],
            backgroundColor: '#3b82f6', /* Blue for pending */
        },
        {
            label: 'Canceled',
            data: [5, 10, 5, 5, 10, 5, 2],
            backgroundColor: '#ef4444', /* Red for canceled */
        }
    ]
};


    return (
        <div className="dashboard-container grid gap-6 grid-cols-1 md:grid-cols-3 p-6">
            {/* Sales Line Chart */}
            <div className="chart-card">
                <h2 className="chart-title">Weekly Sales Overview</h2>
                <div className="chart-wrapper">
                    <Line data={salesLineChartData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Monthly Revenue Bar Chart */}
            <div className="chart-card">
                <h2 className="chart-title">Monthly Revenue</h2>
                <div className="chart-wrapper">
                    <Bar data={monthlyRevenueData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Customer Traffic Line Chart */}
            <div className="chart-card">
                <h2 className="chart-title">Customer Traffic</h2>
                <div className="chart-wrapper">
                    <Line data={customerTrafficData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Orders by Category Pie Chart */}
            <div className="chart-card">
                <h2 className="chart-title">Orders by Category</h2>
                <div className="chart-wrapper">
                    <Pie data={ordersByCategoryData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Order Status Stacked Bar Chart */}
            <div className="chart-card">
                <h2 className="chart-title">Order Status Overview</h2>
                <div className="chart-wrapper">
                    <Bar data={orderStatusData} options={{
                        maintainAspectRatio: false,
                        scales: { x: { stacked: true }, y: { stacked: true } }
                    }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
