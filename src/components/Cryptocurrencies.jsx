import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Table, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dollarUSLocale = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData)
  },[cryptosList, searchTerm])


  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: icon => <img src={icon} alt="" />,
      responsive: ['sm'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record, index) => <Link to={record.url}>{name}</Link>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Market cap',
      dataIndex: 'market_cap',
      key: 'market_cap',
      responsive: ['md'],
    },
    {
      title: 'Total Volume',
      dataIndex: 'total_volume',
      key: 'total_volume',
      responsive: ['lg'],
    }
  ]

  const options = [];
  if (simplified) {
    for (let i = 0; i < count; i += 1) {
      options.push({
        key: i,
        url: `/coin/${cryptosList?.data?.coins[i].uuid}`,
        rank: cryptosList?.data?.coins[i].rank,
        icon: cryptosList?.data?.coins[i].iconUrl,
        name: `${cryptosList?.data?.coins[i].name} (${cryptosList?.data?.coins[i].symbol})`,
        price: dollarUSLocale.format(cryptosList?.data?.coins[i].price),
        market_cap: millify(cryptosList?.data?.coins[i].marketCap, {precision: 3}),
        total_volume: millify(cryptosList?.data?.coins[i]['24hVolume'], {precision: 3})
      })
    }
  } else {
    cryptos?.forEach((val, i) => {
      options.push({
        key: i,
        url: `/coin/${val.uuid}`,
        rank: val.rank,
        icon: val.iconUrl,
        name: `${val.name} (${val.symbol})`,
        price: dollarUSLocale.format(val.price),
        market_cap: millify(val.marketCap, {precision: 3}),
        total_volume: millify(val['24hVolume'], {precision: 3})
      })
    })
  }

  if (isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder="Search Cryptocurrecny" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      
      <div className='crypto-table'>
        <Table columns={columns} dataSource={options} pagination={{ pageSize: 50 }} />
      </div>
    </>
  )
}

export default Cryptocurrencies
