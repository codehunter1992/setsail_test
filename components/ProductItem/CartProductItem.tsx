import React from "react";
import styled from "styled-components";

import { Button } from "antd";
import { CheckFillIcon, InfoIcon } from "../Icon/svgIcon";

interface PropTypes {
  data: any, 
  hideIcon?: boolean,
}

export default function CartProductItem({hideIcon, data}: PropTypes) {

  return <Wrapper >
    <div className="left">
      {
        !hideIcon ? <div className="icon-box">
          <CheckFillIcon width={28} color="#10B981" />
        </div> : null
      }
      
      <div className="product-info">
        <p className="product-name">{data.name}</p>
        <p className="product-description">{data.description}</p>
      </div>
    </div>

    <div className="right">
      <p className="product-price"><span className="price">${data.price}</span> <span className="month">/mo</span></p>
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 10px 15px;

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .icon-box {
      width: 28px;
      margin-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .product-info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .product-name {
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #111827;
        margin-bottom: 0;
      }
      .product-description {
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #6B7280;
        margin-bottom: 0;
      }
    }
  }

  .right {
    .product-price {
      margin-bottom: 0;
      .price {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #111827;
      }
      .month {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #6B7280;
      }
    }
  }
`;