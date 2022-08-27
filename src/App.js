import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import { Navbar, Homepage, Cryptocurrencies, News, CryptoDetails } from './components';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import './App.less';

const App = () => {
  return (
    <div className='app'> 
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path='/' element={<Homepage />} />

              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />

              <Route path='/coin/:coinUuid' element={<CryptoDetails />} />

              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={6} style={{textAlign:'center'}}>
            Made with love by 
            © Nicholas Evans 2022 <Link to="https://github.com/nicke920" target="_blank"><GithubOutlined /></Link> <Link to="www.linkedin.com/in/nevans3" target="_blank"><LinkedinOutlined /></Link>
          </Typography.Title>
        </div>
      </div>
    </div>
  )
}

export default App
