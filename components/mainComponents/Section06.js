import Link from "next/link";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import ProductItemType1 from "../library/ProductItemType1";
export default function Section06({Products=[]}) {

    useEffect(() => {
        let swiper;

        // Swiper 초기화 함수
        const initializeSwiper2 = () => {
            if (swiper) {
                swiper.destroy(true, true); // 기존 Swiper 인스턴스가 있으면 삭제
            }
            swiper = new Swiper(".mySwiperBestProducts", {
                slidesPerView: 2.3,
                spaceBetween: 10,
            });
        };

        initializeSwiper2();

        // 컴포넌트 언마운트 시 Swiper 인스턴스 삭제
        return () => {
            if (swiper) swiper.destroy(true, true);
        };
    }, [Products]);

    if(Products.length > 0)
    return (
        <section className="mb-60">
            <div className="section-title-wrap-type2">
                <p className="section-title">베스트 상품 모음</p>
                <Link href="/basts" className="view-all-btn-type2">
                    전체보기 <i className="xi-angle-right-min"></i>
                </Link>
            </div>

            <div className="swiper-type4">
                <div className="swiper mySwiperBestProducts">
                    <div className="swiper-wrapper">
                        {
                            Products.map((Product)=>{
                                return(
                                    <div key={Product.id} className="swiper-slide">
                                        <ProductItemType1 product={Product} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}