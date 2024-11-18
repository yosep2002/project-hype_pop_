$(document).ready(function() {
    IMP.init("imp41664822"); // 아임포트 초기화
    const userNo = document.getElementById('userNo').value;

    // 서버에서 장바구니 데이터 받아오기
    fetch('/purchase/api/getCartItems?userNo=' + userNo)
    .then(response => {
        console.log('응답 상태:', response.status);
        return response.text(); // 응답을 텍스트로 확인
    })
    .then(text => {
        console.log('응답 본문:', text); // 응답 본문 로그 출력
        try {
            const data = JSON.parse(text); // JSON으로 파싱
            console.log('파싱된 데이터:', data);
            var cartItems = data.cartItems; // 장바구니 아이템을 사용하여 필요한 작업 수행
        } catch (e) {
            console.error('JSON 파싱 오류:', e);
        }

        // 결제 처리 (카카오페이)
        $('#kakaopay').on('click', function() {
            // 고유한 merchant_uid 생성
            var uniqueMerchantUid = 'ORD' + new Date().getTime();
            var grandTotal = $("#totalPrice").val();

            IMP.request_pay({
                pg: "kakaopay",
                pay_method: "card",
                merchant_uid: uniqueMerchantUid, // 주문 고유 번호
                name: 'hypepop',
                amount: grandTotal
            }, function(r) {
                if (r.success) {
                    alert('결제가 완료되었습니다. (카카오페이)');

                    // 결제 성공 후, 장바구니 정보 서버로 전송 (pay_list_tbl에 넣기)
                    cartItems.forEach(function(item) {
                        fetch('/purchase/api/addToPayList', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                gno: item.gno,
                                userNo: userNo,
                                camount: item.camount,
                                iamUid: uniqueMerchantUid
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('서버에 데이터 전송 성공:', data);
                        })
                        .catch((error) => {
                            console.error('서버로 데이터 전송 실패:', error);
                        });
                    });
                } else {
                    alert('결제에 실패하였습니다: ' + r.error_msg);
                }
            });
        });

        // 결제 처리 (토스페이)
        $('#toss').on('click', function() {
            // 고유한 merchant_uid 생성
            var uniqueMerchantUid = 'ORD' + new Date().getTime();
            var grandTotal = parseInt($("#totalPrice").val(), 10);
            IMP.request_pay({
                pg: "tosspayments",
                pay_method: "card",
                merchant_uid: uniqueMerchantUid, // 주문 고유 번호
                name: 'hypepop',
                amount: grandTotal
            }, function(r) {
                if (r.success) {
                    alert('결제가 완료되었습니다. (토스페이)');

                    // 결제 성공 후, 장바구니 정보 서버로 전송 (pay_list_tbl에 넣기)
                    cartItems.forEach(function(item) {
                        fetch('/purchase/api/addToPayList', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                gno: item.gno,
                                userNo: userNo,
                                camount: item.camount,
                                iamUid: uniqueMerchantUid
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('서버에 데이터 전송 성공:', data);
                        })
                        .catch((error) => {
                            console.error('서버로 데이터 전송 실패:', error);
                        });
                    });
                } else {
                    alert('결제에 실패하였습니다: ' + r.error_msg);
                }
            });
        });

    })
    .catch(error => {
        console.error('장바구니 데이터 요청 실패:', error);
    });
});
