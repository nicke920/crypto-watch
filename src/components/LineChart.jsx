import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Col, Row, Typography } from 'antd';
Chart.register(...registerables);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.unshift(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    if (timePeriod === '24h' || timePeriod === '3h') {
      coinTimestamp.unshift(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleString());
    } else {
      coinTimestamp.unshift(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString());
    }
  }
  
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#482673',
        borderColor: '#482673',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      point:{
          radius: 0
      }
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        },
        ticks: {
          maxTicksLimit: 7
        }
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
        }
      }
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Col className="price-container">
          <Title level={5} className="price-change">Change: { coinHistory?.data?.change} %</Title>
          <Title level={5} className="current-price">Current { coinName } Price: $ { currentPrice }</Title>
        </Col>
      </Row>
      <div className='chart-details'>
        <Line data={ data } options={ options } />
      </div>
    </>
  );
};

export default LineChart;
