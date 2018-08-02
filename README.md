# vue-iamport
[아임포트](https://www.iamport.kr) 서비스를 Vue.js 에서 플러그인으로써 사용할 수 있습니다.

**[주의] :** iamport Javascript SDK는 jQuery를 사용하고 있으므로 Vue 또는 Nuxt에서 각각의 방법에 맞게 jQuery를 불러와야합니다.


## 설치 - Installation
```
yarn add vue-iamport
or
npm install vue-iamport
```

## 초기화 - Initialization
```
import IMP from 'vue-iamport'

  //Vue.use(IMP, '가맹점식별코드')
  Vue.use(IMP, 'imp33886024') //아임포트 회원가입 후 발급된 가맹점 고유 코드를 사용해주세요. 예시는 KCP공식 아임포트 데모 계정입니다.
  Vue.IMP().load()
```
위 코드를 앱 엔트리 파일(src/main.js)에 입력하는것이 가장 이상적입니다.

## 사용법 - 결제

```
import Vue from 'vue'

Vue.IMP().request_pay({
    pg: 'html5_inicis',
    pay_method: 'card',
    merchant_uid: 'merchant_' + new Date().getTime(),
    name: '주문명:결제테스트',
    amount: 14000,
    buyer_email: 'iamport@siot.do',
    buyer_name: '구매자이름',
    buyer_tel: '010-1234-5678',
    buyer_addr: '서울특별시 강남구 삼성동',
    buyer_postcode: '123-456'
}, (result_success) => {
    //성공할 때 실행 될 콜백 함수
    var msg = '결제가 완료되었습니다.';
    msg += '고유ID : ' + result_success.imp_uid;
    msg += '상점 거래ID : ' + result_success.merchant_uid;
    msg += '결제 금액 : ' + result_success.paid_amount;
    msg += '카드 승인번호 : ' + result_success.apply_num;
    alert(msg);
}, (result_failure) => {
    //실패시 실행 될 콜백 함수
    var msg = '결제에 실패하였습니다.';
    msg += '에러내용 : ' + result_failure.error_msg;
    alert(msg);
})
```

Promise 형식은 아직 지원되지 않습니다.
request_pay 에 사용될 파라미터는 [여기](https://github.com/iamport/iamport-manual/tree/master/%EC%9D%B8%EC%A6%9D%EA%B2%B0%EC%A0%9C#211-param-%EC%86%8D%EC%84%B1%EA%B3%B5%ED%86%B5-%EC%86%8D%EC%84%B1) 를 참고하시기 바랍니다.


## 사용법 - 본인 인증
```
import Vue from 'vue'

Vue.IMP().certification({
    merchant_uid: 'merchant_' + new Date().getTime() //본인인증과 연관된 가맹점 내부 주문번호가 있다면 넘겨주세요
}, (result_success) => {
    // 인증성공
    console.log(result_success.imp_uid);
    console.log(result_success.merchant_uid);
    // 이후 Business Logic 처리하시면 됩니다.
}, (result_failure) => {
    //실패시 실행 될 콜백 함수
    var msg = '인증에 실패하였습니다.';
    msg += '에러내용 : ' + rsp.error_msg;

    alert(msg);
})
```
Promise 형식은 아직 지원되지 않습니다.
상세한 내용은 [공식 가이드](https://github.com/iamport/iamport-manual/tree/master/SMS%EB%B3%B8%EC%9D%B8%EC%9D%B8%EC%A6%9D) 를 참고하세요

## Nuxt.js 에서 사용
nuxt.config.js
```
plugins: [
    { src: '~plugins/iamport.js', ssr: false, injectAs: 'IMP' },
  ]
```
plugins/iamport.js
```
import Vue from 'vue'
import IMP from 'vue-iamport'
import { MERCHANT_CODE } from '../config/constants'

Vue.use(IMP,MERCHANT_CODE)
Vue.IMP().load()

export default IMP
```
다른 .vue 컴포넌트에서 IMP 접근
```
this.$IMP().request_pay({
    pg: 'html5_inicis',
    pay_method: 'card',
    merchant_uid: 'merchant_' + new Date().getTime(),
    name: '주문명:결제테스트',
    amount: 14000,
    buyer_email: 'iamport@siot.do',
    buyer_name: '구매자이름',
    buyer_tel: '010-1234-5678',
    buyer_addr: '서울특별시 강남구 삼성동',
    buyer_postcode: '123-456'
}, (result_success) => {
    //성공할 때 실행 될 콜백 함수
    var msg = '결제가 완료되었습니다.';
    msg += '고유ID : ' + result_success.imp_uid;
    msg += '상점 거래ID : ' + result_success.merchant_uid;
    msg += '결제 금액 : ' + result_success.paid_amount;
    msg += '카드 승인번호 : ' + result_success.apply_num;
    alert(msg);
}, (result_failure) => {
    //실패시 실행 될 콜백 함수
    var msg = '결제에 실패하였습니다.';
    msg += '에러내용 : ' + result_failure.error_msg;
    alert(msg);
})
```

### Reference
https://github.com/iamport/iamport-manual

### Changelog

0.1.1 [iamport javascript SDK version 1.1.7](https://docs.iamport.kr/javascript/1.1.7) 대응 및 [네이버 찜하기동작](https://github.com/iamport/iamport-manual/blob/44da33f0133ec5033d11f29dd7a8c6be3edc39d2/NAVERPAY/sample/README.md#5-%EC%B0%9C%ED%95%98%EA%B8%B0-%EB%8F%99%EC%9E%91) 추가

0.1.0 Initial version