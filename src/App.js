import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
          <Typography.Title level={5} style={{textAlign:'center', fontSize: '12px'}}>
            Made with love by 
            © Nicholas Evans 2022 <a href="https://github.com/nicke920" target="_blank" rel="noreferrer"><GithubOutlined /></a><a href="https://www.linkedin.com/in/nevans3/" target="_blank" rel="noreferrer"><LinkedinOutlined /></a>
          </Typography.Title>
        </div>
      </div>
    </div>
  )
}

export default App
