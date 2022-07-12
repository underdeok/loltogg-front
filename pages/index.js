import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import 'antd/dist/antd.css';
import { Space, Table, Button, Input, Form } from 'antd';

import axios from 'axios';

const { Column } = Table;

const Home = () => {
  const [boardData, setBoardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const getComment = () => {
    axios.get('http://localhost:5000/board').then((res) => {
      setBoardData(res.data);
      setIsLoading(true);
    });
  };

  useEffect(() => {
    getComment();
  }, []);

  const createComment = async (input) => {
    form.resetFields();
    setIsLoading(false);
    axios
      .post('http://localhost:5000/board', {
        content: input.comment,
      })
      .then((res) => {
        getComment();
      });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:5000/board/${id}`).then((res) => {
      let resultData = boardData.filter((item) => item.id !== id);
      setBoardData(resultData);
    });
  };

  return (
    <Header>
      <div style={{ width: '50%', height: '100%', margin: 'auto' }}>
        <Form
          form={form}
          onFinish={createComment}
          autoComplete="off"
          style={{ flex: 1, flexDirection: 'column' }}
        >
          <Input.Group
            style={{
              marginTop: '10px',
            }}
          >
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                  message: '내용을 입력해주세요',
                },
              ]}
            >
              <Input
                style={{
                  width: 'calc(100% - 100px)',
                }}
                placeholder="요즘 메타에 대한 한마디 어떠신가요?"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                입력
              </Button>
            </Form.Item>
          </Input.Group>
        </Form>
        {boardData ? (
          <>
            <Table
              dataSource={boardData}
              loading={!isLoading}
              style={{ marginTop: '10px' }}
            >
              <Column
                title="익명 한마디 게시판"
                dataIndex="content"
                key="id"
                width={'90%'}
              />
              <Column
                key="action"
                render={(_, record) => (
                  <Space size="small">
                    <Button
                      type="primary"
                      onClick={() => deleteComment(record.id)}
                    >
                      삭제
                    </Button>
                  </Space>
                )}
              />
            </Table>
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
