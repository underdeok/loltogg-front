import React from 'react';
import Head from 'next/head';
import Header from '../components/Header.js';
import 'antd/dist/antd.css';

const Home = () => (
  <Header>
    <Head>
      <title>LoLToGG</title>
    </Head>
    <div>Hello, Next!</div>
  </Header>
);

export default Home;
