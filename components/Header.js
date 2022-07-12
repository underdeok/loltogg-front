import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Input } from 'antd';
import 'antd/dist/antd.css';

const Header = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useState('');
  const router = useRouter();

  const onSearch = useCallback(() => {
    router.push(`/profile/${searchInput}`);
  }, [searchInput]);

  const onChange = (e) => {
    onChangeSearchInput(e.target.value);
  };

  return (
    <div style={{ width: '100%', height: '150vh', backgroundColor: '#292929' }}>
      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Menu.Item key="home">
          <Link href="/">
            <a>LoLToGG</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Input.Search
            enterButton
            placeholder="소환사 검색"
            value={searchInput}
            onChange={onChange}
            onSearch={onSearch}
            style={{ verticalAlign: 'middle' }}
          />
        </Menu.Item>
      </Menu>

      {children}
    </div>
  );
};

export default Header;
