import React from 'react';
import { Button, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

const Navbar = () => {

  const showMobile = () => {
    if (document.querySelector('.nav-menu-container-mobile').classList.contains('visible')) {
      document.querySelector('.nav-menu-container-mobile').classList.remove('visible')
    } else {
      document.querySelector('.nav-menu-container-mobile').classList.add('visible')
    }
  }

  const resetMenu = () => {
    document.querySelector('.nav-menu-container-mobile').classList.remove('visible');
  }
  
  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Typography.Title level={2} className="logo">
          <Link to='/'>Crypto Watch</Link>
        </Typography.Title>
      </div>
      <Button icon={ <MenuOutlined/> } onClick={ showMobile } className="mobile-menu-button"></Button>
      <Menu mode="horizontal" className='nav-menu-container'>
        <Menu.Item icon={ <HomeOutlined /> }>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={ <FundOutlined /> }>
          <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={ <BulbOutlined /> }>
          <Link to='/news'>News</Link>
        </Menu.Item>
      </Menu>

      <Menu mode='vertical' className='nav-menu-container-mobile' >
      <Menu.Item icon={ <HomeOutlined /> }>
          <Link onClick={ resetMenu } to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={ <FundOutlined /> }>
          <Link onClick={ resetMenu } to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={ <BulbOutlined /> }>
          <Link onClick={ resetMenu } to='/news'>News</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar
