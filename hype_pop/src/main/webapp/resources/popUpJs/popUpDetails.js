let psNo = document.getElementById('psNo').value;
let userNo = document.getElementById('userNo').value;
//전역 변수 선언
let currentPage = 1; // 현재 페이지를 저장할 변수
const amount = 10; // 한 페이지에 보여줄 리뷰 수



checkUserLiked(psNo, userNo);
fetchOtherReviews(psNo, userNo, page = 1);

function updateCancel() {
    const updateForm = document.getElementById('updateForm');
    updateForm.style.display = 'none';  // 수정 폼 숨기기
    document.getElementById('updateText').value = '';  // 텍스트 필드 초기화
    document.getElementById('rating').value = ''; // 별점 초기화
}


// 리뷰 작성 가능 여부 체크
function canWriteReview(psNo, userNo) {
	console.log("리뷰 작성 가능여부 체크중")
    return fetch('/reply/checkUserReview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ psNo, userNo })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('리뷰 작성 가능 여부 확인 실패: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => !data.hasReviewed) // 사용자가 리뷰를 작성하지 않았다면 true
    .catch(error => {
        console.error('리뷰 작성 가능 여부 확인 중 오류 발생:', error);
        return false; // 오류 발생 시 기본적으로 작성 불가
    });
}





