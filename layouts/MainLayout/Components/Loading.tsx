import React from "react";

import { Spin } from "antd";

import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Loading() {

  const loading = useSelector((state: any) => state.cart.loading);

  return loading ? <Wrapper>
    <Spin />
  </Wrapper> : null
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;