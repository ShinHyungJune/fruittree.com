"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import Header from "@/components/Header";
import ordersApi from "@/lib/api/ordersApi";
import AddressInput from "@/components/AddressInput";
import couponsApi from "@/lib/api/couponsApi";
import PopupOrdersDeliveryAddresses from "@/components/popups/PopupOrdersDeliveryAddresses";

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const order_id = searchParams.get('order_id');

    const user = useSelector(state => state.app.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const [order, setOrder] = useState();

    const [isPopupOrdersDeliveryAddresses, setIsPopupOrdersDeliveryAddresses] = useState(false)

    const [userCoupons, setUserCoupons] = useState([]);



    const [form, setForm] = useState({
        buyer_name: user?.name || "", // 주문자 이름
        buyer_phone: user?.phone || "", // 주문자 연락처
        delivery_name: "", // 배송지명
        delivery_phone: "", // 배송지 연락처
        delivery_postal_code: "", // 배송지 우편번호
        delivery_address: "", // 배송지 주소
        delivery_address_detail: "", // 배송지 상세주소
        delivery_request: "", // 배송 요청 사항

        user_coupon_id: "", // 쿠폰
        user_coupon_discount_amount: "",
        user_coupon_discount_rate: "",

        use_points: 0, // 적립금
        common_entrance_method: "", // 공동현관 출입방법

        payment_method: "card",

        agreeAll: false,
        agreeTerms: false,
        agreePrivacy: false,
        agreePayment: false,
    });
    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    useEffect(() => {
        console.log(form);
    }, [form])

    useEffect(() => {
        show()
        indexUserCoupons()
    }, [searchParams])

    function show() {
        ordersApi.show(order_id, (response) => {
            setOrder(response.data.data);
        });
    }


    // 사용자 쿠폰 리스트
    function indexUserCoupons() {
        couponsApi.indexUserCoupons({}, (response) => {
            setUserCoupons(response.data.data)
        });
    }


    const {
        totalOriginalPrice,    // 총 상품 금액: original_price * quantity의 합
        totalDiscountPrice,    // 총 상품 자체 할인 금액: (original_price - price) * quantity의 합
        totalCouponDiscount,   // 상품 쿠폰 할인 금액
        totalPointsUsed,       // 적립금 사용 금액
        totalFinalPrice,       // 최종 상품 금액: 총 상품 금액 - 총 할인 금액 - 쿠폰 할인 금액 - 적립금 사용
        totalDiscountAmount    // 총 할인 금액: 상품 자체 할인 금액 + 쿠폰 할인 금액
    } = useMemo(() => {
        if (!order) {
            // order가 없으면 기본값 반환
            return {
                totalOriginalPrice: 0,
                totalDiscountPrice: 0,
                totalCouponDiscount: 0,
                totalPointsUsed: 0,
                totalFinalPrice: 0,
                totalDiscountAmount: 0,
            };
        }

        let totalOriginalPrice = 0; // 총 상품 금액
        let totalDiscountPrice = 0; // 총 상품 자체 할인 금액

        // 상품금액과 가격인하/할인 계산
        order.orderProducts.forEach((product) => {
            const { quantity, productOption } = product;
            totalOriginalPrice += productOption.original_price * quantity;
            totalDiscountPrice += (productOption.original_price - productOption.price) * quantity;
        });

        // 쿠폰 할인 금액 계산
        let totalCouponDiscount = 0;
        if (form.user_coupon_discount_amount) {
            totalCouponDiscount = form.user_coupon_discount_amount; // 고정 금액 쿠폰
        } else if (form.user_coupon_discount_rate) {
            totalCouponDiscount = Math.floor(totalOriginalPrice * (form.user_coupon_discount_rate / 100)); // 할인율 적용
        }

        // 적립금 사용 금액 처리 (숫자 변환)
        const totalPointsUsed = parseInt(form.use_points, 10) || 0;

        // 총 할인 금액 = 총 상품 자체 할인 금액 + 쿠폰 할인 금액
        const totalDiscountAmount = totalDiscountPrice + totalCouponDiscount;

        // 최종 상품 금액 = 상품금액 - 총 할인 금액 - 적립금 사용
        const totalFinalPrice = totalOriginalPrice - totalDiscountAmount - totalPointsUsed;

        return {
            totalOriginalPrice,
            totalDiscountPrice,
            totalCouponDiscount,
            totalPointsUsed,
            totalFinalPrice,
            totalDiscountAmount,
        };
    }, [order, form]); // form도 의존성에 추가


    // 결제시도
    function update() {
        if (!form.agreeTerms || !form.agreePrivacy || !form.agreePayment) {
            dispatch(actions.setMessage("필수 약관에 동의해 주세요."));
            return; // 전송 중단
        }

        ordersApi.update(order_id, form, (response) => {
            setOrder(response.data.data);
        });
    }


    if (order && isClient)
        return (
            <>
                <Header />

                {/* 배송지 팝업 */}
                <PopupOrdersDeliveryAddresses
                    setForm={setForm}
                    isPopup={isPopupOrdersDeliveryAddresses}
                    setIsPopup={setIsPopupOrdersDeliveryAddresses}
                />

                <div className="body">
                    <div className="buy-cart-items-btn-wrap">
                        <p className="price">{totalFinalPrice.toLocaleString()}원</p>
                        <button onClick={() => { update() }} className="buy-cart-items-btn">
                            결제하기
                        </button>
                    </div>
                    <section className="bd-bt">
                        <div className="input-list-type2 pt-20 pb-20 px-20">
                            <div className="input-list-title-wrap">
                                <p className="input-list-title">주문자</p>
                            </div>
                            <div>
                                <div className="input-txt-box-type1">
                                    <input
                                        type="text"
                                        name="buyer_name"
                                        value={form.buyer_name}
                                        onChange={changeForm}
                                        placeholder="주문자명을 입력해주세요."
                                    />
                                </div>
                                <Error name={'buyer_name'} />
                            </div>
                            <div>
                                <div className="input-txt-box-type1">
                                    <input
                                        type="text"
                                        name="buyer_phone"
                                        value={form.buyer_phone}
                                        onChange={changeForm}
                                        placeholder="휴대폰번호를 입력해주세요. (“-“제외)"
                                    />
                                </div>
                                <Error name={'buyer_phone'} />
                            </div>
                        </div>

                        <div className="input-list-type2 pt-20 pb-20 px-20">
                            <div className="input-list-title-wrap">
                                <p className="input-list-title">배송지</p>
                                <button className="change-address-btn" onClick={() => { setIsPopupOrdersDeliveryAddresses(true) }}>
                                    배송지 변경 <i className="xi-angle-right-min"></i>
                                </button>
                            </div>
                            <div>
                                <div className="input-txt-box-type1">
                                    <input
                                        type="text"
                                        name="delivery_name"
                                        value={form.delivery_name}
                                        onChange={changeForm}
                                        placeholder="배송지명을 입력해주세요."
                                    />
                                </div>
                                <Error name={'delivery_name'} />
                            </div>
                            <div>
                                <div className="input-txt-box-type1">
                                    <input
                                        type="text"
                                        name="delivery_phone"
                                        value={form.delivery_phone}
                                        onChange={changeForm}
                                        placeholder="휴대폰번호를 입력해주세요. (“-“제외)"
                                    />
                                </div>
                                <Error name={'delivery_phone'} />
                            </div>
                            <div className="address-input-wrap-type1">
                                <AddressInput form={form} setForm={setForm} addressType={"delivery"} />
                            </div>
                            <div>
                                <div className="select-box-type1">
                                    <select
                                        name="delivery_request"
                                        value={form.delivery_request}
                                        onChange={changeForm}
                                    >
                                        <option value="">배송시 요청사항을 선택해주세요.</option>
                                        <option value="빠른배송 부탁드립니다.">빠른배송 부탁드립니다.</option>
                                        <option value="현관에 두고 연락주세요.">현관에 두고 연락주세요.</option>
                                    </select>
                                    <i className="xi-angle-down"></i>
                                </div>
                                <Error name={'delivery_request'} />
                            </div>
                        </div>

                        <div className="input-list-type2 pt-20 px-20">
                            <div className="input-list-title-wrap">
                                <p className="input-list-title">쿠폰사용</p>
                            </div>
                            <div>
                                <div className="select-box-type1">
                                    <select
                                        name="user_coupon_id"
                                        value={form.user_coupon_id}
                                        onChange={(e) => {
                                            const selectedCouponId = e.target.value;
                                            const selectedCoupon = userCoupons.find(userCoupon => userCoupon.id == selectedCouponId);

                                            setForm((prevForm) => ({
                                                ...prevForm,
                                                user_coupon_id: selectedCouponId,
                                                user_coupon_discount_amount: selectedCoupon?.type == "amount" ? selectedCoupon.discount_amount : "",
                                                user_coupon_discount_rate: selectedCoupon?.type == "rate" ? selectedCoupon.discount_rate : "",
                                            }));
                                        }}
                                    >
                                        <option value="">쿠폰을 선택해 주세요.</option>
                                        {userCoupons.map((userCoupon) => (
                                            <option key={userCoupon.id} value={userCoupon.id}>
                                                {userCoupon.name}
                                            </option>
                                        ))}
                                    </select>
                                    <i className="xi-angle-down"></i>
                                </div>
                                <Error name={'user_coupon_id'} />
                            </div>
                        </div>

                        {user ? (
                            <div className="input-list-type2 pt-20 pb-20 px-20">
                                <div className="input-list-title-wrap">
                                    <p className="input-list-title">적립금</p>
                                </div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input
                                            type="number"
                                            name="use_points"
                                            value={form.use_points}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/^0+/, ''); // 앞의 0 제거
                                                value = parseInt(value, 10) || 0; // 숫자로 변환, NaN 방지
                                                if (value <= user.points) {
                                                    setForm({
                                                        ...form,
                                                        use_points: value, // 변경된 값을 직접 설정
                                                    });
                                                }
                                            }}
                                            placeholder="적립금"
                                        />
                                    </div>
                                    <Error name={'use_points'} />
                                </div>
                                <div className="input-list-sub-title-wrap mt-10">
                                    <p className="input-list-sub-title">
                                        사용가능 적립금 <span>{user.points?.toLocaleString() || 0}원</span>
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        <div className="input-list-type2 pt-20 pb-20 px-20">
                            <div className="input-list-title-wrap">
                                <p className="input-list-title">공동현관 출입방법</p>
                            </div>
                            <div>
                                <div className="select-box-type1">
                                    <select
                                        name="common_entrance_method"
                                        value={form.common_entrance_method}
                                        onChange={changeForm}
                                    >
                                        <option value="">출입방법을 선택해 주세요.</option>
                                        <option value="password">공동현관 비밀번호 입력</option>
                                        <option value="intercom">인터폰 호출</option>
                                        <option value="manual">수동 출입</option>
                                    </select>
                                    <i className="xi-angle-down"></i>
                                </div>
                                <Error name={'common_entrance_method'} />
                            </div>
                        </div>

                        <div className="input-list-type2 pt-20 pb-20 px-20">
                            <div className="input-list-title-wrap">
                                <p className="input-list-title">주의사항</p>
                            </div>
                            <div>
                                <div className="info-message-type2">
                                    <p className="mb-20 info-message-txt">
                                        다음의 경우 공동현관 앞 또는 경비실 앞으로 배송이 될 수 있습니다. 이로 인한 상품의 분실 및 파손은
                                        책임지지 않습니다.
                                    </p>
                                    <ul className="info-message-list">
                                        <li>
                                            <div className="num">01.</div>
                                            <p>입력해 주신 비밀번호가 없거나 일치하지 않는 경우.</p>
                                        </li>
                                        <li>
                                            <div className="num">02.</div>
                                            <p>기기 오작동 또는 경비원의 부재로 공동현관 출입이 원활하지 않을 경우.</p>
                                        </li>
                                        <li>
                                            <div className="num">03.</div>
                                            <p>6층 이상의 배송지 건물에 엘리베이터가 없거나 오작동하여 이용할 수 없는 경우.</p>
                                        </li>
                                        <li>
                                            <div className="num">04.</div>
                                            <p>기타 공동현관 출입이 불가하여 자택 앞으로 배송할 수 없는 경우.</p>
                                        </li>
                                        <li>
                                            <div className="num">05.</div>
                                            <p>비밀번호는 배송 목적으로만 사용 후 안전하게 폐기합니다.</p>
                                        </li>
                                        <li>
                                            <div className="num">06.</div>
                                            <p>공동현관 출입 방법을 정확하게 입력해 주세요.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <section className="bd-bt">
                        <div className="input-list-type2 pt-20 pb-20 px-20">
                            <div className="input-list-title-wrap">
                                <p className="input-list-title">배송일</p>
                            </div>
                            <div>
                                <div className="radiobox-list-type1">
                                    <label className="option">
                                        <input type="radio" name="delivery" value="default" defaultChecked />
                                        <span>기본배송</span>
                                    </label>
                                    <label className="option selected">
                                        <input type="radio" name="delivery" value="scheduled" />
                                        <span>지정일 배송</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input type="date" name="delivery_date" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-list-title-wrap mt-10">
                                <p className="input-list-title">주의사항</p>
                            </div>
                            <div>
                                <div className="info-message-type2">
                                    <ul className="info-message-list">
                                        <li>
                                            <div className="num">01.</div>
                                            <p>주문일 기준 2일 이후부터 선택 가능합니다.</p>
                                        </li>
                                        <li>
                                            <div className="num">02.</div>
                                            <p>
                                                오늘On 배송 상품의 경우 토요일 도착으로 지정 시 새벽 배송으로 진행되어,
                                                <br />
                                                토요일 아침 7시 전 도착합니다.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section> */}

                    <section className="bd-bt pt-20 pb-20">
                        <div className="agreement-checkbox-list px-20">
                            <div className="agreement-checkbox-list-all">
                                <div className="checkbox-type1">
                                    <input
                                        type="checkbox"
                                        name="agreeAll"
                                        id="agreeAll"
                                        checked={
                                            form.agreeTerms
                                            &&
                                            form.agreePrivacy
                                            &&
                                            form.agreePayment
                                        }
                                        onChange={(e) => {
                                            const { checked } = e.target;
                                            setForm({
                                                ...form,
                                                agreeTerms: checked,
                                                agreePrivacy: checked,
                                                agreePayment: checked,
                                                // agree_promotion_sms: checked,
                                            });
                                        }}
                                    />
                                    <label htmlFor="agreeAll">전체 동의하기</label>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <div className="checkbox-type1">
                                        <input
                                            type="checkbox"
                                            name="agreeTerms"
                                            id="agreeTerms"
                                            checked={form.agreeTerms}
                                            onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                                        />
                                        <label htmlFor="agreeTerms">[필수] 개인정보 수집 및 이용 동의</label>
                                    </div>
                                    <a href="">상세보기</a>
                                </li>
                                <li>
                                    <div className="checkbox-type1">
                                        <input
                                            type="checkbox"
                                            name="agreePrivacy"
                                            id="agreePrivacy"
                                            checked={form.agreePrivacy}
                                            onChange={(e) => setForm({ ...form, agreePrivacy: e.target.checked })}
                                        />
                                        <label htmlFor="agreePrivacy">[필수] 개인정보 제 3자 제공 동의</label>
                                    </div>
                                    <a href="">상세보기</a>
                                </li>
                                <li>
                                    <div className="checkbox-type1">
                                        <input
                                            type="checkbox"
                                            name="agreePayment"
                                            id="agreePayment"
                                            checked={form.agreePayment}
                                            onChange={(e) => setForm({ ...form, agreePayment: e.target.checked })}
                                        />
                                        <label htmlFor="agreePayment">[필수] 전자결제대행 이용 동의</label>
                                    </div>
                                    <a href="">상세보기</a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="bd-bt">
                        <div className="input-list-type2 pt-20 pb-20 px-20">
                            <div className="input-list-title-wrap">
                                <p className="input-list-title">결제수단</p>
                            </div>
                            <div>
                                <div className="radiobox-list-type2 mb-20">
                                    <div className="radiobox">
                                        <input
                                            type="radio"
                                            id="card"
                                            name="payment_method"
                                            value="card"
                                            checked={form.payment_method === "card"}
                                            onChange={changeForm}
                                        />
                                        <label htmlFor="card">카드결제</label>
                                    </div>
                                    <div className="radiobox">
                                        <input
                                            type="radio"
                                            id="vbank"
                                            name="payment_method"
                                            value="vbank"
                                            checked={form.payment_method === "vbank"}
                                            onChange={changeForm}
                                        />
                                        <label htmlFor="vbank">계좌이체</label>
                                    </div>
                                </div>
                                <Error name={'payment_method'} />
                            </div>
                        </div>
                    </section>


                    <section className="bd-bt pt-20 pb-20">
                        <div className="price-information-list mb-20 px-20">
                            <ul>
                                <li>
                                    <div className="price-information">
                                        <p className="label">상품금액</p>
                                        <p className="price">{totalOriginalPrice.toLocaleString()}원</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information">
                                        <p className="label">할인금액</p>
                                        <p className="price minus">-{totalDiscountAmount.toLocaleString()}원</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information sub">
                                        <p className="label">가격인하/할인</p>
                                        <p className="price minus">-{totalDiscountPrice.toLocaleString()}원</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information sub">
                                        <p className="label">상품쿠폰</p>
                                        <p className="price minus">-{totalCouponDiscount.toLocaleString()}원</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information sub">
                                        <p className="label">적립금 사용</p>
                                        <p className="price minus">-{totalPointsUsed.toLocaleString()}원</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information">
                                        <p className="label">배송비</p>
                                        <p className="price">{order.delivery_fee.toLocaleString()}원</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="price-information final">
                                <p className="label">총 상품금액</p>
                                <p className="price">{totalFinalPrice.toLocaleString()}원</p>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
}
