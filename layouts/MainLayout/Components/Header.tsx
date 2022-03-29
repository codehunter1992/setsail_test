import React from "react";
import styled from 'styled-components';

import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';
import Link from "next/link";

export default function Header() {

  return <Wrapper>
    <div className="container">
      <div className="menu-box">
        <Dropdown overlay={
          <Menu>
            {
              [1, 2, 3].map(index => (
                <Menu.Item key={index}>Option {index}</Menu.Item>
              ))
            }
          </Menu>
        }>
          <Button size="large" type="text" className="me-3 color-grey-500">Solutions <DownOutlined /></Button>
        </Dropdown>
        <Link href='/price'>
          <a>
            <Button size="large" type="text" className="me-3 color-grey-500">Pricing</Button>
          </a>
        </Link>
        <Dropdown overlay={
          <Menu>
            {
              [1, 2, 3].map(index => (
                <Menu.Item key={index}>Option {index}</Menu.Item>
              ))
            }
          </Menu>
        }>
          <Button size="large" type="text" className="me-3 color-grey-500">Company <DownOutlined /></Button>
        </Dropdown>
        <Button size="large" type="text" className="me-3 color-grey-500">Library</Button>
        <Button size="large" type="text" className="color-grey-500">Contact</Button>
      </div>
      <div className="auth-action-button-box">
        <Button size="large" type="text" className="me-3 color-grey-500">Sign in</Button>
        <Button size="large" type="primary">Sign up</Button>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  height: 65px;
  width: 100vw;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  .container {
    height: 65px;
    position: relative;
    display: flex;
    justify-content: center;
    .menu-box {
      height: 65px;
      display: flex;
      align-items: center;
    }
    .auth-action-button-box {
      height: 65px;
      width: fit-content;
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
    }
  }
`;