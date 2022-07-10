import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header.js';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Divider, List, Typography } from 'antd';

import axios from 'axios';

const Home = () => {
  const [boardData, setBoardData] = useState([]);

  const insertBoard = useEffect(() => {
    axios.get('http://localhost:5000/board').then((res) => {
      setBoardData(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Header>
      <div style={{ width: '80%' }}>
        <Input.Group compact>
          <Input
            style={{
              width: 'calc(100% - 200px)',
            }}
            placeholder="자유롭게 작성해주세요"
          />
          <Button type="primary" onSubmit={() => alert('dd')}>
            입력
          </Button>
        </Input.Group>
        {boardData ? (
          <>
            <List
              size="large"
              header={<div>자유게시판</div>}
              bordered
              dataSource={boardData}
              renderItem={(item) => <List.Item>{item.content}</List.Item>}
            />
          </>
        ) : (
          <>
            <h1>로딩중...</h1>
          </>
        )}
      </div>
    </Header>
  );
};

export default Home;