function loadUserReviews(reviews) {
    const reviewList = document.getElementById('reviewList');
    const noReviewMessage = document.getElementById('noReviewMessage');
    const userReviewSection = document.getElementById('userReviewSection');

    reviewList.innerHTML = ''; // 리뷰 목록 초기화
    
    console.log("유저의 리뷰를 로드하는중");

    // 리뷰가 없을 때
    if (reviews.length === 0) {
        noReviewMessage.style.display = 'block'; // 리뷰가 없을 때 메시지 표시
        userReviewSection.style.display = 'none'; // 리뷰 섹션 숨기기
        return;
    } else {
        noReviewMessage.style.display = 'none'; // 리뷰가 있을 때 메시지 숨김
        userReviewSection.style.display = 'block'; // 리뷰 섹션 표시
    }

    // 테이블 생성
    const table = document.createElement('table');
    table.classList.add('reviewTable');

    const tbody = document.createElement('tbody');

    reviews.forEach((review) => {
        if (review.deleted) return; // 삭제된 리뷰는 무시

        // 첫째 줄: 아이디, 별점, 날짜, 케밥 버튼
        const reviewRow = `
            <tr>
                <td class="userId">${review.userId}</td>
                <td class="userStarRating">
                    ${[...Array(5)].map((_, i) => 
                        `<span data-value="${i + 1}" style="color: ${i < review.psScore ? 'gold' : 'gray'};">★</span>`).join('')}
                </td>
                <td class="reviewDate">${new Date(review.psRegDate).toLocaleDateString()}</td>
                <td class="kebabMenu">⋮</td>
            </tr>
        `;

        const commentRow = `
            <tr>
                <td colspan="4" class="reviewComment">
                    <p class="commentText">${review.psComment}</p>                
                </td>
            </tr>
        `;

        // 테이블에 행 추가
        const row = document.createElement('tr');
        row.innerHTML = reviewRow;
        tbody.appendChild(row);

        const commentRowEl = document.createElement('tr');
        commentRowEl.innerHTML = commentRow;
        tbody.appendChild(commentRowEl);

        const commentP = commentRowEl.querySelector('.commentText');
        const moreButton = commentRowEl.querySelector('.moreButton');

    


        // 본인 리뷰일 경우 케밥 메뉴 추가
        if (review) {
            const kebabMenuOptions = `
                <ul class="kebabMenuOptions" style="display: none;">
                   <li class="editReview" style="list-style-type: none;">수정</li>
                   <li class="deleteReview" style="list-style-type: none;">삭제</li>
                </ul>
            `;
            row.querySelector('.kebabMenu').insertAdjacentHTML('afterend', kebabMenuOptions);

            const kebabMenu = row.querySelector('.kebabMenu');
            const kebabMenuOptionsEl = row.querySelector('.kebabMenuOptions');

            kebabMenu.addEventListener('click', function (event) {
                event.stopPropagation();
                const optionsVisible = kebabMenuOptionsEl.style.display === "block";
                document.querySelectorAll('.kebabMenuOptions').forEach(menu => menu.style.display = "none");
                kebabMenuOptionsEl.style.display = optionsVisible ? "none" : "block";
            });

            document.addEventListener('click', function () {
                document.querySelectorAll('.kebabMenuOptions').forEach(menu => menu.style.display = "none");
            });
         

            kebabMenuOptionsEl.querySelector('.editReview').addEventListener('click', function () {
                // 수정 폼을 찾습니다.
                const updateForm = document.getElementById('updateForm');
                
                // 수정 폼을 보이게 합니다.
                updateForm.style.display = 'block';

                // 선택된 리뷰의 내용을 수정 폼에 채웁니다.
                const selectedReviewText = review.psComment; // 기존 리뷰 내용
                const selectedRating = review.psScore; // 기존 별점 값

                // 리뷰 텍스트와 별점 설정
                document.getElementById('updateText').value = selectedReviewText; // 기존 리뷰 내용으로 설정
                document.getElementById('rating').value = selectedRating; // 기존 별점 값으로 설정

                // 별점 표시
                const stars = updateForm.querySelectorAll('#newReviewStars span');
                stars.forEach(star => {
                    star.style.color = (parseInt(star.getAttribute('data-value')) <= selectedRating) ? 'gold' : 'gray'; // 선택된 별점에 따라 색상 변경
                });
            });
          
            kebabMenuOptionsEl.querySelector('.deleteReview').addEventListener('click', function () {
                if (confirm("리뷰를 삭제하시겠습니까?")) {
                    fetch('/reply/deleteReview', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ reviewId: review.psReplyNo })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('리뷰 삭제 실패: ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                    	   // 리뷰 삭제 후 다시 리뷰 작성 가능 여부 체크
                        canWriteReview(psNo, userNo).then(canWrite => {
                            const reviewForm = document.getElementById('reviewForm');
                            
                            if (canWrite) {
                                reviewForm.style.display = 'block'; // 리뷰 작성 폼 보이기
                            } else {
                                reviewForm.style.display = 'none'; // 리뷰 작성 폼 숨기기
                            }
                        });

                        fetchUserReviews(psNo, userNo);
                        window.selectedRating = 0; // 선택된 별점을 0으로 설정
                        document.querySelectorAll('#newReviewStars span').forEach(star => {
                            star.style.color = 'gray'; // 별점 색상 초기화
                        });
                        const noReviewMessage = document.getElementById('noReviewMessage');
                        noReviewMessage.style.display = 'none'; // 메시지 숨기기
                        alert('리뷰가 삭제되었습니다.');
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        alert('리뷰 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.');
                    });
                }
            });
        }
    });

    table.appendChild(tbody); // 테이블에 tbody 추가
    reviewList.appendChild(table); // 테이블 추가
}
document.querySelectorAll('#newReviewStars span').forEach(star => {
    star.addEventListener('click', function () {
        let selectedRating = this.getAttribute('data-value');
        // 별점 선택 시 색상 업데이트
        document.querySelectorAll('#newReviewStars span').forEach(s => {
            s.style.color = s.getAttribute('data-value') <= selectedRating ? 'gold' : 'gray';
        });

        // 선택된 별점을 업데이트 (선택된 별점에 대한 정보를 전역 변수를 통해 유지)
        window.selectedRating = selectedRating; // 선택된 별점을 전역 변수에 저장
    });
});

// 리뷰 작성 데이터 전송 함수
function send(form) {
    const reviewText = document.getElementById('reviewText').value;
    const selectedRating = document.querySelector('#newReviewStars span.selected'); // 선택된 별점
    const psScore = window.selectedRating;
console.log(psScore);
    if (reviewText.trim() === '' || psScore === '0') {
        alert('별점과 리뷰 내용을 입력해주세요.'); // 경고 메시지 표시
        return;
    }

    fetch('/reply/insertReply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            psNo: psNo,
            userNo: userNo,
            psComment: reviewText,
            psScore: psScore
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('리뷰 추가 실패: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert('리뷰가 작성되었습니다.');
        fetchUserReviews(psNo, userNo); // 리뷰 목록 다시 로드
        document.getElementById('reviewText').value = ''; // 리뷰 입력란 초기화
        document.getElementById('reviewForm').style.display = 'none'; // 리뷰 작성 폼 숨기기
        document.getElementById('noReviewMessage').style.display = 'none'; // 메시지 숨기기
    })
    .catch(err => {
        console.error('Error:', err);
        alert('리뷰 작성 중 문제가 발생했습니다. 다시 시도해 주세요.');
    });
}

