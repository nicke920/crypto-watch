import React from 'react'
import millify from 'millify';
import { Typography, Row, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const { Title } = Typography;

const Homepage = () => {
  const {data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  const dollarUSLocale = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  if (isFetching) return 'loading..';
  
  return (
    <>
      <Row justify="flex-start" align='top' gutter={[40, 20]} className="global-stats-container is-mobile-hidden">
          <Statistic className='' title="Cryptocurrencies" value={ globalStats.total } />
          <Statistic title="Exchanges" value={ millify(globalStats.totalExchanges) } />
          <Statistic title="Market Cap" value={ dollarUSLocale.format(globalStats.totalMarketCap) } />
          <Statistic title="24h Vol" value={ millify(globalStats.total24hVolume, {precision: 3}) } />
      </Row>

      <div className="home-heading-container">
       <Title level={2} className="home-title text-color-white">Top 10 Cryptocurrencies</Title> 
       <Title level={3} className="show-more text-color-white"><Link to="/cryptocurrencies">Show More</Link></Title> 
      </div>

      <Cryptocurrencies simplified />

      <div className="home-heading-container">
       <Title level={2} className="home-title">Latest Crypto News</Title> 
       <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title> 
      </div>

      <News simplified />
    </>
  )
}

export default Homepage
