
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/analytics');
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div>Loading...</div>;
  }

  // Prepare data for ECharts
  const statusChartOptions = {
    title: { text: 'Order Status Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: '0%' },
    series: [
      {
        name: 'Status',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        labelLine: { show: false },
        data: analytics.statusDistribution.map((item) => ({
          value: item.count,
          name: item._id,
        })),
      },
    ],
  };

  const revenueTrendOptions = {
    title: { text: 'Revenue Trend', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: analytics.revenueTrend.map((item) => item._id),
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        data: analytics.revenueTrend.map((item) => item.totalRevenue),
        smooth: true,
        lineStyle: { width: 3, color: '#4caf50' },
        areaStyle: { color: '#e8f5e9' },
      },
    ],
  };

  const orderTypeOptions = {
    title: { text: 'Order Types', left: 'center' },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'category', data: ['Dine-in', 'Delivery'] },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        data: analytics.orderTypeDistribution.map((item) => item.count),
        itemStyle: {
          color: function (params) {
            return params.dataIndex === 0 ? '#2196f3' : '#ff9800';
          },
          barBorderRadius: [4, 4, 0, 0],
        },
        barWidth: '50%',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <div className="bg-white shadow rounded p-4">
        <ReactECharts option={statusChartOptions} style={{ height: 400 }} />
      </div>
      <div className="bg-white shadow rounded p-4">
        <ReactECharts option={orderTypeOptions} style={{ height: 400 }} />
      </div>
      <div className="bg-white shadow rounded p-4 md:col-span-2">
        <ReactECharts option={revenueTrendOptions} style={{ height: 400 }} />
      </div>
    </div>
  );
};

export default Dashboard;