// 리뷰 목록 가져오는 함수
function fetchUserReviews(psNo, userNo) {
	console.log("유저의 리뷰를 가져오는중")
    fetch('/reply/getUserReviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ psNo: psNo, userNo: userNo })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('리뷰를 가져오는 데 실패했습니다: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
    	
    	loadUserReviews(data.reviews);
    	 fetchOtherReviews(psNo, userNo, page = 1); 
    })
    .catch(err => {
        console.error('Error:', err);
        alert('리뷰를 가져오는 데 문제가 발생했습니다. 다시 시도해 주세요.');
    });
}

// DOMContentLoaded 이벤트 핸들러
document.addEventListener("DOMContentLoaded", function () {
	// span 내의 평균 별점 값 가져오기
	let averageRatingText = document.getElementById("averageRating").textContent;

	// 텍스트 값을 숫자로 변환
	let averageRating = parseFloat(averageRatingText);

	console.log("평균 별점 값: ", averageRating);  // 값이 제대로 출력되는지 확인

	// 숫자 여부를 확인하고, 소수 첫째 자리까지 반올림
	if (!isNaN(averageRating)) {
	    let roundedRating = averageRating.toFixed(1);
	    document.getElementById("averageRating").textContent = roundedRating; // 결과를 화면에 반영
	} else {
	    console.error("평균 별점이 숫자가 아닙니다.");
	}
	
	const fileData = document.querySelector(".fileData");

	if (fileData) {
	    const fileName = fileData.value; // 이미 uuid와 filename이 결합된 값이므로 바로 사용
	    const imgElement = document.querySelector(".popUpbanner img");

	    console.log("파일 이름은 : " + fileName);  // 결합된 파일 이름을 로그로 출력

	    if (fileName) {
	        // 파일 이름 그대로 이미지 경로를 생성
	        fetch(`/hypePop/images/${fileName}`)
	            .then(response => {
	                if (response.ok) {
	                    return response.blob();
	                } else {
	                    throw new Error('이미지를 불러올 수 없습니다.');
	                }
	            })
	            .then(blob => {
	                // 이미지 Blob을 URL로 변환하여 이미지 소스로 설정
	                const imageUrl = URL.createObjectURL(blob);
	                imgElement.src = imageUrl;  // 이미지를 동적으로 설정
	            })
	            .catch(error => {
	                console.error('이미지 로드 실패:', error);
	            });
	    }
	} else {
	    console.log("파일 데이터가 존재하지 않습니다.");
	}
	
    let psNo = document.getElementById('psNo').value;
    let userNo = document.getElementById('userNo').value;
	

    // 리뷰 작성 가능 여부 확인
    canWriteReview(psNo, userNo).then(canWrite => {
        const reviewForm = document.getElementById('reviewForm');
        const noReviewMessage = document.getElementById('noReviewMessage');

        if (canWrite) {
            reviewForm.style.display = 'block'; // 리뷰 작성 폼 보이기
        } else {
            reviewForm.style.display = 'none'; // 리뷰 작성 폼 숨기기
            fetchUserReviews(psNo, userNo); // 기존 리뷰 목록 가져오기
        }
    });
   

    // CSS 파일 동적으로 로드
    let cssPath = '/resources/css/popUpStoreDetails.css';
    let linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = cssPath;
    document.head.appendChild(linkElement);

    // 별점 선택 이벤트 설정
    document.querySelectorAll('#newReviewStars span').forEach(star => {
        star.addEventListener('click', function () {
            let selectedRating = this.getAttribute('data-value');
            document.querySelectorAll('#newReviewStars span').forEach(s => {
                s.style.color = s.getAttribute('data-value') <= selectedRating ? 'gold' : 'gray';
            });
        });
    });
});
//좋아요 버튼 클릭 이벤트 핸들러
document.querySelectorAll('#likeCount').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        let psNo = document.getElementById('psNo').value;
        let userNo = document.getElementById('userNo').value;

        fetch('/hypePop/likeCount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ psNo: psNo, userNo: userNo })
        })
        .then(response => {
            if (response.ok) {
            	console.log("체크하는 곳에 보낸 userNo는? : " + userNo);
            	console.log("체크하는 곳에 보낸 psNo? : " + psNo);
                checkUserLiked(psNo, userNo); // 좋아요 상태 확인 및 이미지 변경
                updateLikeCount(psNo)
            } else {
            	checkUserLiked(psNo, userNo);  // 이미 눌렀을 때 알림
            	 updateLikeCount(psNo)
            }
        })
        .catch(err => console.error('Error:', err));
    });
});



