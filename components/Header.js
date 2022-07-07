import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Input } from 'antd';

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
    <div>
      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Menu.Item key="home">
          <Link href="/profile">
            <a>LoLToGG</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="leaderboards">
          <Link href="/leaderboards">
            <a>천상계 순위표</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Input.Search
            enterButton
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
