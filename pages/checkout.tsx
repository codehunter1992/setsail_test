import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row, Typography } from 'antd';
import MainLayout from '../layouts/MainLayout';
import CartProductItem from '../components/ProductItem/CartProductItem';

import { getDiscountPrice, getTotalPrice } from '../util/helper';
import { checkout } from '../services/store/actions/cart';

export default function Checkout() {

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const cartProductList = useSelector((state: any) => state.cart.productList);

  const [agree, setAgree] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const submitHandler = (values: any) => { 
    if (agree) {
      dispatch(checkout(values, () => {
        form.resetFields();
        setAgree(false);
        setShowMessage(true);
      }));
    }
  };

  return <Wrapper>
    <div className='content'>
      <div className='form-box'>
        <Form form={form} layout='vertical' onFinish={submitHandler} requiredMark={false} style={{ width: '500px' }}>
          {
            showMessage ? <Alert
              type='success'
              message="You've made purchase successfully"
              closable
              onClose={() => setShowMessage(false)}
            /> : null
          }
          <Divider plain>
            <span className='grey-color-500'>Account Info</span>
          </Divider>
          <Form.Item
            name='email'
            label='Your Email'
            rules={[
              { required: true, message: 'This field is required' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input placeholder='you@example.com' size='large' />
          </Form.Item>
          <Form.Item
            name='password'
            label='New Password'
            extra='Password is case sensitive, must not contain spaces or special characters (e.g., @, &, etc) and must be between 6 & 40 characters.'
            rules={[
              // { required: true, message: 'This field is required' },
              // { min: 6, message: 'More than 6 characters are required' },
              // { max: 40, message: 'Less than 40 characters are required' },
              {
                validator: (_, value) => value ?
                  value.length < 6 ?
                    Promise.reject('More than 6 characters are required') :
                    value.length > 40 ?
                      Promise.reject('Less than 40 characters are required') :
                      RegExp(/^[a-zA-Z0-9)\(+=._-]+$/g).test(value) ?
                        Promise.resolve() :
                        Promise.reject('Not allowed to use space or special characters') :
                    Promise.reject('This field is required')
              }
            ]}
          >
            <Input.Password size='large' />
          </Form.Item>

          <Divider plain>
            <span className='grey-color-500'>Billing Info</span>
          </Divider>

          <Form.Item
            name='name'
            label='Full Name'
            rules={[
              { required: true, message: 'This field is required' },
            ]}
          >
            <Input placeholder='John Doe' size='large' />
          </Form.Item>
          <Form.Item
            name='address'
            label='Address'
            rules={[
              { required: true, message: 'This field is required' },
            ]}
          >
            <Input placeholder='123 Main St' size='large' />
          </Form.Item>
          <Form.Item
            name='country'
            label='Country'
            rules={[
              { required: true, message: 'This field is required' },
            ]}
          >
            <Input size='large' />
          </Form.Item>

          <Row gutter={10}>
            <Col xs={8}>
              <Form.Item
                name='city'
                label='City'
                rules={[
                  { required: true, message: 'This field is required' },
                ]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item
                name='state'
                label='State / Province'
                rules={[
                  { required: true, message: 'This field is required' },
                ]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item
                name='postal_code'
                label='Postal code'
                rules={[
                  { required: true, message: 'This field is required' },
                ]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
          </Row>

          <Button
            type='primary' block size='large' htmlType='submit' className='mt-3'
            disabled={cartProductList.length === 0 || !agree}
          >Proceed</Button>
        </Form>
      </div>
      <div className='product-list-box'>
        <div style={{width: '460px'}}>
          <div className='product-list'>
            {
              cartProductList.length ? cartProductList.map((item: any, index: number) => {

                return (
                  <div className='mb-2' key={index}>
                    <CartProductItem data={item} hideIcon/>
                  </div>
                )
              }) : <Typography.Title level={5} style={{ fontSize: '17px', fontWeight: 'bold', color: '#1F2937', }}>
                No product
              </Typography.Title>
            }
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="mb-0 color-grey-600">Price</p>
              <p className="mb-0 color-grey-600">${getTotalPrice(cartProductList)}</p>
            </div>
            {
              getDiscountPrice(getTotalPrice(cartProductList)) ?
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0 d-flex align-items-center">
                    <b className="me-2 color-green">Volume Discount: </b>
                    <small className="ms-1">10% off</small>
                  </p>
                  <p className="mb-0 color-green">-${getDiscountPrice(getTotalPrice(cartProductList))}</p>
                </div> : null
            }
            <Divider className="mt-3 mb-3" />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Typography.Title level={5} className="mb-0 mt-0 color-grey-600">Total</Typography.Title>
              <Typography.Title level={5} className="mb-0 mt-0 color-grey-600">${getTotalPrice(cartProductList) - getDiscountPrice(getTotalPrice(cartProductList))}</Typography.Title>
            </div>
            <Checkbox checked={agree} onChange={(e: any) => setAgree(e.target.checked)}>
              I agree to the <Link href='/term'><a>Terms & Conditions</a></Link>
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  min-height: calc(100vh - 65px);
  position: relative;
  .content {
    z-index: 999;
    min-height: calc(100vh - 65px);
    display: flex;
    .form-box {
      padding: 50px 100px;
      width: 65%;
      background-color: white;
      display: flex;
      justify-content: flex-end;
    }

    .product-list-box {
      width: 35%;
      padding: 20px;
      background-color: #F2F2F2;
      &>div {
        padding-bottom: 100px;
        height: 100%;
        display: flex;
        flex-direction: column;

        .product-list {
          flex-grow: 1;
        }
      }
    }
  }
`;

const  getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>
}

Checkout.getLayout = getLayout;