// 좋아요 수 업데이트 함수
function updateLikeCount(psNo) {
    // 전체 좋아요 수 업데이트
    fetch('/hypePop/getLikeCount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ psNo: psNo }), // psNo를 서버로 전송
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }
        return response.json(); // JSON 응답 처리
    })
    .then(data => {
        if (data.status === 'success') {
            const totalLikeCountElement = document.getElementById('totalLikeCount');
            // 좋아요 수 업데이트
            if (totalLikeCountElement) { // 요소 존재 여부 확인
                totalLikeCountElement.textContent = `❤️ ${data.likeCount}`; // 좋아요 수 업데이트
            } else {
                console.error('전체 좋아요 수 요소를 찾을 수 없습니다.');
            }
        } else {
            alert('좋아요 수를 불러오는 데 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('오류 발생:', error);
        alert('좋아요 수 업데이트 중 오류가 발생했습니다.');
    });
}

//댓글 수정 함수 
function update(f) {
    const updateText = document.getElementById('updateText').value;
    const selectedRating = document.querySelector('#newReviewStars span.selected'); // 선택된 별점
    const psScore = window.selectedRating;

    if (updateText.trim() === '' ) {
        alert('리뷰 내용을 입력해주세요.'); // 경고 메시지 표시
        return;
    }

    fetch('/reply/updateReply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            psNo: psNo,
            userNo: userNo,
            psComment: updateText,
            psScore: psScore
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('리뷰 수정 실패: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert('리뷰가 수정되었습니다.');
        fetchUserReviews(psNo, userNo); // 리뷰 목록 다시 로드
        document.getElementById('updateText').value = ''; // 리뷰 입력란 초기화
        document.getElementById('updateForm').style.display = 'none'; // 리뷰 작성 폼 숨기기
        document.getElementById('noReviewMessage').style.display = 'none'; // 메시지 숨기기

        // 전체 별점 평균을 다시 받아옴
        fetchAverageRating(psNo);
    })
    .catch(err => {
        console.error('Error:', err);
        alert('리뷰 수정 중 문제가 발생했습니다. 다시 시도해 주세요.');
    });
}

//전체 별점 평균을 받아오는 함수
function fetchAverageRating(psNo) {
	fetch(`/hypePop/getStoreAvg?psNo=${psNo}`) // 서버에서 psNo로 평균 별점 정보를 가져오는 API
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success' && data.averageRating) {
            let averageRating = parseFloat(data.averageRating);
            if (!isNaN(averageRating)) {
                // 소수점 첫째 자리로 반올림
                let roundedRating = averageRating.toFixed(1);
                document.getElementById("averageRating").textContent = roundedRating; // 결과를 화면에 반영
            }
        } else {
            console.error('평균 별점 데이터를 가져오는 데 실패했습니다.');
        }
    })
    .catch(err => {
        console.error('Error fetching average rating:', err);
    });
}

// 별점 유지 함수
document.querySelector('form').addEventListener('submit', function(event) {
    var ratingInput = document.querySelector('#rating');
    if (!ratingInput.value) {
        // 사용자가 별점을 변경하지 않았다면 기존 별점으로 설정
        ratingInput.value = existingRating;
    }
});


