import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import Header from '../../components/Header.js';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const profile = () => {
  const router = useRouter();
  const { name } = router.query;
  console.log(name);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/getUser/${name}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(true);
      })
      .catch((err) => {
        alert('검색기능 오류');
        router.back();
        console.log(err);
      });
  }, [name]);

  return (
    <Header>
      <Card style={{ width: 300, marginTop: 16 }} loading={!isLoading}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={data.name}
          description={data.summonerLevel}
        />
      </Card>
    </Header>
  );
};

export default profile;
