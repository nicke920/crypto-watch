import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinUuid } = useParams(); // use paramas allows you to take the coin id and use it as a variable
  const [ timePeriod, settimeperiod ] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinUuid);
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinUuid, timePeriod});
  const cryptoDeets = data?.data?.coin;
  const dollarUSLocale = Intl.NumberFormat('en-US'); 
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDeets?.price && dollarUSLocale.format(Number(cryptoDeets?.price).toFixed(2))}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDeets?.rank, icon: <NumberOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDeets?.marketCap && millify(cryptoDeets?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${dollarUSLocale.format(Number(cryptoDeets?.allTimeHigh?.price).toFixed(2))}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: dollarUSLocale.format(cryptoDeets?.numberOfMarkets), icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDeets?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDeets?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `${cryptoDeets?.supply?.total && millify(cryptoDeets?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `${cryptoDeets?.supply?.circulating && millify(cryptoDeets?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if (isFetching) return "Loading..."; 

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className="coin-name">
          { cryptoDeets?.name } ({ cryptoDeets?.symbol}) Price
        </Title>
        <p>
          { cryptoDeets?.name } live price in US dollars. View value statitistics, market cap and supply
        </p>
      </Col>

      <div className="chart-container">
        <Select 
          defaultValue="7d" 
          className="select-timeperiod" 
          placeholder="Select time period" 
          onChange={(value) => settimeperiod(value)}
        >
          {time.map((date) => <Option key={ date }>{ date }</Option>)}
        </Select>
        
        <LineChart coinHistory={ coinHistory } currentPrice={Number(cryptoDeets?.price).toFixed(2)} coinName={cryptoDeets?.name} timePeriod={ timePeriod }/>
      </div>

      <Col className='stats-container'>
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              { cryptoDeets?.name } Value statistics
            </Title>
            <p>
              An overview showing the stats of { cryptoDeets?.name }
            </p>
          </Col>

          {stats.map(({ icon, title, value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{ icon }</Text>
                <Text>{ title }</Text>
              </Col>
              <Text className='stats'>{ value }</Text>
            </Col>
          ))}
        </Col>

        <Col className="others-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other statistics
            </Title>
            <p>
              An overview showing the stats of all crypto
            </p>
          </Col>

          {genericStats.map(({ icon, title, value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{ icon }</Text>
                <Text>{ title }</Text>
              </Col>
              <Text className='stats'>{ value }</Text>
            </Col>
          ))}
        </Col>

        <Col className='coin-links'>
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              External Links
            </Title>
            <p>
              Websites about { cryptoDeets?.name }
            </p>
          </Col>
          {cryptoDeets?.links.map((link) => (
            <Row className='coin-stats' key={ link.name }>
              <a href={ link.url } target="_blank" rel="noreferrer">
                { link.name }
              </a>

            </Row>
          ))}
        </Col>

      </Col>
  </Col>
  )
}

export default CryptoDetails