function fetchOtherReviews(psNo, userNo, page = 1) {
    console.log("유저의 리뷰를 가져오는 중");

    const reviewsList = document.getElementById('allReviewsList');
    reviewsList.innerHTML = ''; // 기존 리뷰 초기화

    const loadingMessage = document.createElement('tr');
    loadingMessage.innerHTML = '<td colspan="4" class="loadingMessage">로딩 중...</td>';
    reviewsList.appendChild(loadingMessage); // 로딩 메시지 추가

    fetch('/reply/getOtherReviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ psNo: psNo, userNo: userNo, pageNum: page, amount: amount }) // 여기서 amount를 사용
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // 로딩 메시지 제거
        reviewsList.innerHTML = '';

        if (data.reviews && Array.isArray(data.reviews)) {
            if (data.reviews.length === 0) {
                reviewsList.innerHTML = '<tr><td colspan="4" class="noReviewsMessage">다른 유저의 댓글이 없습니다</td></tr>';
            } else {
                data.reviews.forEach(review => {
                    const reviewRow = `
                        <tr>
                            <td class="userId">${review.userId}</td>
                            <td class="userStarRating">
                                ${[...Array(5)].map((_, i) => 
                                    `<span data-value="${i + 1}" style="color: ${i < review.psScore ? 'gold' : 'gray'};">★</span>`).join('')}
                            </td>
                            <td class="reviewDate">${new Date(review.psRegDate).toLocaleDateString()}</td>
                        </tr>
                    `;
                    const commentRow = `
                        <tr>
                            <td colspan="4" class="reviewComment">
                                <p class="commentText">${review.psComment}</p>                
                            </td>
                        </tr>
                    `;
                    reviewsList.innerHTML += reviewRow + commentRow;
                });

                // 페이지 업데이트
                updatePagination(data.totalReviews);
            }
        } else {
            reviewsList.innerHTML = '<tr><td colspan="4" class="errorMessage">리뷰를 가져오는 중 오류가 발생했습니다.</td></tr>';
            console.error('가져온 데이터 형식이 올바르지 않습니다:', data);
        }
    })
    .catch(error => {
        reviewsList.innerHTML = '<tr><td colspan="4" class="errorMessage">리뷰를 가져오는 중 오류가 발생했습니다.</td></tr>';
        console.error('리뷰를 가져오는 중 오류 발생:', error);
    });
}

function changePage(page) {
    if (page < 1) return; // 첫 페이지를 넘지 않도록
    currentPage = page; // 현재 페이지 업데이트
    fetchOtherReviews(psNo, userNo, currentPage); // 새로운 페이지의 리뷰 가져오기
}

function updatePagination(totalReviews) {
    const totalPages = Math.ceil(totalReviews / amount); // 전체 페이지 수 계산
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = ''; // 기존 페이지 번호 초기화

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.onclick = () => changePage(i); // 버튼 클릭 시 페이지 변경
        pageNumbers.appendChild(pageButton);
    }
}

document.querySelectorAll('.hitGoods span').forEach(item => {
    item.addEventListener('click', () => {
        // 클릭한 상품의 부모 <td> 요소를 선택하여 숨겨진 입력을 찾기
        const gnoInput = item.parentNode.querySelector('input[type="hidden"]'); 
        const gno = gnoInput.value; // 숨겨진 input 요소의 값 가져오기
        location.href = `/goodsStore/goodsDetails?gno=${gno}`;
    });
});
document.getElementById("toggleGoodsList").addEventListener("change", function() {
    const goodsTable = document.getElementById("goodsTable");
    const toggleText = this.nextSibling;

    if (this.checked) {
        goodsTable.style.display = "table"; // 테이블 보이기
        toggleText.textContent = "상품 리스트 출력 ON"; // 텍스트 변경
    } else {
        goodsTable.style.display = "none"; // 테이블 숨기기
        toggleText.textContent = "상품 리스트 출력 OFF"; // 텍스트 변경
    }
});


//좋아요 상태 확인 함수
function checkUserLiked(psNo, userNo) {
    fetch('/hypePop/checkUserLiked', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ psNo: psNo, userNo: userNo })
    })
    .then(response => response.json())
    .then(data => {
        console.log("받은 데이터는 ? :", data); // { liked: true } 또는 { liked: false }
        
        const likeButton = document.getElementById('likeButton'); // 좋아요 버튼의 ID를 가져옴
        if (data.liked) { // true이면 좋아요가 눌린 상태
            document.querySelector('#likeIcon').src = '/resources/images/fullHeart.png';  // 변경할 이미지 경로
        } else { // false이면 좋아요가 눌리지 않은 상태
            document.querySelector('#likeIcon').src = '/resources/images/emptyHeart.png';  
        }
    })
    .catch(err => {
        console.error('좋아요 상태 확인 중 오류 발생:', err);
    });
}
