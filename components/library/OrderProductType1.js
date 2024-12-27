import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { formatDate } from "@/lib/util/formatDate";

export default function OrderProductType1({ order,orderProduct }) {
    const router = useRouter();

    // 리뷰 쓸때 사용
    const queryParams = {
        order_id: order.id,
        order_product_id: orderProduct.id,
        product_id: orderProduct.product.id,
        product_option_id: orderProduct.productOption.id,
    };
    const queryString = new URLSearchParams(queryParams).toString();


    function confirm() {
        ordersApi.confirm(id, {}, (response) => {
            console.log(response)
        })
    }


    if (orderProduct)
        return (
            <>
                <div className="order-product-item-type1 px-20">
                    <div className="order-status-wrap">
                        <div className="order-status-box">
                            <p className="order-status">{orderProduct.status}</p>
                            <span></span>
                            <p className="date">{formatDate(orderProduct.updated_at)}</p>
                        </div>
                        {
                            order.delivery_fee ?
                            <p className="shipping-fee">배송비 {order.delivery_fee.toLocaleString()}원</p>
                            :null
                        }
                    </div>

                    <div className="order-product-type1">
                        <div className="item-img-wrap ratio-box">
                            <img src={orderProduct.product.img.url} alt="" />
                        </div>
                        <div className="item-content-wrap">
                            <p className="item-title">{orderProduct.product.name}</p>
                            <p className="item-option">{orderProduct.productOption.name}</p>
                            <div className="item-count-amount-wrap">
                                <p className="item-count">수량 {orderProduct.quantity}개</p>
                                <p className="item-amount">{orderProduct.price.toLocaleString()}원</p>
                            </div>
                        </div>
                    </div>
                    
                    {
                        order.delivery_tracking_number ?
                        <div className="order-tracking mb-20">
                            <p className="order-tracking-labal">주문배송조회</p>
                            <Link href="">
                                <span className="tracking-number">{order.delivery_tracking_number}</span>
                            </Link>
                        </div>
                        : null
                    }
                    
                    <div className="order-product-btn-wrap">
                        {/* 1:1 문의 버튼은 항상 표시 */}
                        <Link href="/mypage/inquiries/create" className="order-product-btn">
                            1:1문의
                        </Link>

                        {/* 리뷰작성 버튼: 구매확정일 때 */}
                        {['구매확정'].includes(orderProduct.status) && (
                            <Link href={`/mypage/review/create?${queryString}`} className="order-product-btn big blk">
                                리뷰작성 + 최대 1,500P
                            </Link>
                        )}

                        {/* 교환접수 버튼: 배송중일 때 */}
                        {['배송중'].includes(orderProduct.status) && (
                            <Link href="" className="order-product-btn">
                                교환접수
                            </Link>
                        )}

                        {/* 반품접수 버튼: 배송중일 때 */}
                        {['배송중'].includes(orderProduct.status) && (
                            <Link href="" className="order-product-btn">
                                반품접수
                            </Link>
                        )}

                        {/* 취소상세 버튼: 취소완료 또는 취소요청일 때 */}
                        {['취소완료', '취소요청'].includes(orderProduct.status) && (
                            <Link href="" className="order-product-btn blk">
                                취소상세
                            </Link>
                        )}

                        {/* 교환상세 버튼: 교환완료 또는 교환요청일 때 */}
                        {['교환완료', '교환요청'].includes(orderProduct.status) && (
                            <Link href="" className="order-product-btn blk">
                                교환상세
                            </Link>
                        )}

                        {['배송중'].includes(orderProduct.status) && (
                            <button onClick={()=>{}} className="order-product-btn big blk">
                                구매확정
                            </button>
                        )}
                    </div>
                </div>
            </>
        );
}