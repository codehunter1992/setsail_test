import { Button, Col, Modal, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { CalendarStarIcon } from "../Icon/svgIcon";

interface PropTypes {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  data: any,
  setData: (data: any) => void,
  confirmHandler: (data: any) => void,
}

export default function ConfirmPopup({ visible, setVisible, data, setData, confirmHandler }: PropTypes) {
  
  const closeHandler = () => { 
    setVisible(false);
    setData(null);
  };

  return (
    <Wrapper visible={visible} centered footer={null} closable={false}>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="icon-box mb-4">
          <CalendarStarIcon width={24} color='#EB5757' />
        </div>
        <div className="text mb-4">
          Wait! Don’t lose your Discount. Keep {data ? data.name : ''} and receive 10% off
        </div>
        <Row gutter={10} className="w-100">
          <Col xs={12}>
            <Button block onClick={() => confirmHandler(data)}>Remove</Button>
          </Col>
          <Col xs={12}>
            <Button type="primary" block onClick={closeHandler}>Keep QuantEdge Report</Button>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled(Modal)`
  .icon-box {
    background: #F2F2F2;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: #111827;
  }
`;