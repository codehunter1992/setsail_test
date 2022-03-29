import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Divider, Row, Typography } from "antd";
import GreyCard from "../components/Card/GreyCard";
import { BroadcastIcon, CartIcon, InfoIcon } from "../components/Icon/svgIcon";
import MainLayout from "../layouts/MainLayout";
import ProductItem from "../components/ProductItem/ProductItem";
import CartProductItem from "../components/ProductItem/CartProductItem";
import ConfirmPopup from "../components/Popup/ConfirmPopup";

import { getProductList } from "../services/store/actions/product";
import { getDiscountPrice, getTotalPrice, groupBy } from "../util/helper";
import { addToCart, removeFromCart } from "../services/store/actions/cart";

export default function Price() { 

  const dispatch = useDispatch();
  
  const productSrc = useSelector((state: any) => state.product.productList);
  const cartProductList = useSelector((state: any) => state.cart.productList);

  const [productCategoryList, setProductCategoryList] = useState<any[] | null>(null);
  const [productMap, setProductMap] = useState<any>(null);
  const [openConfirmPopup, setOpenConfirmPopup] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  useEffect(() => {
    if (!productSrc) dispatch(getProductList());
    else {
      let categoryList: any[] = [];
      productSrc.forEach((item: any) => {
        if (categoryList.indexOf(item.category) === -1) categoryList.push(item.category);
      });
      setProductMap(groupBy(productSrc, (item: any) => item.category));
      setProductCategoryList(categoryList);
    }
  }, [productSrc]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectHandler = (product: any): void => { 
    dispatch(addToCart(product))
  };

  const checkRemoveHandler = (product: any): void => {
    const currentTotal = getTotalPrice(cartProductList);
    if (currentTotal >= 400) {
      const newTotal = getTotalPrice(cartProductList.filter((item: any) => item.id !== product.id));
      if (newTotal < 400) {
        setOpenConfirmPopup(true);
        setCurrentProduct(product);
        return;
      }
    }
    removeHandler(product);
  };

  const removeHandler = (product: any): void => {
    dispatch(removeFromCart(product));
  };

  return <Wrapper>
    <ConfirmPopup
      visible={openConfirmPopup}
      setVisible={setOpenConfirmPopup}
      data={currentProduct}
      setData={setCurrentProduct}
      confirmHandler={(product) => {
        setOpenConfirmPopup(false);
        setCurrentProduct(null);
        removeHandler(product)
      }}
    />
    <div className="content">
      <div className="message">
        <BroadcastIcon width={14} color='#F3F4F6' />
        <Typography.Text className="ms-3">
          <b>Holiday Sales! Save 25% off your subscription with code:</b> holidays2021
        </Typography.Text>
      </div>
      <div className="container p-4">
        <Typography.Title level={3} className="color-grey-800 align-center">Sample Heading</Typography.Title>
        <Typography.Title level={5} className="color-grey-700 align-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography.Title>
        <GreyCard className="mt-4 m-auto" style={{ width: 'fit-content' }}>
          <div className="d-flex flex-column align-items-center">
            <Typography.Text className="color-grey-800 align-center">
              <b>Lorem ipsum title</b>
            </Typography.Text>
            <Typography.Text className="color-grey-600 align-center" style={{fontSize: '13px'}}>
              Some placeholder text... <Link href='/'>Link</Link>
            </Typography.Text>
          </div>
        </GreyCard>

        <Row gutter={20} className='product-list-box'>
          {
            productCategoryList ? productCategoryList.map((category: any, index: number) => {
              const productList = productMap ? productMap.get(category) : null;
              
              return (
                <Col xs={12} key={index} className='product-category-box'>
                  <GreyCard>
                    <p className='category-name'>CATEGORY {category}</p>
                    <p className='category-description'>Sample text</p>

                    {
                      productList ? productList.map((product: any, index: number) => {
                        const selected = cartProductList.filter((item: any) => item.id === product.id).length !== 0;

                        return (
                          <div className="mt-3" key={index}>
                            <ProductItem
                              data={product}
                              selected={selected}
                              selectHandler={selectHandler}
                              unSelectHandler={checkRemoveHandler}
                            />
                          </div>
                        )
                      }) : null
                    }
                  </GreyCard>
                </Col>
              )
            }) : null
          }
        </Row>
      </div>
    </div>
    <div className="cart-box">
      <div>
        <Typography.Title level={5} style={{ fontSize: '17px', fontWeight: 'bold', color: '#1F2937', }}>Your Products</Typography.Title>
        <div className="mt-3">
          {
            cartProductList.length ? cartProductList.map((item: any, index: number) => {

              return <div className="mb-2" key={index}>
                <CartProductItem data={item}/>
              </div>
            }) : <span>No product</span>
          }
        </div>
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
                <b className="me-2">Volume Discount: </b>
                <InfoIcon color="#EB5757" width={18} />
                <small className="ms-1">10% off</small>
              </p>
              <p className="mb-0 color-green">-${getDiscountPrice(getTotalPrice(cartProductList))}</p>
            </div> : null
        }
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0 color-grey-600">Subtotal</p>
          <p className="mb-0 color-grey-600">${getTotalPrice(cartProductList) - getDiscountPrice(getTotalPrice(cartProductList))}</p>
        </div>
        <Divider className="mt-3 mb-3"/>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Typography.Title level={5} className="mb-0 mt-0 color-grey-600">Total</Typography.Title>
          <Typography.Title level={5} className="mb-0 mt-0 color-grey-600">${getTotalPrice(cartProductList) - getDiscountPrice(getTotalPrice(cartProductList))}</Typography.Title>
        </div>
        <Link href='/checkout'>
          <a>
            <Button type="primary" size="large" block>
              <div className="d-flex align-items-center justify-content-center">
                <CartIcon width={20} color='#F9FAFB' />
                <span className="ms-2">Checkout</span>
              </div>
            </Button>
          </a>
        </Link>
      </div>
    </div>
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;

  .content {
    flex-grow: 1;
    .message {
      height: 28px;
      background-color: #374151;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #F3F4F6;
        font-size: 12px;
      }
    }
    .container {
      width: 80%;
      .product-list-box {
        margin-top: 20px;
        .product-category-box {
          margin-bottom: 20px;
          .category-name {
            text-align: center;
            color: #EB5757;
            font-weight: 800;
            letter-spacing: .2em;
            margin-bottom: 0;
          }
          .category-description {
            text-align: center;
            color: #EB5757;
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  .cart-box {
    width: 390px;
    /* height: calc(100vh - 65px); */
    /* position: sticky; */
    /* top: 65px; */
    background: #F9FAFB;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    padding: 20px;
    display: flex;
    flex-direction: column;
    &>div:first-child {
      flex-grow: 1;
    }

  }
`;

const  getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>
}

Price.getLayout = getLayout;