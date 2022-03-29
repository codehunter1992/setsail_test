import React from "react";
import styled from "styled-components";

import { Button } from "antd";
import { InfoIcon } from "../Icon/svgIcon";

interface PropTypes {
  data: any, 
  selected: boolean,
  selectHandler: (product: any) => void,
  unSelectHandler: (product: any) => void,
}

export default function ProductItem({data, selected, selectHandler, unSelectHandler}: PropTypes) {

  return <Wrapper className={selected ? 'selected' : ''}>
    <div className="info-box">
      <div className="icon-box">
        <InfoIcon width={21} color="#EB5757" />
      </div>
      <div className="product-info">
        <p className="product-name">{data.name}</p>
        <p className="product-price"><span className="price">${data.price}</span> <span className="month">/mo</span></p>
      </div>
    </div>

    <div className="action-box">
      {
        selected ?
          <Button
            size="small" type="primary"
            onClick={() => unSelectHandler(data)}
          >Selected</Button> :
          <Button
            size="small" type="primary" className='select'
            onClick={() => selectHandler(data)}
          >Select</Button>
      }
      
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
  border: 2px transparent solid;

  &.selected {
    border: 2px solid #EB5757;
  }

  .info-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .icon-box {
      width: 24px;
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
      .product-price {
        margin-bottom: 0;
        .price {
          font-weight: 700;
          font-size: 12px;
          line-height: 20px;
          color: #111827;
        }
        .month {
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #6B7280;
        }
      }
    }
  }

  .action-box {
    .ant-btn {
      font-size: 12px;
      &.select {
        background-color: #1F2937;
        border-color: #1F2937;
      }
    }
  }
`;